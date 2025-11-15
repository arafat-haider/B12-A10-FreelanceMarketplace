// Update Job page - Edit job details
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaBriefcase, FaUser, FaTags, FaFileAlt, FaImage, FaSave, FaArrowLeft } from 'react-icons/fa';

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    summary: '',
    coverImage: ''
  });



  // Fetch job details
  const { data: job, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/jobs/${id}`);
      return response.data;
    }
  });

  // Pre-fill form with job data
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        category: job.category,
        summary: job.summary,
        coverImage: job.coverImage
      });
    }
  }, [job]);

  // Update job mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const response = await axios.put(`http://localhost:5000/jobs/${id}?email=${user.email}`, updatedData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Job updated successfully!');
      setTimeout(() => navigate('/my-added-jobs'), 1500);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to update job';
      toast.error(errorMessage);
      console.error('Update job error:', error);
    }
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1f4b3f] via-[#2d6b57] to-[#5bbb7b] flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white font-medium">Loading job details...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f4b3f] via-[#2d6b57] to-[#5bbb7b] py-12 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23ffffff' stroke-width='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-4xl relative z-10 mb-8"
      >
        <div className="text-center text-white">
          <motion.button
            onClick={() => navigate('/my-added-jobs')}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white hover:bg-white/30 transition-all duration-300"
          >
            <FaArrowLeft /> Back to My Jobs
          </motion.button>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Update Job Posting
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Modify your job details to attract the best talent
          </p>
        </div>
      </motion.div>

      {/* Main Form Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container mx-auto max-w-4xl relative z-10"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#1f4b3f] to-[#2d6b57] p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaFileAlt className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Job Information</h2>
                <p className="text-white/80">Update your job posting details</p>
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

                {/* Category */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                    <FaTags className="text-[#5bbb7b]" />
                    Category *
                  </label>
                  <select
                    name="category"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-[#1f4b3f] focus:ring-4 focus:ring-[#1f4b3f]/20 transition-all duration-300 bg-gray-50 focus:bg-white shadow-sm"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Web Development">💻 Web Development</option>
                    <option value="Digital Marketing">📈 Digital Marketing</option>
                    <option value="Graphics Designing">🎨 Graphics Designing</option>
                  </select>
                </motion.div>

                {/* Cover Image URL */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                    <FaImage className="text-[#5bbb7b]" />
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    name="coverImage"
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-[#1f4b3f] focus:ring-4 focus:ring-[#1f4b3f]/20 transition-all duration-300 bg-gray-50 focus:bg-white shadow-sm"
                    value={formData.coverImage}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-gray-500 mt-1">Optional: Add an image URL to make your job more attractive</p>
                </motion.div>
              </div>

              {/* Job Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                  <FaFileAlt className="text-[#1f4b3f]" />
                  Job Summary *
                </label>
                <textarea
                  name="summary"
                  rows="6"
                  placeholder="Describe your project requirements, expected deliverables, timeline, and any specific skills needed..."
                  className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-[#1f4b3f] focus:ring-4 focus:ring-[#1f4b3f]/20 transition-all duration-300 bg-gray-50 focus:bg-white shadow-sm resize-none"
                  value={formData.summary}
                  onChange={handleChange}
                  required
                />
                <div className="flex justify-between mt-1">
                  <p className="text-sm text-gray-500">Provide detailed information about your project</p>
                  <p className="text-sm text-gray-400">{formData.summary.length} characters</p>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex gap-4 pt-6"
              >
                <button
                  type="submit"
                  disabled={updateMutation.isLoading}
                  className="flex-1 bg-[#1f4b3f] hover:bg-[#2d6b57] text-white py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  <FaSave />
                  {updateMutation.isLoading ? 'Updating Job...' : 'Update Job'}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate('/my-added-jobs')}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 border-2 border-gray-200 hover:border-gray-300"
                >
                  <FaArrowLeft />
                  Cancel
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Tips Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="container mx-auto max-w-4xl mt-12 relative z-10"
      >
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <div className="w-12 h-12 bg-[#1f4b3f] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Clear Description</h3>
            <p className="text-sm text-white/80">Be specific about requirements and expectations</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <div className="w-12 h-12 bg-[#5bbb7b] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Attractive Image</h3>
            <p className="text-sm text-white/80">Add a cover image to make your job stand out</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <div className="w-12 h-12 bg-[#1f4b3f] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Right Category</h3>
            <p className="text-sm text-white/80">Choose the correct category for better visibility</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateJob;
