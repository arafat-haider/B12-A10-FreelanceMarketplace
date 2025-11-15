// All Jobs page - Display all jobs with sorting functionality
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaSort } from 'react-icons/fa';

const AllJobs = () => {
  const [sortOrder, setSortOrder] = useState('desc'); // desc = newest first

  // Fetch all jobs from database
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['allJobs', sortOrder],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5000/jobs?sort=${sortOrder}`);
      return response.data;
    }
  });

  // Toggle sort order
  const toggleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">All Jobs</h2>
          <button
            onClick={toggleSort}
            className="btn btn-outline btn-primary gap-2"
          >
            <FaSort />
            Sort by Date ({sortOrder === 'desc' ? 'Newest' : 'Oldest'})
          </button>
        </div>

        {/* Jobs Grid */}
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No jobs available at the moment</p>
            <Link to="/add-job" className="btn btn-primary mt-4">Post a Job</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="card bg-base-100 shadow-xl h-full">
                <figure className="h-48 bg-gradient-to-br from-[#1f4b3f] to-[#2d6b57] flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl font-bold mb-2">{job.category?.charAt(0) || 'J'}</div>
                    <div className="text-sm opacity-75">{job.category || 'Job'}</div>
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg">{job.title}</h3>
                  <div className="badge badge-primary">{job.category}</div>
                  <p className="text-sm text-gray-600 line-clamp-3 mt-2">{job.summary}</p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Posted by: <span className="font-semibold">{job.postedBy}</span></p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(job.postedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link to={`/job/${job._id}`} className="btn btn-primary btn-sm w-full">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
