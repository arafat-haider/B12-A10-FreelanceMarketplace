
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  FaCalendar, 
  FaUser, 
  FaTag, 
  FaEnvelope, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaBriefcase,
  FaClock,
  FaShare,
  FaHeart,
  FaExclamationTriangle
} from 'react-icons/fa';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: job, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/jobs/${id}`);
      return response.data;
    }
  });


  const handleAcceptJob = async () => {
    if (job.userEmail === user.email) {
      toast.error('You cannot accept your own job!');
      return;
    }

    const acceptedTask = {
      jobId: job._id,
      jobTitle: job.title,
      category: job.category,
      postedBy: job.postedBy,
      coverImage: job.coverImage,
      acceptedBy: user.email,
      acceptedByName: user.displayName || 'Anonymous',
      acceptedDate: new Date().toISOString()
    };

    try {
      await axios.post('http://localhost:5000/accepted-tasks', acceptedTask);
      toast.success('Job accepted successfully!');
      navigate('/my-accepted-tasks');
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to accept job. Please try again');
      }
    }
  };

  // Get time ago utility
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffTime = Math.abs(now - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f4b3f]"></div>
            <p className="text-gray-600 font-medium">Loading job details...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/all-jobs')} 
            className="bg-[#1f4b3f] hover:bg-[#2d6b57] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <FaArrowLeft />
            Back to All Jobs
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/* Back Navigation */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/all-jobs')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#1f4b3f] mb-6 transition-colors duration-300"
        >
          <FaArrowLeft />
          <span className="font-medium">Back to All Jobs</span>
        </motion.button>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content - Job Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            
            {/* Job Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              
              {/* Job Cover & Company Info */}
              <div className="flex gap-6 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1f4b3f] to-[#5bbb7b] flex items-center justify-center">
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
                      className={`w-full h-full flex items-center justify-center text-white text-2xl ${job.coverImage ? 'hidden' : 'flex'}`}
                    >
                      {job.category === 'Web Development' && '💻'}
                      {job.category === 'Digital Marketing' && '📈'}
                      {job.category === 'Graphics Designing' && '🎨'}
                      {!['Web Development', 'Digital Marketing', 'Graphics Designing'].includes(job.category) && '💼'}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-[#5bbb7b]" />
                          <span className="font-medium">{job.postedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaClock className="text-[#5bbb7b]" />
                          <span>{getTimeAgo(job.createdAt || job.postedDate)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300">
                        <FaHeart />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-300">
                        <FaShare />
                      </button>
                    </div>
                  </div>

                  {/* Category & Status */}
                  <div className="flex items-center gap-3">
                    <span className="bg-[#1f4b3f]/10 text-[#1f4b3f] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                      <FaTag className="text-xs" />
                      {job.category}
                    </span>
                    {new Date(job.createdAt || job.postedDate) > new Date(Date.now() - 7*24*60*60*1000) && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        🔥 Hot
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About this job</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                    {job.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Requirements & Skills */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What we're looking for</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Experience in {job.category}</h3>
                    <p className="text-gray-600">Strong background and portfolio in this field</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Professional Communication</h3>
                    <p className="text-gray-600">Excellent written and verbal communication skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Timely Delivery</h3>
                    <p className="text-gray-600">Commitment to meeting project deadlines</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">About the Client</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1f4b3f] to-[#5bbb7b] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {job.postedBy?.charAt(0)?.toUpperCase() || 'C'}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{job.postedBy}</h3>
                  <p className="text-gray-600 text-sm">Project Owner</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaEnvelope className="text-[#5bbb7b]" />
                  <span>{job.userEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCalendar className="text-[#5bbb7b]" />
                  <span>Member since {new Date(job.createdAt || job.postedDate).getFullYear()}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar - Apply Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl mb-2">💼</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Ready to start?</h3>
                <p className="text-gray-600 text-sm">Apply for this amazing opportunity</p>
              </div>

              {/* Job Stats */}
              <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-medium text-gray-900">
                    {new Date(job.createdAt || job.postedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-gray-900">{job.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-medium text-green-600">Still accepting</span>
                </div>
              </div>

              {/* Apply Button */}
              {job.userEmail === user?.email ? (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <FaExclamationTriangle className="text-yellow-600" />
                      <p className="text-yellow-800 font-medium">This is your own job posting</p>
                    </div>
                  </div>
                  <button className="w-full bg-gray-200 text-gray-500 py-4 rounded-xl font-semibold cursor-not-allowed">
                    <FaExclamationTriangle className="inline mr-2" />
                    Cannot Apply to Own Job
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAcceptJob}
                  className="w-full bg-gradient-to-r from-[#1f4b3f] to-[#5bbb7b] hover:from-[#2d6b57] hover:to-[#4aa66a] text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
                >
                  <FaBriefcase />
                  Accept This Job
                </button>
              )}

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="text-blue-500 mt-1">
                    <FaCheckCircle />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 mb-1">Safe & Secure</p>
                    <p className="text-blue-700">All projects are verified and client information is protected.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
