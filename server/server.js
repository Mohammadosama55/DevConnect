require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');   
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { swaggerUi, swaggerDoc } = require('./config/swagger');
const { verifyJWT } = require('./middleware/verifyJWT');

const app = express();
const port = process.env.PORT || 5000;

connectDB();

// Security Middleware
app.use(helmet()); // Add security headers

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Logging Middleware
app.use(morgan('combined'));

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Routes
const userRoutes = require('./routes/userRoutes');
const registerRoutes = require('./routes/registerRoutes');
const authRoutes = require('./routes/authRoutes');
const refreshRoutes = require('./routes/refreshRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const profileRoutes = require('./routes/profileRoutes');

// Health Check Route
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// API v1 Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/register', registerRoutes);
app.use('/api/v1/logout', logoutRoutes);
app.use('/api/v1/auth', authRoutes);
app.get('/api/v1/auth/verify', verifyJWT, (req, res) => {
    res.json({ message: `Hello ${req.user.firstName}, you have successfully logged in.` });
});
app.use('/api/v1/auth/refresh', refreshRoutes);
app.use('/api/v1/profile', profileRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// Global Error Handler (must be last)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(`[ERROR] ${status}: ${message}`);
  
  res.status(status).json({
    error: message,
    status,
    timestamp: new Date(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(port, () => {
    console.log(`✓ Server running on port: ${port}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✓ API Docs: http://localhost:${port}`);
});