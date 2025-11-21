# 💅 BeautyBook - Beauty Salon Booking Platform

A full-stack beauty salon booking application built with the MERN stack (MongoDB, Express.js, React, Node.js). BeautyBook allows users to browse services, book appointments with stylists, and manage their profiles, while providing salon owners with administrative tools.


screenshots
![Home](./screenshots/homr.png)
![booking](./screenshots/booking.png)
![services](./screenshots/services.png)
![stylist](./screenshots/stylist.png)
![profile](./screenshots/profile.png)



video demonstration[https://player.cloudinary.com/embed/?cloud_name=dtvf0bcxg&public_id=WhatsApp_Video_2025-11-21_at_3.53.38_PM_fnykgf&profile=cld-default]



CI-CD testing
![Home](./screenshots/ci-cd%20testing.png) 

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## 🌟 Features

### For Customers
-  **User Authentication** - Secure signup/login with JWT
-  **Browse Services** - View available beauty services with prices
-  **Find Stylists** - Browse stylist profiles and portfolios
- **Book Appointments** - Real-time booking system
-  **Profile Management** - Update personal info and avatar
-  **Real-time Chat** - Socket.IO powered messaging with stylists
-  **Dark Mode** - Toggle between light and dark themes

### For Administrators
-  **Dashboard** - Overview of bookings and revenue
-  **Service Management** - Add, edit, delete services
-  **User Management** - Manage customers and stylists
-  **Analytics** - Track booking trends and popular services

##  Live Demo

- **Frontend**: [https://client-s58d.onrender.com/]
- **Backend API**: [https://backend-p4ly.onrender.com/]

### Test Credentials
```
Admin Account:
Email: admin@glamhub.com
Password: [Contact admin]

User Account:
Email: jane@example.com
Password: [Contact admin]
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication
- **React Toastify** - Toast notifications
- **Heroicons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Socket.IO** - WebSocket server
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
beautybook/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context (Auth, Theme)
│   │   ├── config/          # Configuration files
│   │   └── App.jsx          # Main app component
│   ├── public/              # Static assets
│   ├── .env                 # Environment variables
│   └── package.json
│
├── backend/                 # Node.js backend application
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   ├── uploads/            # User uploaded files
│   ├── server.js           # Express server setup
│   ├── .env                # Environment variables
│   └── package.json
│
└── README.md               # This file
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/PLP-MERN-Stack-Development/mern-final-project-kim254ke.git
cd beautybook/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

4. **Start the server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd ../frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

4. **Start development server**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🌐 Deployment

### Backend (Render)

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your repository
4. Set environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLIENT_URL= [https://client-s58d.onrender.com]
   - `NODE_ENV=production`
5. Deploy!

### Frontend (Render)

1. Create a new Static Site on Render
2. Connect your repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Set environment variables:
   - `VITE_API_BASE_URL=[https://backend-p4ly.onrender.com//api]
   - `VITE_SOCKET_URL=[https://backend-p4ly.onrender.com]
6. Deploy!

## 📚 API Documentation

### Authentication Endpoints

```
POST /api/auth/register      - Register new user
POST /api/auth/login         - Login user
POST /api/auth/logout        - Logout user
GET  /api/auth/me            - Get current user
```

### User Endpoints

```
GET  /api/user/profile/:userId    - Get user profile
PUT  /api/user/profile/:userId    - Update user profile
PUT  /api/user/avatar/:userId     - Upload user avatar
```

### Service Endpoints

```
GET    /api/services              - Get all services
GET    /api/services/:id          - Get single service
POST   /api/services              - Create service (admin)
PUT    /api/services/:id          - Update service (admin)
DELETE /api/services/:id          - Delete service (admin)
```

### Booking Endpoints

```
GET    /api/bookings              - Get all bookings
GET    /api/bookings/:id          - Get single booking
POST   /api/bookings              - Create booking
PUT    /api/bookings/:id          - Update booking
DELETE /api/bookings/:id          - Cancel booking
```

### Stylist Endpoints

```
GET    /api/stylists              - Get all stylists
GET    /api/stylists/:id          - Get single stylist
POST   /api/stylists              - Create stylist (admin)
PUT    /api/stylists/:id          - Update stylist (admin)
DELETE /api/stylists/:id          - Delete stylist (admin)
```

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/beautybook
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 🐛 Known Issues & Solutions

### Issue: Avatar not loading (Mixed Content Error)
**Solution**: Ensure avatars are stored as relative paths in database (`/uploads/avatars/filename.jpg`) not full URLs

### Issue: 404 on profile update
**Solution**: Check that routes in `userRoutes.js` don't have `/user/` prefix (it's already in `server.js`)

### Issue: CORS errors
**Solution**: Add your frontend URL to `allowedOrigins` array in `server.js`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Antony** - [GitHub](https://github.com/kim254ke)

## 🙏 Acknowledgments

- Icons by [Heroicons](https://heroicons.com/)
- UI inspiration from modern beauty salon websites
- Community support from Stack Overflow and GitHub

## 📧 Contact

For questions or support, please contact:
- Email: support@beautybook.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/beautybook/issues)

---

**Made with ❤️ and lots of ☕**