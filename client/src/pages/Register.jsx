// Register page with email/password and Google sign-in
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
  const { registerUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: ''
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Password validation
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpperCase) {
      return 'Password must include at least one uppercase letter';
    }
    if (!hasLowerCase) {
      return 'Password must include at least one lowercase letter';
    }
    if (!isLongEnough) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    // Register user
    registerUser(formData.email, formData.password)
      .then(() => {
        // Update profile with name and photo
        return updateUserProfile(formData.name, formData.photoURL);
      })
      .then(() => {
        toast.success('Registration successful!');
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
          toast.error('Email already in use');
        } else {
          toast.error('Registration failed. Please try again');
        }
      });
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success('Registration successful!');
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Google registration failed');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f4b3f] to-[#2d6b57] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#5bbb7b] to-[#4aa66a] rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">F</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Create Account
            </h2>
            <p className="text-gray-600 mt-2">
              Join our freelance community today
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="input input-bordered w-full bg-gray-50 border-gray-300 focus:border-[#5bbb7b] focus:ring-2 focus:ring-[#5bbb7b] focus:ring-opacity-50"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                className="input input-bordered w-full bg-gray-50 border-gray-300 focus:border-[#5bbb7b] focus:ring-2 focus:ring-[#5bbb7b] focus:ring-opacity-50"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Photo URL Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold">Profile Photo URL</span>
              </label>
              <input
                type="url"
                name="photoURL"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full bg-gray-50 border-gray-300 focus:border-[#5bbb7b] focus:ring-2 focus:ring-[#5bbb7b] focus:ring-opacity-50"
                value={formData.photoURL}
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                className="input input-bordered w-full bg-gray-50 border-gray-300 focus:border-[#5bbb7b] focus:ring-2 focus:ring-[#5bbb7b] focus:ring-opacity-50"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label className="label">
                <span className="label-text-alt text-gray-500 text-xs">
                  Must include uppercase, lowercase, and be at least 6 characters
                </span>
              </label>
            </div>

            {/* Register Button */}
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className="btn bg-gradient-to-r from-[#5bbb7b] to-[#4aa66a] hover:from-[#4aa66a] hover:to-[#3d9558] text-white border-0 w-full font-semibold text-base h-12"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="divider my-6 text-gray-500">OR</div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 gap-2 h-12"
          >
            <FaGoogle className="text-xl text-red-500" />
            <span className="text-gray-700 font-semibold">Continue with Google</span>
          </button>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-[#5bbb7b] font-semibold hover:text-[#4aa66a] transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <div className="text-center mt-6">
          <p className="text-sm text-white/80">
            By signing up, you agree to our{' '}
            <a href="#" className="underline hover:text-white">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-white">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
