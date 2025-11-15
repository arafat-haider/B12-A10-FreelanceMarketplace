// Sample jobs data for testing
// You can insert this data directly into MongoDB for testing

const sampleJobs = [
  {
    title: "React Developer Needed for E-commerce Site",
    postedBy: "John Doe",
    category: "Web Development",
    summary: "Looking for an experienced React developer to build a modern e-commerce website with shopping cart functionality, payment integration, and responsive design. Must have experience with React, Redux, and REST APIs.",
    userEmail: "john@example.com",
    postedDate: new Date().toISOString()
  },
  {
    title: "Social Media Marketing Campaign",
    postedBy: "Sarah Johnson",
    category: "Digital Marketing",
    summary: "Need a digital marketing expert to create and manage social media campaigns across Facebook, Instagram, and Twitter. Must have proven track record of increasing engagement and conversions.",
    userEmail: "sarah@example.com",
    postedDate: new Date().toISOString()
  },
  {
    title: "Logo Design for Tech Startup",
    postedBy: "Mike Chen",
    category: "Graphics Design",
    summary: "Looking for a creative graphic designer to create a modern, minimalist logo for our tech startup. Should reflect innovation and professionalism. Multiple concepts required.",
    userEmail: "mike@example.com",
    postedDate: new Date().toISOString()
  },
  {
    title: "SEO Content Writer for Blog",
    postedBy: "Emily Davis",
    category: "Content Writing",
    summary: "Seeking an experienced content writer to produce SEO-optimized blog posts about technology and business. Must have excellent writing skills and understanding of SEO best practices.",
    userEmail: "emily@example.com",
    postedDate: new Date().toISOString()
  },
  {
    title: "Video Editor for YouTube Channel",
    postedBy: "Chris Brown",
    category: "Video Editing",
    summary: "Need a skilled video editor for weekly YouTube videos. Must be proficient in Adobe Premiere Pro or Final Cut Pro. Experience with motion graphics is a plus.",
    userEmail: "chris@example.com",
    postedDate: new Date().toISOString()
  },
  {
    title: "Mobile App Developer - iOS & Android",
    postedBy: "Lisa Wang",
    category: "Mobile App Development",
    summary: "Looking for a mobile app developer to create a fitness tracking app for both iOS and Android platforms. Experience with React Native or Flutter preferred.",
    userEmail: "lisa@example.com",
    postedDate: new Date().toISOString()
  }
];

module.exports = sampleJobs;
