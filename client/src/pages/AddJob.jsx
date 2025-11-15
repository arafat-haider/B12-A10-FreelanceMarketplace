// Add Job page - Create a new job posting
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaBriefcase, FaUser, FaTags, FaFileAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const AddJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    summary: '',
    coverImage: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    if (!formData.title.trim()) {
      toast.error('Please enter a job title');
      setIsSubmitting(false);
      return;
    }
    if (!formData.summary.trim()) {
      toast.error('Please provide a job description');
      setIsSubmitting(false);
      return;
    }
    if (!user?.email) {
      toast.error('Please login to post a job');
      setIsSubmitting(false);
      return;
    }

    const jobData = {
      title: formData.title.trim(),
      postedBy: user.displayName || user.email || 'Anonymous',
      category: formData.category,
      summary: formData.summary.trim(),
      coverImage: formData.coverImage.trim() || 'https://i.ibb.co/QnwC4sG/default-job.jpg',
      userEmail: user.email
    };

    console.log('Submitting job data:', jobData);

    try {
      const response = await axios.post('http://localhost:5000/jobs', jobData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Job posted successfully:', response.data);
      toast.success('Job posted successfully! 🎉');
      navigate('/my-added-jobs');
    } catch (error) {
      console.error('Error posting job:', error);
      
      // More specific error messages
      if (error.response) {
        // Server responded with error status
        const statusCode = error.response.status;
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Server error';
        
        if (statusCode === 400) {
          toast.error(`Validation Error: ${errorMessage}`);
        } else if (statusCode === 401) {
          toast.error('Please login again to post a job');
        } else if (statusCode === 500) {
          toast.error(`Server Error: ${errorMessage}`);
        } else {
          toast.error(`Error ${statusCode}: ${errorMessage}`);
        }
      } else if (error.request) {
        // Network error
        toast.error('Network error: Please check your internet connection or try again later');
      } else {
        // Other error
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fffe] via-white to-[#f0fdf4] py-12 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#5bbb7b] rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#1f4b3f] rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#1f4b3f] to-[#5bbb7b] rounded-full mb-6 shadow-lg">
            <FaBriefcase className="text-white text-3xl" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#1f4b3f] to-[#5bbb7b] bg-clip-text text-transparent mb-4">
            Post Your Job
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with talented freelancers and bring your project to life. 
            <span className="text-[#1f4b3f] font-semibold">It's free and takes only minutes!</span>
          </p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#1f4b3f] to-[#2d6b57] p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaFileAlt className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Job Details</h2>
                <p className="text-white/80">Fill in the information below</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-12">

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Grid Layout for Better Organization */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Job Title */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="md:col-span-2"
                >
                  <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                    <FaBriefcase className="text-[#1f4b3f]" />
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g. Full Stack React Developer for E-commerce Platform"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-[#1f4b3f] focus:ring-4 focus:ring-[#1f4b3f]/20 transition-all duration-300 bg-gray-50 focus:bg-white shadow-sm"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </motion.div>

                {/* Posted By */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                    <FaUser className="text-[#5bbb7b]" />
                    Posted By
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
                    value={user?.displayName || 'Anonymous'}
                    disabled
                  />
                </motion.div>

                {/* Category */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                    <FaTags className="text-[#1f4b3f]" />
                    Category *
                  </label>
                  <select
                    name="category"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-[#1f4b3f] focus:ring-4 focus:ring-[#1f4b3f]/20 transition-all duration-300 bg-gray-50 focus:bg-white shadow-sm cursor-pointer"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Graphics Designing">Graphics Designing</option>
                  </select>
                </motion.div>
              </div>

              {/* Job Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                  <FaFileAlt className="text-[#5bbb7b]" />
                  Project Description *
                </label>
                <textarea
                  name="summary"
                  placeholder="Describe your project in detail...\n\n• What are you looking to accomplish?\n• What skills are required?\n• What's your timeline and budget range?\n• Any specific requirements or preferences?"
                  className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl h-40 resize-none focus:border-[#1f4b3f] focus:ring-4 focus:ring-[#1f4b3f]/20 transition-all duration-300 bg-gray-50 focus:bg-white shadow-sm"
                  value={formData.summary}
                  onChange={handleChange}
                  required
                ></textarea>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-[#5bbb7b] rounded-full"></div>
                  <p className="text-sm text-gray-600">Be specific to attract the right freelancers</p>
                </div>
              </motion.div>

              {/* Cover Image URL */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
              >
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                  <FaFileAlt className="text-[#1f4b3f]" />
                  Cover Image URL
                </label>
                <input
                  type="url"
                  name="coverImage"
                  placeholder="https://i.ibb.co/example/your-image.jpg"
                  className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-[#1f4b3f] focus:ring-4 focus:ring-[#1f4b3f]/20 transition-all duration-300 bg-gray-50 focus:bg-white shadow-sm"
                  value={formData.coverImage}
                  onChange={handleChange}
                />
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-[#5bbb7b] rounded-full"></div>
                  <p className="text-sm text-gray-600">Optional: Add an image URL for your job posting. We recommend using ImgBB or similar services.</p>
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                  <FaEnvelope className="text-[#1f4b3f]" />
                  Contact Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 cursor-not-allowed shadow-sm"
                  value={user?.email || ''}
                  disabled
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="pt-6"
              >
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`group relative w-full bg-gradient-to-r from-[#1f4b3f] via-[#2d6b57] to-[#1f4b3f] hover:from-[#2d6b57] hover:via-[#1f4b3f] hover:to-[#2d6b57] text-white font-bold text-xl py-5 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-3xl border-2 border-transparent hover:border-white/20 overflow-hidden ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5bbb7b] to-[#4aa66a] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  
                  {/* Button Content */}
                  <div className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Posting Job...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        <span>Post Your Job</span>
                        <div className="absolute -right-2 -top-2 w-6 h-6 bg-[#5bbb7b] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                      </>
                    )}
                  </div>
                </button>
                
                {/* Help Text */}
                <p className="text-center text-gray-500 mt-4 text-sm">
                  By posting, you agree to our terms and conditions. Your job will be visible to thousands of freelancers.
                </p>
              </motion.div>
            </form>
          </div>
        </motion.div>
        
        {/* Success Tips */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 grid md:grid-cols-3 gap-6 text-center"
        >
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
            <div className="w-12 h-12 bg-[#1f4b3f] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Clear Description</h3>
            <p className="text-sm text-gray-600">Be specific about requirements and expectations</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
            <div className="w-12 h-12 bg-[#5bbb7b] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Right Category</h3>
            <p className="text-sm text-gray-600">Choose the most relevant category for visibility</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
            <div className="w-12 h-12 bg-[#1f4b3f] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Quick Response</h3>
            <p className="text-sm text-gray-600">Respond promptly to freelancer proposals</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddJob;
