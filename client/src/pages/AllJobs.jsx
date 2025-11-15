// All Jobs page - Modern freelance marketplace design inspired by LinkedIn
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaSort, FaEye, FaUser, FaTag, FaCalendar, FaClock, FaImage, FaSearch, FaFilter, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AllJobs = () => {
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all jobs from database
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['allJobs'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/jobs');
      return response.data;
    }
  });

  // Filter and sort jobs
  const filteredJobs = jobs.filter(job => {
    const matchesCategory = filterCategory === 'all' || job.category === filterCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.postedBy.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const toggleSort = () => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');

  const categories = ['all', 'Web Development', 'Digital Marketing', 'Graphics Designing'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffTime = Math.abs(now - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Posted today';
    if (diffDays <= 7) return `Posted ${diffDays} days ago`;
    if (diffDays <= 30) return `Posted ${Math.ceil(diffDays / 7)} weeks ago`;
    return `Posted ${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#1f4b3f] to-[#5bbb7b] bg-clip-text text-transparent mb-4">
            Explore Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover {sortedJobs.length} amazing job opportunities from talented clients worldwide. Find your next project and grow your freelancing career.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, skills, or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5bbb7b] focus:ring-4 focus:ring-[#5bbb7b]/20 transition-all duration-300"
              />
            </div>

            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5bbb7b] focus:ring-4 focus:ring-[#5bbb7b]/20 transition-all duration-300 appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={toggleSort}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1f4b3f] hover:bg-[#2d6b57] text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              <FaSort />
              {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
            </button>
          </div>
        </motion.div>

        {/* Loading/Error States */}
        {isLoading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center py-20"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f4b3f]"></div>
              <p className="text-gray-600 font-medium">Loading amazing opportunities...</p>
            </div>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center py-20"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-semibold text-red-600 mb-2">Failed to Load Jobs</h3>
              <p className="text-gray-600 mb-4">Please try refreshing the page or check your internet connection.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </motion.div>
        ) : sortedJobs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Jobs Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or browse all categories</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
              }}
              className="bg-[#5bbb7b] hover:bg-[#4aa66a] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <>
            {/* Results Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6 flex justify-between items-center"
            >
              <p className="text-gray-600">
                Showing <span className="font-semibold text-[#1f4b3f]">{sortedJobs.length}</span> jobs
                {searchTerm && <span> for "<span className="font-semibold">{searchTerm}</span>"</span>}
                {filterCategory !== 'all' && <span> in <span className="font-semibold">{filterCategory}</span></span>}
              </p>
              
              <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
                <span>Sort by:</span>
                <button 
                  onClick={toggleSort}
                  className="text-[#1f4b3f] hover:text-[#2d6b57] font-medium"
                >
                  {sortOrder === 'desc' ? 'Most Recent' : 'Oldest First'}
                </button>
              </div>
            </motion.div>

            {/* Jobs List - LinkedIn Style Cards */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {sortedJobs.map((job) => (
                <motion.div
                  key={job._id}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex gap-6">
                      {/* Job Cover Image/Logo */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-[#1f4b3f] to-[#5bbb7b] flex items-center justify-center">
                          {job.coverImage ? (
                            <img 
                              src={job.coverImage} 
                              alt={job.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            className={`w-full h-full flex items-center justify-center text-white text-xl ${job.coverImage ? 'hidden' : 'flex'}`}
                          >
                            {job.category === 'Web Development' && '💻'}
                            {job.category === 'Digital Marketing' && '📈'}
                            {job.category === 'Graphics Designing' && '🎨'}
                            {!['Web Development', 'Digital Marketing', 'Graphics Designing'].includes(job.category) && '💼'}
                          </div>
                        </div>
                      </div>

                      {/* Job Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1 min-w-0 pr-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1 hover:text-[#1f4b3f] transition-colors cursor-pointer">
                              <Link to={`/job-details/${job._id}`}>
                                {job.title}
                              </Link>
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                              <div className="flex items-center gap-1">
                                <FaUser className="text-[#5bbb7b]" />
                                <span className="font-medium">{job.postedBy}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FaClock className="text-[#5bbb7b]" />
                                <span>{getTimeAgo(job.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Category Badge & New Label */}
                          <div className="flex flex-col items-end gap-2">
                            <span className="bg-[#1f4b3f]/10 text-[#1f4b3f] px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                              <FaTag className="text-xs" />
                              {job.category}
                            </span>
                            {new Date(job.createdAt) > new Date(Date.now() - 24*60*60*1000) && (
                              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Job Summary */}
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                          {job.summary}
                        </p>

                        {/* Action Bar */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-500">
                              <FaCalendar className="inline mr-1 text-[#5bbb7b]" />
                              Posted on {new Date(job.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button className="text-gray-400 hover:text-[#5bbb7b] transition-colors">
                              <FaStar />
                            </button>
                            <Link 
                              to={`/job-details/${job._id}`}
                              className="bg-[#1f4b3f] hover:bg-[#2d6b57] text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                            >
                              <FaEye className="text-sm" />
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-md border border-gray-100">
                <span className="text-gray-600">Showing all {sortedJobs.length} available opportunities</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
