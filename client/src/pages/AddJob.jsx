// Add Job page - Create a new job posting
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    summary: '',
    coverImage: ''
  });

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

    const jobData = {
      title: formData.title,
      postedBy: user.displayName || 'Anonymous',
      category: formData.category,
      summary: formData.summary,
      coverImage: formData.coverImage,
      userEmail: user.email,
      postedDate: new Date().toISOString()
    };

    try {
      await axios.post('http://localhost:5000/jobs', jobData);
      toast.success('Job posted successfully!');
      navigate('/my-added-jobs');
    } catch (error) {
      console.error(error);
      toast.error('Failed to post job. Please try again');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-6">Post a New Job</h2>

            <form onSubmit={handleSubmit}>
              {/* Job Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Job Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Full Stack Developer Needed"
                  className="input input-bordered"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Posted By (Auto-filled) */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text font-semibold">Posted By</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={user?.displayName || 'Anonymous'}
                  disabled
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
                  placeholder="Describe the job requirements, skills needed, and project details..."
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

              {/* User Email (Auto-filled) */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text font-semibold">Your Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  value={user?.email || ''}
                  disabled
                />
              </div>

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
