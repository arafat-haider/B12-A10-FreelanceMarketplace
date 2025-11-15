// My Accepted Tasks page - Display jobs accepted by the user
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaCheck, FaTimes } from 'react-icons/fa';

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
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8">My Accepted Tasks</h2>

        {acceptedTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 mb-4">You haven't accepted any tasks yet</p>
            <a href="/all-jobs" className="btn btn-primary">Browse Available Jobs</a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Job Title</th>
                  <th>Category</th>
                  <th>Posted By</th>
                  <th>Accepted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {acceptedTasks.map((task) => (
                  <tr key={task._id}>
                    <td>
                      <div className="avatar">
                        <div className="w-16 h-16 rounded bg-gradient-to-br from-[#1f4b3f] to-[#2d6b57] flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{task.category?.charAt(0) || 'T'}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">{task.jobTitle}</div>
                    </td>
                    <td>
                      <span className="badge badge-primary">{task.category}</span>
                    </td>
                    <td>{task.postedBy}</td>
                    <td>
                      {new Date(task.acceptedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRemoveTask(task._id, 'done')}
                          className="btn btn-sm btn-success gap-2"
                          title="Mark as Done"
                        >
                          <FaCheck />
                          Done
                        </button>
                        <button
                          onClick={() => handleRemoveTask(task._id, 'cancel')}
                          className="btn btn-sm btn-error gap-2"
                          title="Cancel Task"
                        >
                          <FaTimes />
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAcceptedTasks;
