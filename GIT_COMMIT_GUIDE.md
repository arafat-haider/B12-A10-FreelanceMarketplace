# Git Commit Guide

## 📝 Making Meaningful Commits

The requirement is:
- **Client:** Minimum 15 notable commits
- **Server:** Minimum 8 notable commits

## Client Repository Commit Examples

Here's a suggested commit strategy for the client:

```bash
# 1. Initial setup
git add .
git commit -m "Initial project setup with Vite, React, TailwindCSS, and DaisyUI"

# 2. Firebase configuration
git add src/firebase/
git commit -m "Add Firebase authentication configuration"

# 3. Auth context
git add src/context/
git commit -m "Implement authentication context with login, register, and logout"

# 4. Navbar component
git add src/components/Navbar.jsx
git commit -m "Create responsive Navbar with conditional rendering and theme toggle"

# 5. Footer component
git add src/components/Footer.jsx
git commit -m "Add Footer component with social links and copyright"

# 6. Home page
git add src/pages/Home.jsx
git commit -m "Implement Home page with animated banner and latest jobs section"

# 7. Authentication pages
git add src/pages/Login.jsx src/pages/Register.jsx
git commit -m "Create Login and Register pages with validation and Google sign-in"

# 8. Private route
git add src/routes/PrivateRoute.jsx
git commit -m "Add PrivateRoute component for route protection"

# 9. Add Job page
git add src/pages/AddJob.jsx
git commit -m "Implement Add Job page with form validation"

# 10. All Jobs page
git add src/pages/AllJobs.jsx
git commit -m "Create All Jobs page with sorting functionality"

# 11. Job Details page
git add src/pages/JobDetails.jsx
git commit -m "Add Job Details page with accept job functionality"

# 12. My Added Jobs page
git add src/pages/MyAddedJobs.jsx
git commit -m "Implement My Added Jobs page with update and delete features"

# 13. Update Job page
git add src/pages/UpdateJob.jsx
git commit -m "Create Update Job page with pre-filled form"

# 14. My Accepted Tasks page
git add src/pages/MyAcceptedTasks.jsx
git commit -m "Add My Accepted Tasks page with done and cancel options"

# 15. 404 page and routing
git add src/pages/NotFound.jsx src/App.jsx
git commit -m "Configure all routes and add 404 error page"

# 16. Framer Motion animations
git add .
git commit -m "Implement Framer Motion animations throughout the app"

# 17. Final touches
git add .
git commit -m "Add loading spinners, toast notifications, and final UI improvements"

# 18. Documentation
git add README.md
git commit -m "Update README with project features and deployment instructions"
```

## Server Repository Commit Examples

```bash
# 1. Initial setup
git add .
git commit -m "Initialize Express server with MongoDB connection"

# 2. Job routes - GET
git add index.js
git commit -m "Add GET routes for fetching all jobs and latest jobs"

# 3. Job routes - GET by ID and user
git add index.js
git commit -m "Implement GET routes for single job and user's jobs"

# 4. Job routes - POST
git add index.js
git commit -m "Add POST route for creating new jobs"

# 5. Job routes - PUT
git add index.js
git commit -m "Implement PUT route for updating jobs"

# 6. Job routes - DELETE
git add index.js
git commit -m "Add DELETE route for removing jobs"

# 7. Accepted tasks routes
git add index.js
git commit -m "Implement routes for accepting and managing tasks"

# 8. Error handling and validation
git add index.js
git commit -m "Add error handling and duplicate task validation"

# 9. Deployment configuration
git add vercel.json
git commit -m "Add Vercel deployment configuration"

# 10. Documentation
git add README.md
git commit -m "Update API documentation with all endpoints"
```

## Best Practices

### Do's ✅
- Write clear, descriptive commit messages
- Commit related changes together
- Use present tense ("Add feature" not "Added feature")
- Be specific about what changed
- Keep commits focused on one task

### Don'ts ❌
- Don't commit everything at once
- Don't use vague messages like "update" or "fix"
- Don't commit commented-out code
- Don't commit node_modules or .env files
- Don't make tiny commits for every line change

## Commit Message Format

```
[Type] Brief description

Examples:
✅ feat: Add user authentication with Firebase
✅ fix: Resolve CORS error in API calls
✅ style: Update navbar styling with TailwindCSS
✅ refactor: Optimize job fetching with TanStack Query
✅ docs: Add setup instructions to README
```

## Checking Your Commits

```bash
# View commit history
git log --oneline

# View detailed commit history
git log

# Count commits
git rev-list --count HEAD
```

## Initial Setup Commands

### For Client
```bash
cd client
git init
git add .
git commit -m "Initial commit: Setup React app with Vite, TailwindCSS, and DaisyUI"
git branch -M main
git remote add origin <your-client-repo-url>
git push -u origin main
```

### For Server
```bash
cd server
git init
git add .
git commit -m "Initial commit: Setup Express server with MongoDB"
git branch -M main
git remote add origin <your-server-repo-url>
git push -u origin main
```

## Important Notes

1. **Separate Repositories:** Client and server should be in separate GitHub repositories
2. **Meaningful Commits:** Each commit should represent a logical unit of work
3. **Commit Often:** Don't wait until the end to commit everything
4. **Test Before Commit:** Make sure code works before committing
5. **Push Regularly:** Push to GitHub frequently to avoid losing work

## Example Workflow

```bash
# Work on a feature
# ... make changes ...

# Check what changed
git status

# Review changes
git diff

# Stage specific files
git add src/pages/AddJob.jsx

# Commit with meaningful message
git commit -m "feat: Implement Add Job page with category dropdown"

# Push to GitHub
git push

# Repeat for each feature/fix
```

---

Remember: Quality over quantity! 15-18 meaningful commits are better than 30 tiny meaningless ones.
