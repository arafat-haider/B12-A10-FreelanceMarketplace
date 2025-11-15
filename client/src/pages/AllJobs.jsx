// All Jobs page - Display all jobs with modern design
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaSort, FaEye, FaUser, FaTag, FaCalendar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AllJobs = () => {
  const [sortOrder, setSortOrder] = useState('desc'); // desc = newest first

  // Fetch all jobs from database
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['allJobs'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:5000/jobs');
      return response.data;
    }
  });

  // Sort jobs by creation date
  const sortedJobs = [...jobs].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // Toggle sort order
  const toggleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#1f4b3f]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
        >
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#1f4b3f] to-[#5bbb7b] bg-clip-text text-transparent">
              All Jobs
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              Discover {sortedJobs.length} amazing opportunities waiting for you
            </p>
          </div>
          <button
            onClick={toggleSort}
            className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-[#1f4b3f] text-[#1f4b3f] rounded-xl hover:bg-[#1f4b3f] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaSort />
            Sort by Date ({sortOrder === 'desc' ? 'Newest' : 'Oldest'})
          </button>
        </motion.div>

        {/* Jobs Grid */}
        {sortedJobs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Jobs Posted Yet</h3>
            <p className="text-gray-500">Be the first to post a job!</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {sortedJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 group hover:scale-105"
              >
                {/* Cover Image */}
                <div className="h-48 bg-gradient-to-br from-[#1f4b3f] to-[#5bbb7b] relative overflow-hidden">
                  {job.coverImage ? (
                    <img 
                      src={job.coverImage} 
                      alt={job.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://i.ibb.co/QnwC4sG/default-job.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                      {job.category === 'Web Development' && '💻'}
                      {job.category === 'Digital Marketing' && '📈'}
                      {job.category === 'Graphics Designing' && '🎨'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[#1f4b3f]">
                    {job.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#1f4b3f] transition-colors">
                    {job.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {job.summary}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaUser className="text-[#5bbb7b]" />
                      <span>By {job.postedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaCalendar className="text-[#5bbb7b]" />
                      <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Link 
                    to={`/job-details/${job._id}`}
                    className="w-full bg-gradient-to-r from-[#1f4b3f] to-[#5bbb7b] text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-[#5bbb7b] hover:to-[#1f4b3f] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaEye />
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
