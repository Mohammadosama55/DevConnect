# DevConnect

DevConnect is an open-source platform designed to connect developers from around the world. Inspired by LinkedIn but tailored specifically for the developer community, DevConnect aims to facilitate networking, knowledge sharing, and career growth.

## 🎯 Vision

Build a vibrant community platform where developers can:
- Showcase their skills and projects
- Network with peers worldwide
- Share technical knowledge and experiences
- Discover career opportunities
- Collaborate on open-source projects

## ✨ Current Features

- ✅ **User Authentication** - Secure registration and login using JWT
- ✅ **User Profiles** - Create and customize detailed developer profiles
- ✅ **Profile Management** - Update bio, skills, social links, and avatar
- ✅ **Role-Based Access** - User, Moderator, Admin, and Owner roles
- ✅ **JWT Refresh Tokens** - Secure token rotation for enhanced security

## 🚀 Upcoming Features

- **Blogging** - Write and share technical blog posts
- **Networking** - Connect with other developers through friend requests and follows
- **Job Board** - Browse job listings and stay informed about hiring opportunities
- **Real-time Chat** - Communicate with other developers in real-time
- **Notifications** - Get updates on job postings, friend requests, and blog interactions
- **Search and Filters** - Easily find developers, blog posts, and job listings
- **Admin Panel** - Manage users, posts, and job listings

## 💻 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **DaisyUI** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **Morgan** - Request logging
- **Swagger/OpenAPI** - API documentation

## 🔒 Security Features

- ✅ Helmet.js for security headers
- ✅ Rate limiting to prevent abuse
- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation & sanitization
- ✅ CORS configuration
- ✅ HTTPOnly cookies for refresh tokens

## 🏗️ Architecture

```
DevConnect/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/           # API services
│   │   ├── assets/        # Components
│   │   └── auth/          # Auth utilities
│   └── package.json
├── server/                # Express Backend
│   ├── config/            # Configuration
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth, validation
│   ├── models/           # Database schemas
│   ├── routes/           # API endpoints
│   ├── validators/       # Input validation
│   └── package.json
└── README.md
```

## 📖 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourgithubprofile/DevConnect.git
cd DevConnect

# Install dependencies
cd server && npm install
cd ../client && npm install
```

### Configuration

**Server** (`server/.env`):
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/devconnect
JWT_SECRET=your-secret-key
ACCESS_TOKEN_SECRET=access-secret
REFRESH_TOKEN_SECRET=refresh-secret
CLIENT_URL=http://localhost:5173
```

**Client** (`client/.env`):
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### Run

Terminal 1:
```bash
cd server && npm run dev
```

Terminal 2:
```bash
cd client && npm run dev
```

Visit: http://localhost:5173

## 📚 API Documentation

Swagger UI: `http://localhost:5000/api-docs`

### Key Endpoints
- `POST /api/v1/register` - User registration
- `POST /api/v1/auth` - User login
- `GET /api/v1/profile/:username` - View profile
- `PUT /api/v1/profile/:username/edit` - Update profile

See [INSTALLATION.md](./INSTALLATION.md) for complete API docs.

## 🔄 Recent Improvements (v1.0.1)

✅ **Global Error Handling**  
✅ **API Versioning** (`/api/v1/`)  
✅ **Security Hardening** (Helmet, Rate Limiting)  
✅ **Input Validation**  
✅ **Database Optimization** (Indexes)  
✅ **API Documentation** (Swagger)  
✅ **Request Logging** (Morgan)  

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "Add amazing feature"`
4. Push branch: `git push origin feature/amazing-feature`
5. Create Pull Request to `dev` branch

> 🔀 **Note**: All changes must go through the `dev` branch. The `main` branch is for production-ready code.

## 📋 Roadmap

- [ ] Blog posts (CRUD)
- [ ] Networking (follow/friend requests)
- [ ] Job board
- [ ] Real-time chat (Socket.io)
- [ ] Notifications
- [ ] Advanced search
- [ ] OAuth integrations

## 📝 License

MIT License - See [LICENSE](./LICENSE) file for details

## 👥 Credits

**Original Author:** Alvaro Torres (@alvarotorrestx)

---

**⭐ Star this project if you find it helpful!**
