import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold bg-gradient-to-r from-[#1f4b3f] to-[#5bbb7b] bg-clip-text text-transparent mb-4">
            404
          </h1>
          <div className="text-6xl mb-4">🔍</div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-6">
            Oops! The page you're looking for seems to have gone on a job hunt. 
            Let's help you find your way back to opportunities.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            to="/"
            className="inline-flex items-center gap-3 bg-[#1f4b3f] hover:bg-[#2d6b57] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaHome />
            Back to Home
          </Link>
          
          <Link 
            to="/all-jobs"
            className="inline-flex items-center gap-3 bg-[#5bbb7b] hover:bg-[#4aa66a] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaSearch />
            Browse Jobs
          </Link>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-12"
        >
          <p className="text-gray-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-[#1f4b3f]">
            <Link to="/all-jobs" className="hover:underline">All Jobs</Link>
            <span className="text-gray-300">|</span>
            <Link to="/add-job" className="hover:underline">Post a Job</Link>
            <span className="text-gray-300">|</span>
            <Link to="/my-added-jobs" className="hover:underline">My Jobs</Link>
            <span className="text-gray-300">|</span>
            <Link to="/my-accepted-tasks" className="hover:underline">My Tasks</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
