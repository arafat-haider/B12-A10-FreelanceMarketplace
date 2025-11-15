# Freelance Marketplace Server

Backend server for the Freelance Marketplace application.

## API Endpoints

### Jobs

- `GET /jobs` - Get all jobs (with optional sort query parameter)
- `GET /jobs/latest` - Get latest 6 jobs
- `GET /jobs/user/:email` - Get jobs by user email
- `GET /jobs/:id` - Get single job by ID
- `POST /jobs` - Create new job
- `PUT /jobs/:id` - Update job by ID
- `DELETE /jobs/:id` - Delete job by ID

### Accepted Tasks

- `GET /accepted-tasks/user/:email` - Get accepted tasks by user email
- `POST /accepted-tasks` - Accept a new task
- `DELETE /accepted-tasks/:id` - Remove accepted task (Done/Cancel)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your MongoDB URI:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string

## Database Collections

- `jobs` - Stores all job postings
- `acceptedTasks` - Stores tasks accepted by users
