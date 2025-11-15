# DevConnect - Quick Reference Guide

## 🚀 Quick Start (5 minutes)

```bash
# 1. Clone & Install
git clone <repo-url>
cd DevConnect
cd server && npm install
cd ../client && npm install

# 2. Configure
cd ../server && cp .env.example .env
cd ../client && cp .env.example .env
# Edit both .env files

# 3. Run
# Terminal 1:
cd server && npm run dev
# Terminal 2:
cd client && npm run dev

# 4. Visit
# Frontend: http://localhost:5173
# API Docs: http://localhost:5000/api-docs
```

---

## 📚 API Quick Reference

### Auth Endpoints
```bash
# Register
POST http://localhost:5000/api/v1/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "john_doe",
  "firstName": "John",
  "lastName": "Doe",
  "password": "Password123"
}

# Login
POST http://localhost:5000/api/v1/auth
{
  "email": "user@example.com",
  "password": "Password123",
  "persist": false
}

# Verify Token
GET http://localhost:5000/api/v1/auth/verify
Authorization: Bearer YOUR_ACCESS_TOKEN

# Refresh Token
POST http://localhost:5000/api/v1/auth/refresh
Cookie: jwt=YOUR_REFRESH_TOKEN

# Logout
GET http://localhost:5000/api/v1/logout
```

### Profile Endpoints
```bash
# View Profile
GET http://localhost:5000/api/v1/profile/john_doe
Authorization: Bearer YOUR_ACCESS_TOKEN

# Update Profile
PUT http://localhost:5000/api/v1/profile/john_doe/edit
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "bio": "Full-stack developer",
  "skills": ["JavaScript", "React", "Node.js"],
  "location": "San Francisco",
  "website": "https://example.com",
  "github": "https://github.com/john_doe"
}
```

---

## 🔧 Configuration Files

### Server .env
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/devconnect
JWT_SECRET=your-secret-key-here
ACCESS_TOKEN_SECRET=access-secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=refresh-secret
REFRESH_TOKEN_EXPIRY=7d
CLIENT_URL=http://localhost:5173
```

### Client .env
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=DevConnect
VITE_APP_VERSION=1.0.0
```

---

## 🧪 Testing with Postman

1. **Create Environment:**
   - Variable: `base_url` = `http://localhost:5000/api/v1`
   - Variable: `token` = (auto-set from login response)

2. **Register Request:**
   ```
   POST {{base_url}}/register
   {
     "email": "test@test.com",
     "username": "testuser",
     "firstName": "Test",
     "lastName": "User",
     "password": "Test@1234"
   }
   ```

3. **Login Request:**
   ```
   POST {{base_url}}/auth
   {
     "email": "test@test.com",
     "password": "Test@1234"
   }
   ```
   - Copy `accessToken` from response
   - Set header: `Authorization: Bearer <token>`

---

## 📁 Project Structure

```
DevConnect/
├── server/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   ├── corsOptions.js     # CORS configuration
│   │   └── swagger.js         # Swagger/OpenAPI config
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── profileController.js
│   │   ├── userController.js
│   │   └── ...
│   ├── middleware/
│   │   ├── verifyJWT.js
│   │   └── verifyRoles.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── userRoutes.js
│   │   └── ...
│   ├── validators/
│   │   ├── registerValidator.js
│   │   ├── profileValidator.js
│   │   └── userValidator.js
│   ├── utils/
│   │   └── errorHandler.js
│   ├── package.json
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── assets/
│   │   │   ├── components/
│   │   │   ├── context/
│   │   │   └── layout/
│   │   ├── auth/
│   │   │   ├── hooks (useAuth, useLogout, etc.)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── INSTALLATION.md
├── IMPROVEMENTS.md
└── setup.sh
```

---

## 🔑 Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `MONGO_URI` | MongoDB connection | `mongodb://localhost:27017/devconnect` |
| `JWT_SECRET` | JWT signing key | Random strong string |
| `ACCESS_TOKEN_EXPIRY` | How long tokens last | `15m`, `1h`, `7d` |
| `VITE_API_BASE_URL` | API base URL for client | `http://localhost:5000/api/v1` |

---

## 🚨 Common Issues

### Port Already in Use
```bash
# Find process using port
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Ensure MongoDB is running
2. Check MONGO_URI in .env
3. For MongoDB Atlas: Check IP whitelist & connection string
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS

Solution:
1. Check CLIENT_URL in server/.env
2. Ensure it matches frontend URL
3. Verify CORS configuration in config/corsOptions.js
```

### Token Expired
```javascript
// In client axios interceptor, refresh token automatically
// or user needs to login again
```

---

## 📊 Data Models

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique),
  username: String (unique),
  firstName: String,
  lastName: String,
  password: String (hashed),
  role: String (user|moderator|admin|owner),
  refreshToken: String,
  
  // Profile
  bio: String,
  location: String,
  skills: [String],
  avatar: String (URL),
  website: String (URL),
  github: String (URL),
  linkedin: String (URL),
  otherWebsite: String (URL),
  
  // Tracking
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication Flow

```
1. User registers with email, username, password
   └─> Password hashed with bcrypt
   └─> User stored in MongoDB

2. User logs in with email & password
   └─> Password verified against hash
   └─> Access token created (15 min)
   └─> Refresh token created (7 days)
   └─> Refresh token stored in HTTPOnly cookie
   └─> Access token returned to client

3. Client sends requests with Authorization header
   └─> JWT middleware verifies token
   └─> If valid, request proceeds
   └─> If expired, client uses refresh token

4. Token refresh flow
   └─> Client sends refresh token
   └─> Server creates new access token
   └─> Client continues with new token
```

---

## 📈 Performance Tips

- ✅ Use indexes on `email`, `username`, `role` fields
- ✅ Implement pagination for large datasets
- ✅ Cache frequently accessed data
- ✅ Monitor with Morgan logging
- ✅ Use rate limiting to prevent abuse
- ✅ Optimize database queries

---

## 🆘 Getting Help

1. Check **INSTALLATION.md** for detailed setup
2. Check **IMPROVEMENTS.md** for architecture changes
3. Check **README.md** for project overview
4. Visit **http://localhost:5000/api-docs** for API documentation
5. Enable debug logs: `NODE_ENV=development`

---

## 📝 Useful Commands

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm start            # Start production server

# Testing
npm test             # Run tests

# Code Quality
npm run lint         # Check code style

# Database
# Backup: mongodump --db devconnect
# Restore: mongorestore --db devconnect ./dump/devconnect
```

---

**Last Updated:** November 2024  
**Version:** 1.0.1  
**Status:** Production Ready ✅
