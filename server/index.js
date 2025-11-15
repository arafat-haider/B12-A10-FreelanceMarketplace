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

// Create MongoDB client with improved options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Add SSL and connection options
  ssl: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 5,
});

// In-memory storage fallback
let jobsData = [];
let acceptedTasksData = [];
let isMongoConnected = false;

async function run() {
  try {
    // Connect to MongoDB
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    console.log("Successfully connected to MongoDB!");

    // Test the connection
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB ping successful!");
    isMongoConnected = true;

    // Database and collections
    const database = client.db('freelanceMarketplace');
    const jobsCollection = database.collection('jobs');
    const acceptedTasksCollection = database.collection('acceptedTasks');

    // Health check route
    app.get('/', (req, res) => {
      res.json({ 
        message: 'Freelance Marketplace API is running!', 
        status: 'healthy',
        timestamp: new Date().toISOString()
      });
    });

    app.get('/health', async (req, res) => {
      try {
        await client.db("admin").command({ ping: 1 });
        res.json({ 
          status: 'healthy',
          database: 'connected',
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({ 
          status: 'unhealthy',
          database: 'disconnected',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    });

    // ============ JOB ROUTES ============

    // Get all jobs with optional sorting
    app.get('/jobs', async (req, res) => {
      try {
        if (isMongoConnected) {
          const limit = parseInt(req.query.limit) || 0;
          const sortOrder = req.query.sort === 'asc' ? 1 : -1;
          let query = jobsCollection.find().sort({ postedDate: sortOrder });
          
          if (limit > 0) {
            query = query.limit(limit);
          }
          
          const jobs = await query.toArray();
          res.send(jobs);
        } else {
          // Fallback to in-memory storage
          let jobs = [...jobsData];
          const sortOrder = req.query.sort === 'asc' ? 1 : -1;
          jobs.sort((a, b) => {
            const dateA = new Date(a.postedDate || a.createdAt);
            const dateB = new Date(b.postedDate || b.createdAt);
            return sortOrder === 1 ? dateA - dateB : dateB - dateA;
          });
          
          const limit = parseInt(req.query.limit) || 0;
          if (limit > 0) {
            jobs = jobs.slice(0, limit);
          }
          
          res.send(jobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
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
        const newJob = {
          ...req.body,
          _id: isMongoConnected ? undefined : Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        
        if (isMongoConnected) {
          const result = await jobsCollection.insertOne(newJob);
          res.status(201).send(result);
        } else {
          // Fallback to in-memory storage
          newJob._id = Date.now().toString();
          jobsData.push(newJob);
          console.log('Job added to in-memory storage:', newJob.title);
          res.status(201).send({ 
            acknowledged: true, 
            insertedId: newJob._id,
            message: 'Job added successfully (using in-memory storage)'
          });
        }
      } catch (error) {
        console.error('Error adding job:', error);
        res.status(500).send({ message: 'Error adding job', error: error.message });
      }
    });

    // Update job by ID (only by the user who posted it)
    app.put('/jobs/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const updateData = req.body;
        const userEmail = req.query.email;
        
        if (!userEmail) {
          return res.status(400).json({ message: 'User email is required' });
        }

        // First check if the job exists and belongs to the user
        const existingJob = await jobsCollection.findOne({ 
          _id: new ObjectId(id), 
          userEmail: userEmail 
        });
        
        if (!existingJob) {
          return res.status(404).json({ 
            message: 'Job not found or you do not have permission to update this job' 
          });
        }

        // Prepare update data with only allowed fields
        const allowedUpdates = {
          title: updateData.title,
          category: updateData.category,
          summary: updateData.summary,
          coverImage: updateData.coverImage,
          updatedAt: new Date()
        };

        // Remove undefined fields
        Object.keys(allowedUpdates).forEach(key => {
          if (allowedUpdates[key] === undefined) {
            delete allowedUpdates[key];
          }
        });

        const result = await jobsCollection.updateOne(
          { _id: new ObjectId(id), userEmail: userEmail },
          { $set: allowedUpdates }
        );
        
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Job not found or unauthorized' });
        }
        
        res.json({ 
          acknowledged: true,
          modifiedCount: result.modifiedCount,
          message: 'Job updated successfully!' 
        });
      } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).send({ message: 'Error updating job', error: error.message });
      }
    });

    // Delete a job (only by the user who posted it)
    app.delete('/jobs/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const userEmail = req.query.email;
        
        if (!userEmail) {
          return res.status(400).json({ message: 'User email is required' });
        }

        // First check if the job exists and belongs to the user
        const existingJob = await jobsCollection.findOne({ 
          _id: new ObjectId(id), 
          userEmail: userEmail 
        });
        
        if (!existingJob) {
          return res.status(404).json({ 
            message: 'Job not found or you do not have permission to delete this job' 
          });
        }

        const result = await jobsCollection.deleteOne({ 
          _id: new ObjectId(id), 
          userEmail: userEmail 
        });
        
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Job not found or unauthorized' });
        }
        
        res.json({ 
          acknowledged: true,
          deletedCount: result.deletedCount,
          message: 'Job deleted successfully!' 
        });
      } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ message: 'Failed to delete job', error: error.message });
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
    console.error("MongoDB connection failed:", error.message);
    console.log("⚠️  Running in development mode with simplified storage");
    
    // Simple fallback storage
    let jobs = [
      {
        _id: "1",
        title: "React Developer Needed",
        postedBy: "John Doe",
        category: "Web Development", 
        summary: "Looking for an experienced React developer to build modern web applications",
        coverImage: "https://i.ibb.co/QnwC4sG/web-development.jpg",
        userEmail: "john@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "2",
        title: "Mobile App UI/UX Design",
        postedBy: "Sarah Wilson",
        category: "Graphics Designing",
        summary: "Need a talented designer for mobile app interfaces with modern aesthetics",
        coverImage: "https://i.ibb.co/xLqz8G2/ui-ux-design.jpg",
        userEmail: "sarah@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "3",
        title: "SEO Content Writing",
        postedBy: "Mike Johnson",
        category: "Digital Marketing",
        summary: "Seeking skilled content writer for SEO-optimized blog posts and articles",
        coverImage: "https://i.ibb.co/9bQpjNy/content-writing.jpg",
        userEmail: "mike@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "4",
        title: "React Native App Development",
        postedBy: "Lisa Chen",
        category: "Web Development",
        summary: "Build a cross-platform mobile app using React Native framework",
        coverImage: "https://i.ibb.co/KwGBr5n/mobile-app-dev.jpg",
        userEmail: "lisa@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "5",
        title: "Brand Logo Design",
        postedBy: "David Brown",
        category: "Graphics Designing",
        summary: "Create a modern and memorable logo for a tech startup company",
        coverImage: "https://i.ibb.co/XxYH8gF/logo-design.jpg",
        userEmail: "david@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "6",
        title: "WordPress Plugin Development",
        postedBy: "Emma Davis",
        category: "Web Development",
        summary: "Develop a custom WordPress plugin with advanced features and functionality",
        coverImage: "https://i.ibb.co/2NrC8xL/wordpress-dev.jpg",
        userEmail: "emma@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "7",
        title: "Social Media Marketing Strategy",
        postedBy: "Alex Rodriguez",
        category: "Digital Marketing",
        summary: "Develop comprehensive social media marketing campaigns across platforms",
        coverImage: "https://i.ibb.co/ZGT4KvC/social-media.jpg",
        userEmail: "alex@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "8",
        title: "E-commerce Website Development",
        postedBy: "Rachel Green",
        category: "Web Development",
        summary: "Build a fully functional e-commerce website with payment integration",
        coverImage: "https://i.ibb.co/vkGQ8wJ/ecommerce-dev.jpg",
        userEmail: "rachel@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "9",
        title: "Video Editing for YouTube",
        postedBy: "Tom Wilson",
        category: "Graphics Designing",
        summary: "Professional video editing for YouTube content with modern effects",
        coverImage: "https://i.ibb.co/7QCr4XY/video-editing.jpg",
        userEmail: "tom@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "10",
        title: "Digital Marketing Campaign",
        postedBy: "Sofia Martinez",
        category: "Digital Marketing",
        summary: "Create and execute comprehensive digital marketing campaigns",
        coverImage: "https://i.ibb.co/G5k4w2M/digital-marketing.jpg",
        userEmail: "sofia@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "11",
        title: "iOS App Development",
        postedBy: "James Anderson",
        category: "Web Development",
        summary: "Develop a native iOS application with modern Swift frameworks",
        coverImage: "https://i.ibb.co/ZfNt4Xp/ios-development.jpg",
        userEmail: "james@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "12",
        title: "Digital Illustration Portfolio",
        postedBy: "Maya Patel",
        category: "Graphics Designing",
        summary: "Create custom digital illustrations and artwork for various projects",
        coverImage: "https://i.ibb.co/7jq6KQs/illustration.jpg",
        userEmail: "maya@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "13",
        title: "Web Scraping Solutions",
        postedBy: "Robert Lee",
        category: "Web Development",
        summary: "Build web scraping solutions using Python and advanced frameworks",
        coverImage: "https://i.ibb.co/ZH2qB4g/web-scraping.jpg",
        userEmail: "robert@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "14",
        title: "SEO Optimization Services",
        postedBy: "Anna Thompson",
        category: "Digital Marketing",
        summary: "Complete SEO optimization for websites to improve search rankings",
        coverImage: "https://i.ibb.co/YW6Y4zC/seo-optimization.jpg",
        userEmail: "anna@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "15",
        title: "Game Development Unity",
        postedBy: "Chris Evans",
        category: "Web Development",
        summary: "Develop engaging 2D and 3D games using Unity engine and C# scripting",
        coverImage: "https://i.ibb.co/8NTk2pV/game-development.jpg",
        userEmail: "chris@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "16",
        title: "Technical Writing Services",
        postedBy: "Helen Clark",
        category: "Digital Marketing",
        summary: "Write comprehensive technical documentation and user guides",
        coverImage: "https://i.ibb.co/YTqh8mN/technical-writing.jpg",
        userEmail: "helen@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "17",
        title: "UI/UX Design for Apps",
        postedBy: "Kevin Zhang",
        category: "Graphics Designing",
        summary: "Design beautiful and intuitive user interfaces for mobile applications",
        coverImage: "https://i.ibb.co/5KtGQpr/ui-design.jpg",
        userEmail: "kevin@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "18",
        title: "Podcast Editing Services",
        postedBy: "Nicole White",
        category: "Graphics Designing",
        summary: "Professional podcast editing and audio enhancement services",
        coverImage: "https://i.ibb.co/Cns2r1z/podcast-editing.jpg",
        userEmail: "nicole@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "19",
        title: "Full-Stack Development",
        postedBy: "Daniel Kim",
        category: "Web Development",
        summary: "Complete full-stack web development using modern technologies",
        coverImage: "https://i.ibb.co/bBYHR3z/fullstack-dev.jpg",
        userEmail: "daniel@example.com",
        createdAt: new Date().toISOString()
      },
      {
        _id: "20",
        title: "Professional Photography",
        postedBy: "Jessica Taylor",
        category: "Graphics Designing",
        summary: "High-quality photography and retouching services for commercial use",
        coverImage: "https://i.ibb.co/9NBfpj4/photography.jpg",
        userEmail: "jessica@example.com",
        createdAt: new Date().toISOString()
      }
    ];

    // Simple routes
    app.get('/', (req, res) => {
      res.json({ message: 'Freelance Marketplace API is running!', mode: 'development' });
    });

    app.get('/jobs', (req, res) => {
      const limit = parseInt(req.query.limit) || 0;
      const result = limit > 0 ? jobs.slice(0, limit) : jobs;
      res.json(result);
    });

    app.post('/jobs', (req, res) => {
      try {
        const jobData = req.body;
        
        // Validate required fields
        if (!jobData.title || !jobData.postedBy || !jobData.category || !jobData.summary || !jobData.userEmail) {
          return res.status(400).json({ 
            message: 'Missing required fields: title, postedBy, category, summary, userEmail' 
          });
        }

        const newJob = {
          _id: Date.now().toString(),
          title: jobData.title,
          postedBy: jobData.postedBy,
          category: jobData.category,
          summary: jobData.summary,
          coverImage: jobData.coverImage || 'https://i.ibb.co/QnwC4sG/default-job.jpg',
          userEmail: jobData.userEmail,
          createdAt: new Date().toISOString()
        };
        
        jobs.unshift(newJob); // Add to beginning
        console.log('✅ Job added successfully:', newJob.title);
        res.status(201).json({ 
          acknowledged: true, 
          insertedId: newJob._id,
          message: 'Job added successfully!'
        });
      } catch (error) {
        console.error('Error adding job:', error);
        res.status(500).json({ message: 'Failed to add job', error: error.message });
      }
    });

    app.get('/jobs/user/:email', (req, res) => {
      const userJobs = jobs.filter(job => job.userEmail === req.params.email);
      res.json(userJobs);
    });

    // Update job (fallback mode)
    app.put('/jobs/:id', (req, res) => {
      try {
        const id = req.params.id;
        const updateData = req.body;
        const userEmail = req.query.email;
        
        if (!userEmail) {
          return res.status(400).json({ message: 'User email is required' });
        }

        const jobIndex = jobs.findIndex(job => job._id === id && job.userEmail === userEmail);
        
        if (jobIndex === -1) {
          return res.status(404).json({ 
            message: 'Job not found or you do not have permission to update this job' 
          });
        }

        // Update only allowed fields
        const allowedFields = ['title', 'category', 'summary', 'coverImage'];
        allowedFields.forEach(field => {
          if (updateData[field] !== undefined) {
            jobs[jobIndex][field] = updateData[field];
          }
        });
        jobs[jobIndex].updatedAt = new Date().toISOString();

        console.log('✅ Job updated successfully:', jobs[jobIndex].title);
        res.json({ 
          acknowledged: true,
          modifiedCount: 1,
          message: 'Job updated successfully!' 
        });
      } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Failed to update job', error: error.message });
      }
    });

    // Delete job (fallback mode)
    app.delete('/jobs/:id', (req, res) => {
      try {
        const id = req.params.id;
        const userEmail = req.query.email;
        
        if (!userEmail) {
          return res.status(400).json({ message: 'User email is required' });
        }

        const jobIndex = jobs.findIndex(job => job._id === id && job.userEmail === userEmail);
        
        if (jobIndex === -1) {
          return res.status(404).json({ 
            message: 'Job not found or you do not have permission to delete this job' 
          });
        }

        const deletedJob = jobs.splice(jobIndex, 1)[0];
        console.log('✅ Job deleted successfully:', deletedJob.title);
        
        res.json({ 
          acknowledged: true,
          deletedCount: 1,
          message: 'Job deleted successfully!' 
        });
      } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ message: 'Failed to delete job', error: error.message });
      }
    });
  }
}

run().catch(console.dir);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

