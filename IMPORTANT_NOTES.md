# Important Notes & Instructions

## 🔥 Before You Start

### 1. Firebase Configuration
The Firebase configuration is already set up in `.env.local`, but you should:
- Go to Firebase Console and add your deployment domain to **Authorized Domains**
- Enable **Email/Password** and **Google** authentication methods
- The current Firebase config is provided, but you can replace it with your own

### 2. MongoDB Connection
You **MUST** update the MongoDB URI in `server/.env`:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/freelanceMarketplace?retryWrites=true&w=majority
```

### 3. Green Color Theme
The project uses DaisyUI with green theme colors. The primary color is green by default in DaisyUI, but you can customize further in `tailwind.config.js` if needed.

## 🚀 Quick Start Commands

### Terminal 1 - Server
```bash
cd server
npm install
npm start
```

### Terminal 2 - Client
```bash
cd client
npm install
npm run dev
```

## 📌 Key Features to Test

1. **Registration & Login**
   - Register with email/password
   - Login with email/password
   - Login with Google
   - Logout

2. **Job Management**
   - Add a new job
   - View all jobs
   - View job details
   - Update your job
   - Delete your job
   - Sort jobs by date

3. **Task Acceptance**
   - Accept a job (not your own)
   - View accepted tasks
   - Mark task as done
   - Cancel task

4. **Theme Toggle**
   - Click the moon/sun icon in navbar
   - Theme should persist on page reload

## 🎨 Design Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
module.exports = {
  // ... other config
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#22c55e",  // Change green color here
          "secondary": "#10b981",
          // ... other colors
        }
      }
    ]
  }
}
```

### Add More Categories
Edit the category dropdown in:
- `client/src/pages/AddJob.jsx`
- `client/src/pages/UpdateJob.jsx`

## 🔒 Security Notes

### Environment Variables
**NEVER** commit these files:
- `client/.env.local`
- `server/.env`

They are already in `.gitignore`, but double-check!

### Firebase Config
While Firebase config keys can be public (they're in client-side code), it's best practice to:
- Use environment variables (already done)
- Set up Firebase Security Rules
- Add authorized domains

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Test using browser DevTools device emulation.

## 🐛 Common Issues & Solutions

### Issue: "Firebase auth/network-request-failed"
**Solution:** Check your internet connection and Firebase config

### Issue: "MongoDB connection failed"
**Solution:** 
- Whitelist your IP in MongoDB Atlas (use 0.0.0.0/0 for all)
- Check connection string format
- Verify username and password

### Issue: "CORS error"
**Solution:** Server CORS is already configured. If issues persist, add your frontend URL explicitly in `server/index.js`

### Issue: "Cannot read properties of null"
**Solution:** Wait for loading state to complete before accessing user/data

### Issue: "Route not found (404) on refresh"
**Solution:** 
- For Netlify: `netlify.toml` is already configured
- For Firebase: `firebase.json` is already configured
- For Surge: Deploy from `dist` folder

## 📊 Database Collections

### jobs
```javascript
{
  _id: ObjectId,
  title: String,
  postedBy: String,
  category: String,
  summary: String,
  coverImage: String,
  userEmail: String,
  postedDate: ISOString
}
```

### acceptedTasks
```javascript
{
  _id: ObjectId,
  jobId: String,
  jobTitle: String,
  category: String,
  postedBy: String,
  coverImage: String,
  acceptedBy: String (user email),
  acceptedByName: String,
  acceptedDate: ISOString
}
```

## 🎯 Challenge Implementation

### 1. ✅ Advanced Filtering (Sorting)
Located in: `client/src/pages/AllJobs.jsx`
- Toggle button to sort by newest/oldest
- Uses MongoDB sort in backend

### 2. ✅ Dark/Light Theme Toggle
Located in: `client/src/components/Navbar.jsx`
- Theme state persists in localStorage
- Uses DaisyUI data-theme attribute

### 3. ✅ Prevent Accepting Own Jobs
Located in: `client/src/pages/JobDetails.jsx`
- Checks if job.userEmail === user.email
- Disables accept button for own jobs

### 4. ✅ Framer Motion
Located in: `client/src/pages/Home.jsx`
- Banner animations
- Card stagger animations
- Hover effects

## 📝 Comments in Code

All code is well-commented with clear explanations. Look for comments like:
```javascript
// Authentication context to manage user state across the application
// Fetch all jobs with optional sorting
// Protected route wrapper with loading spinner
```

## 🌐 API Endpoints Reference

```
GET    /jobs                        - All jobs with sorting
GET    /jobs/latest                 - Latest 6 jobs
GET    /jobs/user/:email            - User's jobs
GET    /jobs/:id                    - Single job
POST   /jobs                        - Create job
PUT    /jobs/:id                    - Update job
DELETE /jobs/:id                    - Delete job

GET    /accepted-tasks/user/:email  - User's accepted tasks
POST   /accepted-tasks              - Accept task
DELETE /accepted-tasks/:id          - Remove task
```

## 🎓 Learning Resources

If you want to understand or modify the code:
- [React Router Docs](https://reactrouter.com/)
- [TanStack Query Docs](https://tanstack.com/query/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [DaisyUI Components](https://daisyui.com/components/)
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)
- [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/)

## ✨ Final Checklist

Before deployment:
- [ ] Test all features locally
- [ ] Update MongoDB URI
- [ ] Check Firebase authorized domains
- [ ] Make 15+ commits on client
- [ ] Make 8+ commits on server
- [ ] Update README with live URLs
- [ ] Test on deployed site

---

**Good luck with your assignment! If you follow this guide, you'll have a fully functional freelance marketplace! 🚀**
