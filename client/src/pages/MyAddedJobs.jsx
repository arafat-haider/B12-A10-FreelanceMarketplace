// My Added Jobs page - Display jobs posted by the logged-in user
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MyAddedJobs = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch jobs posted by current user
  const { data: myJobs = [], isLoading } = useQuery({
    queryKey: ['myJobs', user?.email],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/jobs/user/${user.email}`);
      return response.data;
    },
    enabled: !!user?.email
  });

  // Delete job mutation
  const deleteMutation = useMutation({
    mutationFn: async (jobId) => {
      await axios.delete(`http://localhost:5000/jobs/${jobId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myJobs']);
      toast.success('Job deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete job');
    }
  });

  // Handle delete job
  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteMutation.mutate(jobId);
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
        <h2 className="text-4xl font-bold mb-8">My Added Jobs</h2>

        {myJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 mb-4">You haven't posted any jobs yet</p>
            <Link to="/add-job" className="btn btn-primary">Post Your First Job</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Posted Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myJobs.map((job) => (
                  <tr key={job._id}>
                    <td>
                      <div className="avatar">
                        <div className="w-16 h-16 rounded bg-gradient-to-br from-[#1f4b3f] to-[#2d6b57] flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{job.category?.charAt(0) || 'J'}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">{job.title}</div>
                      <div className="text-sm opacity-50 line-clamp-1">{job.summary}</div>
                    </td>
                    <td>
                      <span className="badge badge-primary">{job.category}</span>
                    </td>
                    <td>
                      {new Date(job.postedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/update-job/${job._id}`}
                          className="btn btn-sm btn-info gap-2"
                        >
                          <FaEdit />
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="btn btn-sm btn-error gap-2"
                        >
                          <FaTrash />
                          Delete
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

export default MyAddedJobs;
