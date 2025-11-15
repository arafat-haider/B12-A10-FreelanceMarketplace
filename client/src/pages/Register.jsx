// Register page with email/password and Google sign-in
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaImage, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Register = () => {
  const { registerUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-[#1f4b3f] via-[#2d6b57] to-[#1f4b3f] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#5bbb7b] rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#4aa66a] rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full opacity-5 blur-2xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20"
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#5bbb7b] to-[#4aa66a] rounded-full flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <FaUser className="text-white text-2xl" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#1f4b3f] to-[#2d6b57] bg-clip-text text-transparent mb-2">
              Join FreelanceHub
            </h2>
            <p className="text-gray-600 text-lg">
              Start your freelancing journey today
            </p>
          </motion.div>

          {/* Registration Form */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold flex items-center gap-2">
                  <FaUser className="text-[#5bbb7b]" />
                  Full Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full bg-white/70 border-gray-300 focus:border-[#5bbb7b] focus:ring-2 focus:ring-[#5bbb7b] focus:ring-opacity-30 transition-all duration-300 hover:bg-white"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold flex items-center gap-2">
                  <FaEnvelope className="text-[#5bbb7b]" />
                  Email Address
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                className="input input-bordered w-full bg-white/70 border-gray-300 focus:border-[#5bbb7b] focus:ring-2 focus:ring-[#5bbb7b] focus:ring-opacity-30 transition-all duration-300 hover:bg-white"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Photo URL Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold flex items-center gap-2">
                  <FaImage className="text-[#5bbb7b]" />
                  Profile Photo URL
                </span>
              </label>
              <input
                type="url"
                name="photoURL"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full bg-white/70 border-gray-300 focus:border-[#5bbb7b] focus:ring-2 focus:ring-[#5bbb7b] focus:ring-opacity-30 transition-all duration-300 hover:bg-white"
                value={formData.photoURL}
                onChange={handleChange}
              />
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 font-semibold flex items-center gap-2">
                  <FaLock className="text-[#5bbb7b]" />
                  Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  className="input input-bordered w-full bg-white/70 border-gray-300 focus:border-[#5bbb7b] focus:ring-2 focus:ring-[#5bbb7b] focus:ring-opacity-30 transition-all duration-300 hover:bg-white pr-12"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#5bbb7b] transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt text-gray-500 text-xs">
                  Must include uppercase, lowercase, and be at least 6 characters
                </span>
              </label>
            </div>

            {/* Register Button */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="form-control mt-8"
            >
              <button 
                type="submit" 
                className="btn bg-gradient-to-r from-[#5bbb7b] to-[#4aa66a] hover:from-[#4aa66a] hover:to-[#3d9558] text-white border-0 w-full font-semibold text-lg h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Create Account
              </button>
            </motion.div>
          </motion.form>

          {/* Divider */}
          <div className="divider my-8 text-gray-500 font-medium">OR</div>

          {/* Google Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full border-2 border-gray-300 hover:bg-gray-50 hover:border-[#5bbb7b] gap-3 h-14 rounded-xl text-base font-medium transition-all duration-300"
          >
            <FaGoogle className="text-xl text-red-500" />
            <span className="text-gray-700">Continue with Google</span>
          </motion.button>

          {/* Login Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-8 pt-6 border-t border-gray-200"
          >
            <p className="text-gray-600 text-base">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-[#5bbb7b] font-semibold hover:text-[#4aa66a] transition-colors duration-300 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Terms */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-white/80 leading-relaxed">
            By signing up, you agree to our{' '}
            <a href="#" className="underline hover:text-white transition-colors">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
