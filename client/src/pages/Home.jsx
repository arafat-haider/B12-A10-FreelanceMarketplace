import { motion } from 'framer-motion';
import { FaSearch, FaBriefcase, FaUsers, FaMoneyBillWave, FaPlay, FaCheck, FaArrowRight, FaStar, FaQuoteLeft, FaSun, FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';


const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const { data: latestJobs = [], isLoading } = useQuery({
    queryKey: ['latestJobs'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/jobs?limit=6');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      return response.json();
    }
  });

  const services = [
    {
      icon: FaBriefcase,
      title: "Programming & Tech",
      description: "Web development, mobile apps, and software solutions",
      jobs: "2,847 jobs",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FaUsers,
      title: "Design & Creative",
      description: "Logo design, UI/UX, graphics, and branding services",
      jobs: "1,923 jobs",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: FaSearch,
      title: "Digital Marketing",
      description: "SEO, social media, content marketing strategies",
      jobs: "1,456 jobs",
      color: "from-green-500 to-green-600"
    },
    {
      icon: FaMoneyBillWave,
      title: "Writing & Translation",
      description: "Content writing, copywriting, translation services",
      jobs: "987 jobs",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      initials: "SJ",
      rating: 5,
      comment: "This platform helped me find the perfect developer for my startup. Amazing quality and communication!"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      initials: "MC",
      rating: 5,
      comment: "The quality of work and professionalism exceeded my expectations. Will definitely use again!"
    },
    {
      name: "Emily Rodriguez",
      role: "E-commerce Owner",
      initials: "ER",
      rating: 5,
      comment: "Fast delivery, excellent communication, and outstanding results. This platform is a game-changer!"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 rounded-full p-3 transition-all duration-300 hover:scale-110"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <FaSun className="w-5 h-5 text-yellow-500" />
          ) : (
            <FaMoon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>
      
      {/* Hero Section - Enhanced Professional Design */}
      <section className="relative bg-gradient-to-br from-[#1f4b3f] via-[#2d6b57] to-[#1f4b3f] dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-[700px] flex items-center overflow-hidden transition-colors duration-300">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#5bbb7b] rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#4aa66a] rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full opacity-5 blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-white"
            >
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold text-white/90 border border-white/20">
                  Most Trusted & Reliable Marketplace
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Your Most
                <span className="block bg-gradient-to-r from-[#5bbb7b] to-[#4aa66a] bg-clip-text text-transparent">
                  Reliable Partner
                </span>
                for Quality Work
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed max-w-xl">
                Join our trusted marketplace where quality meets reliability. Connect with verified professionals and get guaranteed results with secure payments and 24/7 support.
              </p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 flex flex-col sm:flex-row gap-2 mb-8 border border-white/20"
              >
                <div className="flex items-center flex-1 bg-white/5 rounded-xl px-4 py-3">
                  <FaSearch className="text-white/60 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Search for any service..."
                    className="bg-transparent text-white placeholder-white/60 flex-1 outline-none text-lg"
                  />
                </div>
                <div className="flex items-center bg-white/5 rounded-xl px-4 py-3 min-w-[200px]">
                  <select className="bg-transparent text-white flex-1 outline-none cursor-pointer">
                    <option value="">Select Category</option>
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
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link 
                  to="/add-job"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#5bbb7b] to-[#4aa66a] hover:from-[#4aa66a] hover:to-[#3d9558] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <FaBriefcase />
                  Create a Job
                </Link>
                <Link 
                  to="/all-jobs"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#1f4b3f] px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <FaSearch />
                  Browse Jobs
                </Link>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
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
                  <div className="text-white/70 text-sm mt-1">Order received</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">250M</div>
                  <div className="text-white/70 text-sm mt-1">Projects Completed</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="w-12 h-12 bg-[#5bbb7b] rounded-full flex items-center justify-center mb-4">
                    <FaCheck className="text-white text-xl" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Proof of quality</h3>
                  <p className="text-white/70 text-sm">Check any project's work samples</p>
                </motion.div>

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
      </section>

      {/* About The Platform Section */}
      <section className="py-20 bg-gradient-to-br from-[#f8fffe] to-[#f0fdf4]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <span className="inline-block bg-[#5bbb7b] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                ABOUT FreelanceHub
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Your Gateway to
                <span className="block text-[#1f4b3f]">
                  Limitless Possibilities
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                FreelanceHub is more than just a marketplace—it's where dreams meet opportunities. 
                We've built a platform that connects talented freelancers with visionary clients, 
                creating a ecosystem of trust, quality, and success.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="w-12 h-12 bg-[#1f4b3f] rounded-lg flex items-center justify-center mb-4">
                    <FaCheck className="text-white text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Verified Professionals</h3>
                  <p className="text-gray-600 text-sm">Every freelancer goes through our rigorous verification process</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="w-12 h-12 bg-[#5bbb7b] rounded-lg flex items-center justify-center mb-4">
                    <FaMoneyBillWave className="text-white text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Payments</h3>
                  <p className="text-gray-600 text-sm">Protected transactions with escrow and milestone payments</p>
                </motion.div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-[#1f4b3f] text-white rounded-2xl p-8"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm opacity-90">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm opacity-90">Support</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm opacity-90">Happy Clients</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#1f4b3f] to-[#5bbb7b] rounded-full flex items-center justify-center">
                    <FaBriefcase className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">For Businesses</h3>
                    <p className="text-gray-600">Find expert talent instantly</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <FaCheck className="text-[#5bbb7b]" />
                    <span className="text-gray-700">Access to 50,000+ skilled freelancers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheck className="text-[#5bbb7b]" />
                    <span className="text-gray-700">Project management tools included</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheck className="text-[#5bbb7b]" />
                    <span className="text-gray-700">Money-back guarantee</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#5bbb7b] to-[#4aa66a] rounded-full flex items-center justify-center">
                    <FaUsers className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">For Freelancers</h3>
                    <p className="text-gray-600">Build your career with us</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <FaCheck className="text-[#5bbb7b]" />
                    <span className="text-gray-700">Flexible working opportunities</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheck className="text-[#5bbb7b]" />
                    <span className="text-gray-700">Secure and timely payments</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaCheck className="text-[#5bbb7b]" />
                    <span className="text-gray-700">Skill development resources</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Top Categories Section - Enhanced */}
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
              TOP CATEGORIES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Explore Popular Job Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most in-demand freelance services across various industries and skill sets
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
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer relative overflow-hidden"
              >
                {/* Background Gradient Animation */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}></div>
                
                <div className="relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <service.icon className="text-white text-3xl" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#5bbb7b] bg-[#5bbb7b]/10 px-3 py-1 rounded-full">
                      {service.jobs}
                    </span>
                    <div className="flex items-center gap-2 text-[#1f4b3f] font-semibold text-sm group-hover:text-[#5bbb7b] transition-colors">
                      <span>Explore</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Browse All Categories CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mt-16"
          >
            <Link 
              to="/all-jobs"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#1f4b3f] to-[#2d6b57] hover:from-[#2d6b57] hover:to-[#1f4b3f] text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <FaSearch />
              Browse All Categories
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest Jobs Section - Dynamic from MongoDB */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-[#5bbb7b] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              FRESH OPPORTUNITIES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Latest Job Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the newest jobs posted on our platform - updated in real-time from our database
            </p>
            
            {latestJobs.length > 0 && (
              <div className="mt-6 flex justify-center">
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2">
                  <p className="text-blue-800 text-sm font-medium">
                    Displaying latest {latestJobs.length} jobs from our database
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg text-[#5bbb7b]"></span>
            </div>
          ) : latestJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No jobs available yet</h3>
              <p className="text-gray-600 mb-6">Be the first to post a job on our platform!</p>
              <Link 
                to="/add-job"
                className="btn bg-[#5bbb7b] hover:bg-[#4aa66a] text-white border-none"
              >
                Post First Job
              </Link>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {latestJobs.map((job) => (
                <motion.div 
                  key={job._id} 
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                >
                  {/* Cover Image or Category Display */}
                  <div className="h-48 bg-gradient-to-br from-[#1f4b3f] via-[#2d6b57] to-[#5bbb7b] relative overflow-hidden">
                    {job.coverImage ? (
                      <img 
                        src={job.coverImage} 
                        alt={job.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x200/1f4b3f/white?text=Job+Image';
                        }}
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-white">
                        <div className="text-center">
                          <div className="text-4xl mb-2">
                            {job.category === 'Web Development' && '💻'}
                            {job.category === 'Digital Marketing' && '📈'}
                            {job.category === 'Graphics Designing' && '🎨'}
                            {!['Web Development', 'Digital Marketing', 'Graphics Designing'].includes(job.category) && '💼'}
                          </div>
                          <div className="text-sm font-semibold">{job.category}</div>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 right-4">
                      {new Date(job.createdAt) > new Date(Date.now() - 7*24*60*60*1000) && (
                        <span className="bg-[#5bbb7b] text-white px-2 py-1 rounded-full text-xs font-semibold">
                          NEW
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-[#1f4b3f] px-3 py-1 rounded-full text-sm font-semibold">
                        {job.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#1f4b3f] transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {job.summary}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Posted by:</span>
                        <span className="font-medium text-gray-700">
                          {job.postedBy}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium text-gray-700">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/job-details/${job._id}`}
                      className="w-full bg-[#1f4b3f] hover:bg-[#2d6b57] text-white py-3 px-4 rounded-xl font-semibold text-center block transition-all duration-300 transform hover:scale-105"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link 
              to="/all-jobs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1f4b3f] to-[#2d6b57] hover:from-[#2d6b57] hover:to-[#1f4b3f] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <FaBriefcase />
              View All Jobs
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-[#5bbb7b] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              TESTIMONIALS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from satisfied clients who found success on our platform
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <FaQuoteLeft className="text-[#5bbb7b] text-2xl mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.comment}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#1f4b3f] text-white flex items-center justify-center font-bold text-lg mr-4">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#1f4b3f]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Platform Statistics</h2>
            <p className="text-xl text-white/80">Trusted by millions worldwide</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <FaBriefcase className="text-5xl mx-auto mb-4 text-[#5bbb7b]" />
              <h3 className="text-4xl font-bold text-white mb-2">500+</h3>
              <p className="text-white/80 font-medium">Active Jobs</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <FaUsers className="text-5xl mx-auto mb-4 text-[#5bbb7b]" />
              <h3 className="text-4xl font-bold text-white mb-2">1000+</h3>
              <p className="text-white/80 font-medium">Freelancers</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-5xl mx-auto mb-4 text-[#5bbb7b] flex justify-center">
                <FaCheck />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">98%</h3>
              <p className="text-white/80 font-medium">Success Rate</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-5xl mx-auto mb-4 text-[#5bbb7b] flex justify-center items-center">
                
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">24/7</h3>
              <p className="text-white/80 font-medium">Support Available</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
