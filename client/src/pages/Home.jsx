// Home page with banner, latest jobs, and additional sections
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBriefcase, 
  FaUsers, 
  FaCheck, 
  FaArrowRight, 
  FaCode, 
  FaBullhorn, 
  FaPaintBrush, 
  FaPenFancy,
  FaStar,
  FaPlay,
  FaShieldAlt,
  FaClock,
  FaMoneyBillWave,
  FaGlobe
} from 'react-icons/fa';

const Home = () => {
  // Fetch latest 6 jobs from the database
  const { data: latestJobs = [], isLoading } = useQuery({
    queryKey: ['latestJobs'],
    queryFn: async () => {
      try {
        const response = await axios.get('http://localhost:5000/jobs/latest');
        return response.data;
      } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
      }
    },
    retry: false,
    refetchOnWindowFocus: false
  });

  // Animation variants for framer motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const services = [
    {
      icon: FaCode,
      title: "Web Development",
      description: "Custom websites and web applications",
      jobs: "1,200+ jobs available",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaPaintBrush,
      title: "Graphic Design",
      description: "Logos, branding, and visual design",
      jobs: "800+ jobs available",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: FaPenFancy,
      title: "Content Writing",
      description: "Articles, blogs, and copywriting",
      jobs: "600+ jobs available",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FaBullhorn,
      title: "Digital Marketing",
      description: "SEO, social media, and advertising",
      jobs: "450+ jobs available",
      color: "from-orange-500 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Startup Founder",
      image: "https://i.ibb.co/q5X9X9g/person1.jpg",
      rating: 5,
      comment: "FreelanceHub connected me with amazing developers who brought my vision to life. Highly recommended!"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      image: "https://i.ibb.co/yXzGy89/person2.jpg", 
      rating: 5,
      comment: "The quality of work and professionalism exceeded my expectations. Will definitely use again!"
    },
    {
      name: "Emily Rodriguez",
      role: "E-commerce Owner",
      image: "https://i.ibb.co/8KQqB15/person3.jpg",
      rating: 5,
      comment: "Fast delivery, excellent communication, and outstanding results. This platform is a game-changer!"
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section - Enhanced Professional Design */}
      <section className="relative bg-gradient-to-br from-[#1f4b3f] via-[#2d6b57] to-[#1f4b3f] min-h-[700px] flex items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#5bbb7b] rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#4aa66a] rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full opacity-5 blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-white"
            >
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-white/90 border border-white/20">
                  🚀 #1 Freelance Platform
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Find the perfect
                <span className="block bg-gradient-to-r from-[#5bbb7b] to-[#4aa66a] bg-clip-text text-transparent">
                  freelance services
                </span>
                for your business
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed max-w-xl">
                Work with talented people at the most affordable price to get the most out of your time and cost
              </p>
              
              {/* Enhanced Search Bar */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white rounded-2xl p-2 shadow-2xl max-w-2xl mb-8 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="What service are you looking for?"
                      className="w-full px-6 py-4 bg-transparent text-gray-700 focus:outline-none text-lg placeholder-gray-500"
                    />
                  </div>
                  <div className="md:border-l border-gray-200 md:pl-4">
                    <select className="w-full md:w-auto px-4 py-4 bg-transparent text-gray-700 focus:outline-none text-lg">
                      <option value="">All Categories</option>
                      <option value="web-dev">Web Development</option>
                      <option value="mobile-dev">Mobile Development</option>
                      <option value="design">Design & Creative</option>
                      <option value="writing">Writing & Content</option>
                      <option value="marketing">Digital Marketing</option>
                    </select>
                  </div>
                  <button className="bg-gradient-to-r from-[#5bbb7b] to-[#4aa66a] hover:from-[#4aa66a] hover:to-[#3d9558] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Search Now
                  </button>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link 
                  to="/all-jobs"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#1f4b3f] px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <FaBriefcase />
                  Browse Jobs
                </Link>
                <button className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <FaPlay />
                  Watch Demo
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">2.5M+</div>
                  <div className="text-white/70 text-sm mt-1">Total Freelancers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">1.8M+</div>
                  <div className="text-white/70 text-sm mt-1">Positive Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">500K+</div>
                  <div className="text-white/70 text-sm mt-1">Orders Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">99%</div>
                  <div className="text-white/70 text-sm mt-1">Satisfaction Rate</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Enhanced Feature Cards */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <div className="grid grid-cols-2 gap-6">
                {/* Enhanced Feature Cards */}
                <motion.div 
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-[#5bbb7b] to-[#4aa66a] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <FaShieldAlt className="text-white text-xl" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Secure Payments</h3>
                  <p className="text-white/70 text-sm leading-relaxed">100% secure payment system with buyer protection</p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl mt-8"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <FaUsers className="text-white text-xl" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Expert Freelancers</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Vetted professionals with proven track records</p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <FaClock className="text-white text-xl" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Fast Delivery</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Quick turnaround times for urgent projects</p>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl mt-8"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <FaMoneyBillWave className="text-white text-xl" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Best Prices</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Competitive rates for quality services</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-[#5bbb7b] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              POPULAR SERVICES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Browse by Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most in-demand freelance services across various categories
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#5bbb7b] font-semibold">{service.jobs}</span>
                  <FaArrowRight className="text-[#5bbb7b] group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
                transition={{ delay: 0.6, duration: 0.8 }}
                className="grid grid-cols-4 gap-6 mt-12"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">960M</div>
                  <div className="text-white/70 text-sm mt-1">Total Freelancer</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">850M</div>
                  <div className="text-white/70 text-sm mt-1">Positive Review</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">98M</div>
                  <div className="text-white/70 text-sm mt-1">Order recieved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">250M</div>
                  <div className="text-white/70 text-sm mt-1">Projects Completed</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Image Cards */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Card 1 */}
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="w-12 h-12 bg-[#5bbb7b] rounded-full flex items-center justify-center mb-4">
                    <FaCheck className="text-white text-xl" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Proof of quality</h3>
                  <p className="text-white/70 text-sm">Lorem Ipsum Dolor Amet</p>
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8"
                >
                  <div className="w-12 h-12 bg-[#5bbb7b] rounded-full flex items-center justify-center mb-4">
                    <FaUsers className="text-white text-xl" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">58M+ Professionals</h3>
                  <p className="text-white/70 text-sm">Expert freelancers ready</p>
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="w-12 h-12 bg-[#5bbb7b] rounded-full flex items-center justify-center mb-4">
                    <FaBriefcase className="text-white text-xl" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Safe and secure</h3>
                  <p className="text-white/70 text-sm">Protected payments</p>
                </motion.div>

                {/* Card 4 */}
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-8"
                >
                  <div className="w-12 h-12 bg-[#5bbb7b] rounded-full flex items-center justify-center mb-4">
                    <FaArrowRight className="text-white text-xl" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">24/7 support</h3>
                  <p className="text-white/70 text-sm">We're here to help</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Latest Jobs Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Latest Job Opportunities</h2>
          <p className="text-lg text-gray-600">Explore the newest jobs posted on our platform</p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {latestJobs.slice(0, 6).map((job) => (
              <motion.div 
                key={job._id} 
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="card bg-base-100 shadow-xl h-full"
              >
                <figure className="h-48">
                  <img 
                    src={job.coverImage || 'https://i.ibb.co/f4kTLT7/job-placeholder.jpg'} 
                    alt={job.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg">{job.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{job.summary}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="badge bg-green-500 text-white border-0">{job.category}</div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Posted by: {job.postedBy}</p>
                  <div className="card-actions justify-end mt-4">
                    <Link to={`/job/${job._id}`} className="btn bg-green-600 hover:bg-green-700 text-white btn-sm border-0">
                      View Details <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && latestJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 mb-4">No jobs available at the moment. Be the first to post!</p>
            <Link to="/add-job" className="btn bg-green-600 hover:bg-green-700 text-white border-0">Post a Job</Link>
          </div>
        )}

        {latestJobs.length > 0 && (
          <div className="text-center mt-8">
            <Link to="/all-jobs" className="btn btn-outline border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              View All Jobs
            </Link>
          </div>
        )}
      </div>

      {/* Top Categories Section */}
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Top Categories</h2>
            <p className="text-lg text-gray-600">Explore jobs by popular categories</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { name: 'Web Development', icon: FaCode, count: '150+', color: 'text-blue-500' },
              { name: 'Digital Marketing', icon: FaBullhorn, count: '120+', color: 'text-green-500' },
              { name: 'Graphics Design', icon: FaPaintBrush, count: '100+', color: 'text-purple-500' },
              { name: 'Content Writing', icon: FaPenFancy, count: '80+', color: 'text-orange-500' }
            ].map((category, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="card bg-base-100 shadow-lg p-6 text-center cursor-pointer"
              >
                <div className={`text-5xl mb-4 ${category.color} flex justify-center`}>
                  <category.icon />
                </div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} Jobs Available</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* About Platform Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">About FreelanceHub</h2>
            <p className="text-lg text-gray-600 mb-4">
              FreelanceHub is your trusted platform for connecting talented freelancers with amazing job opportunities. 
              We provide a secure and reliable marketplace where professionals can showcase their skills and clients can find the perfect match for their projects.
            </p>
            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-3">
                <FaCheck className="text-success text-xl mt-1" />
                <div>
                  <h4 className="font-bold">Verified Projects</h4>
                  <p className="text-gray-600">All jobs are verified for authenticity and quality</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheck className="text-success text-xl mt-1" />
                <div>
                  <h4 className="font-bold">Secure Payments</h4>
                  <p className="text-gray-600">Safe and secure transaction handling</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheck className="text-success text-xl mt-1" />
                <div>
                  <h4 className="font-bold">24/7 Support</h4>
                  <p className="text-gray-600">Round-the-clock customer support</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="card bg-primary text-white p-8 text-center">
              <FaBriefcase className="text-5xl mx-auto mb-4" />
              <h3 className="text-4xl font-bold">500+</h3>
              <p>Active Jobs</p>
            </div>
            <div className="card bg-success text-white p-8 text-center">
              <FaUsers className="text-5xl mx-auto mb-4" />
              <h3 className="text-4xl font-bold">1000+</h3>
              <p>Freelancers</p>
            </div>
            <div className="card bg-accent text-white p-8 text-center col-span-2">
              <h3 className="text-4xl font-bold mb-2">98% Success Rate</h3>
              <p>Client Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
