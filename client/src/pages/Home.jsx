import { motion } from 'framer-motion';
import { FaSearch, FaBriefcase, FaUsers, FaMoneyBillWave, FaPlay, FaCheck, FaArrowRight, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
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
      image: "https://i.ibb.co/YcTdFqR/person1.jpg",
      rating: 5,
      comment: "This platform helped me find the perfect developer for my startup. Amazing quality and communication!"
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

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
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
                      src={job.image || "https://via.placeholder.com/300x200"} 
                      alt={job.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-lg">
                      {job.title}
                      {new Date(job.createdAt) > new Date(Date.now() - 7*24*60*60*1000) && (
                        <div className="badge badge-secondary">NEW</div>
                      )}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">Budget:</span>
                        <span className="text-primary">${job.min_price} - ${job.max_price}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                      <span>{job.category}</span>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <Link 
                        to={`/job/${job._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/all-jobs"
              className="btn btn-outline btn-primary btn-lg"
            >
              View All Jobs
            </Link>
          </div>
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
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
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
            <div className="card bg-accent text-white p-8 text-center">
              <h3 className="text-4xl font-bold mb-2">98%</h3>
              <p>Success Rate</p>
            </div>
            <div className="card bg-secondary text-white p-8 text-center">
              <h3 className="text-4xl font-bold mb-2">24/7</h3>
              <p>Support Available</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;