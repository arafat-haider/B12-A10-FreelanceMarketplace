// Update Job page - Edit job details
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      await axios.put(`http://localhost:5000/jobs/${id}`, updatedData);
    },
    onSuccess: () => {
      toast.success('Job updated successfully!');
      navigate('/my-added-jobs');
    },
    onError: () => {
      toast.error('Failed to update job');
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
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-6">Update Job</h2>

            <form onSubmit={handleSubmit}>
              {/* Job Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Job Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Job title"
                  className="input input-bordered"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category Dropdown */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text font-semibold">Category</span>
                </label>
                <select
                  name="category"
                  className="select select-bordered"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Graphics Design">Graphics Design</option>
                  <option value="Content Writing">Content Writing</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Data Entry">Data Entry</option>
                </select>
              </div>

              {/* Summary/Description */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text font-semibold">Job Summary</span>
                </label>
                <textarea
                  name="summary"
                  placeholder="Job description"
                  className="textarea textarea-bordered h-32"
                  value={formData.summary}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* Cover Image URL */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text font-semibold">Cover Image URL</span>
                </label>
                <input
                  type="url"
                  name="coverImage"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered"
                  value={formData.coverImage}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Buttons */}
              <div className="form-control mt-6 flex flex-row gap-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={updateMutation.isLoading}
                >
                  {updateMutation.isLoading ? 'Updating...' : 'Update Job'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/my-added-jobs')}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateJob;
