// Login page with email/password and Google sign-in
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit for email/password login
  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(formData.email, formData.password)
      .then(() => {
        toast.success('Login successful!');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        if (error.code === 'auth/user-not-found') {
          toast.error('No account found with this email');
        } else if (error.code === 'auth/wrong-password') {
          toast.error('Incorrect password');
        } else {
          toast.error('Login failed. Please try again');
        }
      });
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success('Login successful!');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        toast.error('Google login failed');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="card bg-base-100 shadow-2xl border border-base-300 hover:shadow-primary/20 transition-shadow duration-300">
          <div className="card-body p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-base-content/60 mt-2">
                Login to access your account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className="input input-bordered input-primary w-full focus:input-primary"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered input-primary w-full focus:input-primary"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover link-primary">
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Login Button */}
              <div className="form-control mt-6">
                <button 
                  type="submit" 
                  className="btn btn-primary w-full text-white font-semibold"
                >
                  Login
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="divider my-6">OR</div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-primary w-full gap-2 hover:scale-105 transition-transform"
            >
              <FaGoogle className="text-xl" />
              Continue with Google
            </button>

            {/* Register Link */}
            <div className="text-center mt-6 pt-4 border-t border-base-300">
              <p className="text-base-content/70">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="link link-primary font-semibold hover:text-primary-focus"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-base-content/50">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
