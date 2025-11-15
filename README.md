# Freelance MarketPlace

🔗 **Live Site URL:** [Your Deployment URL Here]

## Features

- 🔐 **Secure Authentication** - Firebase-based user authentication with email/password and Google sign-in
- 💼 **Job Management** - Post, update, and delete freelance jobs with detailed information
- 📋 **Task Tracking** - Accept jobs from other users and manage your accepted tasks
- 🎨 **Dark/Light Theme** - Toggle between dark and light modes for comfortable viewing
- 🔍 **Advanced Filtering** - Sort jobs by posted date for easy browsing
- 📱 **Responsive Design** - Fully responsive interface for mobile, tablet, and desktop devices

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
└── server/          # Express backend
    ├── index.js
    ├── .env.example
    └── package.json
```

## Technologies Used

### Frontend
- **React** - UI library
- **React Router DOM** - Routing
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - TailwindCSS component library
- **Firebase** - Authentication and hosting

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Installation

All packages have been installed. To get started:

### Client Setup
```bash

## Technologies Used

### Frontend
- React.js with Vite
- TailwindCSS & DaisyUI
- React Router DOM
- TanStack Query (React Query)
- Axios
- Framer Motion
- React Hot Toast
- React Icons
- Firebase Authentication

### Backend
- Node.js & Express.js
- MongoDB & MongoDB Atlas
- CORS & dotenv

## Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Firebase account

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd B12-A10-FreelanceMarketplace
```

2. **Server Setup**
```bash
cd server
npm install
# Create .env file and add your MongoDB URI
npm start
```

3. **Client Setup**
```bash
cd client
npm install
npm run dev
```

For detailed setup instructions, see [SETUP.md](SETUP.md)

For deployment guide, see [DEPLOYMENT.md](DEPLOYMENT.md)

## Project Structure

```
B12-A10-FreelanceMarketplace/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/    # Navbar, Footer
│   │   ├── pages/         # All page components
│   │   ├── context/       # Auth context
│   │   ├── routes/        # Private route
│   │   └── firebase/      # Firebase config
│   └── package.json
│
└── server/           # Express backend
    ├── index.js      # API routes
    └── package.json
```

## Features Implementation

✅ User Authentication (Email/Password & Google)  
✅ Add, Update, Delete Jobs  
✅ View All Jobs with Sorting  
✅ Accept Jobs from Other Users  
✅ My Added Jobs Management  
✅ My Accepted Tasks Management  
✅ Dark/Light Theme Toggle  
✅ Responsive Design  
✅ Protected Routes  
✅ Toast Notifications  
✅ Framer Motion Animations  
✅ Loading Spinners  
✅ 404 Error Page  

## Environment Variables

### Client (.env.local)
```
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APPID=your_firebase_app_id
```

### Server (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm start` - Start server

## Live Demo

🔗 **Client:** [Add your deployed URL here]  
🔗 **Server:** [Add your deployed API URL here]  

## GitHub Repositories

📦 **Client:** [Add your client repo URL here]  
📦 **Server:** [Add your server repo URL here]  

---
**Developed with ❤️ for Programming Hero - Batch 12, Assignment 10**

const app = initializeApp(firebaseConfig);
export default app;
```

## MongoDB Setup

Replace `your_mongodb_connection_string_here` in `server/.env` with your actual MongoDB connection string from MongoDB Atlas or your local MongoDB instance.
