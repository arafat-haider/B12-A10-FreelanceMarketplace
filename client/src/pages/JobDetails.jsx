// Job Details page - View single job and accept it
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaCalendar, FaUser, FaTag } from 'react-icons/fa';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch job details
  const { data: job, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/jobs/${id}`);
      return response.data;
    }
  });

  // Handle accepting the job
  const handleAcceptJob = async () => {
    // Check if user is trying to accept their own job
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Job not found</h2>
          <button onClick={() => navigate('/all-jobs')} className="btn btn-primary mt-4">
            Back to All Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="card bg-base-100 shadow-2xl">
          {/* Cover Image */}
          <figure className="h-72 bg-gradient-to-br from-[#1f4b3f] to-[#2d6b57] flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl font-bold mb-4">{job.category?.charAt(0) || 'J'}</div>
              <div className="text-xl opacity-75">{job.category || 'Job Category'}</div>
            </div>
          </figure>

          <div className="card-body">
            {/* Job Title */}
            <h1 className="text-4xl font-bold mb-4">{job.title}</h1>

            {/* Job Meta Information */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="badge badge-primary badge-lg gap-2">
                <FaTag />
                {job.category}
              </div>
              <div className="badge badge-outline badge-lg gap-2">
                <FaUser />
                Posted by: {job.postedBy}
              </div>
              <div className="badge badge-outline badge-lg gap-2">
                <FaCalendar />
                {new Date(job.postedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="divider"></div>

            {/* Job Description */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-3">Job Description</h3>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {job.summary}
              </p>
            </div>

            {/* Job Details */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-3">Contact Information</h3>
              <p className="text-gray-600">
                <span className="font-semibold">Email:</span> {job.userEmail}
              </p>
            </div>

            {/* Divider */}
            <div className="divider"></div>

            {/* Accept Button */}
            <div className="card-actions justify-end">
              {job.userEmail === user?.email ? (
                <button className="btn btn-disabled" disabled>
                  This is your own job
                </button>
              ) : (
                <button
                  onClick={handleAcceptJob}
                  className="btn btn-primary btn-lg"
                >
                  Accept This Job
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
