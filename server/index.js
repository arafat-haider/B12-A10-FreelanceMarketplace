// Express.js server with MongoDB integration for Freelance Marketplace
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URI
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

// Create MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Successfully connected to MongoDB!");

    // Database and collections
    const database = client.db('freelanceMarketplace');
    const jobsCollection = database.collection('jobs');
    const acceptedTasksCollection = database.collection('acceptedTasks');

    // ============ JOB ROUTES ============

    // Get all jobs with optional sorting
    app.get('/jobs', async (req, res) => {
      try {
        const sortOrder = req.query.sort === 'asc' ? 1 : -1;
        const jobs = await jobsCollection
          .find()
          .sort({ postedDate: sortOrder })
          .toArray();
        res.send(jobs);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching jobs', error: error.message });
      }
    });

    // Get latest 6 jobs for home page
    app.get('/jobs/latest', async (req, res) => {
      try {
        const jobs = await jobsCollection
          .find()
          .sort({ postedDate: -1 })
          .limit(6)
          .toArray();
        res.send(jobs);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching latest jobs', error: error.message });
      }
    });

    // Get jobs posted by specific user
    app.get('/jobs/user/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const jobs = await jobsCollection
          .find({ userEmail: email })
          .sort({ postedDate: -1 })
          .toArray();
        res.send(jobs);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching user jobs', error: error.message });
      }
    });

    // Get single job by ID
    app.get('/jobs/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const job = await jobsCollection.findOne(query);
        if (job) {
          res.send(job);
        } else {
          res.status(404).send({ message: 'Job not found' });
        }
      } catch (error) {
        res.status(500).send({ message: 'Error fetching job', error: error.message });
      }
    });

    // Add new job
    app.post('/jobs', async (req, res) => {
      try {
        const newJob = req.body;
        const result = await jobsCollection.insertOne(newJob);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error adding job', error: error.message });
      }
    });

    // Update job by ID
    app.put('/jobs/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            title: req.body.title,
            category: req.body.category,
            summary: req.body.summary,
            coverImage: req.body.coverImage
          }
        };
        const result = await jobsCollection.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error updating job', error: error.message });
      }
    });

    // Delete job by ID
    app.delete('/jobs/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await jobsCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error deleting job', error: error.message });
      }
    });

    // ============ ACCEPTED TASKS ROUTES ============

    // Get accepted tasks by user email
    app.get('/accepted-tasks/user/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const tasks = await acceptedTasksCollection
          .find({ acceptedBy: email })
          .sort({ acceptedDate: -1 })
          .toArray();
        res.send(tasks);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching accepted tasks', error: error.message });
      }
    });

    // Add accepted task
    app.post('/accepted-tasks', async (req, res) => {
      try {
        const newTask = req.body;
        
        // Check if task is already accepted by this user
        const existingTask = await acceptedTasksCollection.findOne({
          jobId: newTask.jobId,
          acceptedBy: newTask.acceptedBy
        });

        if (existingTask) {
          return res.status(400).send({ message: 'You have already accepted this task' });
        }

        const result = await acceptedTasksCollection.insertOne(newTask);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error accepting task', error: error.message });
      }
    });

    // Delete accepted task (Done or Cancel)
    app.delete('/accepted-tasks/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await acceptedTasksCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error removing task', error: error.message });
      }
    });

    // Root route
    app.get('/', (req, res) => {
      res.send('Freelance Marketplace Server is Running!');
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

run().catch(console.dir);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

