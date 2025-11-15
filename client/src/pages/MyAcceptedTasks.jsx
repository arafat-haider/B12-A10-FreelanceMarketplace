// My Accepted Tasks page - Display jobs accepted by the user
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaCheck, FaTimes, FaBriefcase, FaUser, FaCalendar, FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { useState } from 'react';

const MyAcceptedTasks = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();


  // Fetch accepted tasks for current user
  const { data: acceptedTasks = [], isLoading } = useQuery({
    queryKey: ['acceptedTasks', user?.email],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/accepted-tasks/user/${user.email}`);
      return response.data;
    },
    enabled: !!user?.email
  });

  // Delete accepted task mutation
  const deleteMutation = useMutation({
    mutationFn: async (taskId) => {
      await axios.delete(`http://localhost:5000/accepted-tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['acceptedTasks']);
      toast.success('Task removed successfully!');
    },
    onError: () => {
      toast.error('Failed to remove task');
    }
  });

  // Handle Done or Cancel action
  const handleRemoveTask = (taskId, action) => {
    const message = action === 'done' 
      ? 'Mark this task as done and remove it?' 
      : 'Cancel this task and remove it?';
    
    if (window.confirm(message)) {
      deleteMutation.mutate(taskId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#1f4b3f] to-[#5bbb7b] bg-clip-text text-transparent mb-4">
            My Accepted Tasks
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track and manage your accepted projects. Mark them as done or cancel if needed.
          </p>
        </motion.div>

        {acceptedTasks.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-6">📋</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">No Accepted Tasks Yet</h3>
            <p className="text-gray-500 mb-8">You haven't accepted any tasks yet. Start browsing available opportunities!</p>
            <a 
              href="/all-jobs" 
              className="inline-flex items-center gap-2 bg-[#1f4b3f] hover:bg-[#2d6b57] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaBriefcase />
              Browse Available Jobs
            </a>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {acceptedTasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
              >
                {/* Task Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1f4b3f] to-[#5bbb7b] flex items-center justify-center flex-shrink-0">
                    {task.coverImage ? (
                      <img 
                        src={task.coverImage} 
                        alt={task.jobTitle}
                        className="w-full h-full object-cover rounded-xl"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full flex items-center justify-center text-white text-xl ${task.coverImage ? 'hidden' : 'flex'}`}
                    >
                      <FaBriefcase />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                      {task.jobTitle}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaUser className="text-[#5bbb7b]" />
                      <span>{task.postedBy}</span>
                    </div>
                  </div>
                </div>

                {/* Task Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <FaTag className="text-[#1f4b3f] w-4 h-4" />
                    <span className="bg-[#1f4b3f]/10 text-[#1f4b3f] px-3 py-1 rounded-full text-sm font-medium">
                      {task.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendar className="text-[#5bbb7b] w-4 h-4" />
                    <span>Accepted on {new Date(task.acceptedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleRemoveTask(task._id, 'done')}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    title="Mark as Done"
                  >
                    <FaCheck className="w-4 h-4" />
                    Done
                  </button>
                  <button
                    onClick={() => handleRemoveTask(task._id, 'cancel')}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    title="Cancel Task"
                  >
                    <FaTimes className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats Section */}
        {acceptedTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Task Summary</h3>
              <p className="text-gray-600">
                You have <span className="font-bold text-[#1f4b3f]">{acceptedTasks.length}</span> active task{acceptedTasks.length !== 1 ? 's' : ''} in progress
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyAcceptedTasks;
