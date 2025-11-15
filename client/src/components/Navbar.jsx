import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Failed to logout');
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#1f4b3f] text-white sticky top-0 z-50 shadow-2xl border-b border-[#2d6b57]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section - Professional Design */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  <span className="text-[#1f4b3f] font-bold text-2xl">F</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-2xl font-bold tracking-tight">
                    Freelance<span className="text-[#5bbb7b]">Hub</span>
                  </span>
                  <div className="text-xs text-white/70 -mt-1">Professional Marketplace</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-2">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden ${
                    isActive 
                      ? 'bg-[#2d6b57] text-white shadow-lg' 
                      : 'text-white hover:bg-[#2d6b57] hover:shadow-lg hover:scale-105'
                  }`
                }
              >
                <span className="relative z-10">Home</span>
              </NavLink>
              
              <NavLink 
                to="/all-jobs" 
                className={({ isActive }) => 
                  `px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden ${
                    isActive 
                      ? 'bg-[#2d6b57] text-white shadow-lg' 
                      : 'text-white hover:bg-[#2d6b57] hover:shadow-lg hover:scale-105'
                  }`
                }
              >
                <span className="relative z-10">Browse Jobs</span>
              </NavLink>

              {user && (
                <div className="relative group">
                  <button className="px-5 py-3 rounded-xl text-sm font-semibold text-white hover:bg-[#2d6b57] hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <span>Pages</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Quick Actions</p>
                    </div>
                    <NavLink 
                      to="/add-job" 
                      className="block px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-600 transition-all duration-200 border-l-4 border-transparent hover:border-green-500"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Add New Job
                      </div>
                    </NavLink>
                    <NavLink 
                      to="/my-added-jobs" 
                      className="block px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-600 transition-all duration-200 border-l-4 border-transparent hover:border-green-500"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        My Posted Jobs
                      </div>
                    </NavLink>
                    <NavLink 
                      to="/my-accepted-tasks" 
                      className="block px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-600 transition-all duration-200 border-l-4 border-transparent hover:border-green-500"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        My Active Tasks
                      </div>
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-3 rounded-xl text-white hover:bg-[#2d6b57] hover:shadow-lg transition-all duration-300 hover:scale-110 relative group">
              <FiSearch className="w-5 h-5" />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Search
              </div>
            </button>

            {user ? (
              <>
                <Link 
                  to="/add-job" 
                  className="px-6 py-3 bg-gradient-to-r from-[#5bbb7b] to-[#4aa66a] hover:from-[#4aa66a] hover:to-[#3d9558] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Become a Seller
                </Link>
                
                <div className="relative group">
                  <button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-[#2d6b57] transition-all duration-300 hover:shadow-lg">
                    <img
                      className="w-10 h-10 rounded-full ring-2 ring-white object-cover shadow-lg"
                      src={user.photoURL || 'https://i.ibb.co/hR5FcR3/user.png'}
                      alt={user.displayName || 'User'}
                    />
                    <div className="hidden xl:block text-left">
                      <p className="text-sm font-semibold text-white">{user.displayName || 'User'}</p>
                      <p className="text-xs text-white/70">Online</p>
                    </div>
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                    <div className="px-6 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <img
                          className="w-12 h-12 rounded-full object-cover"
                          src={user.photoURL || 'https://i.ibb.co/hR5FcR3/user.png'}
                          alt={user.displayName || 'User'}
                        />
                        <div>
                          <p className="font-bold text-gray-800">{user.displayName || 'User'}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span className="text-xs text-gray-400">Online</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link 
                        to="/my-added-jobs" 
                        className="flex items-center gap-3 px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-600 transition-all duration-200"
                      >
                        <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">📋</span>
                        My Jobs Dashboard
                      </Link>
                      <Link 
                        to="/my-accepted-tasks" 
                        className="flex items-center gap-3 px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-600 transition-all duration-200"
                      >
                        <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">✅</span>
                        Active Tasks
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
                      >
                        <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">🚪</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-6 py-3 text-white hover:bg-[#2d6b57] text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-3 bg-white text-[#1f4b3f] hover:bg-gray-100 text-sm font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-3 rounded-xl text-white hover:bg-[#2d6b57] transition-all duration-300"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl rounded-b-2xl border-t border-gray-100 z-40">
            <div className="px-6 py-4 space-y-2">
              <NavLink 
                to="/" 
                onClick={toggleMenu}
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-green-50 text-green-600 border-l-4 border-green-500' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/all-jobs" 
                onClick={toggleMenu}
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-green-50 text-green-600 border-l-4 border-green-500' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                Browse Jobs
              </NavLink>
              
              {user && (
                <>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-4">Quick Actions</p>
                    <NavLink 
                      to="/add-job" 
                      onClick={toggleMenu}
                      className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Add New Job
                    </NavLink>
                    <NavLink 
                      to="/my-added-jobs" 
                      onClick={toggleMenu}
                      className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      My Posted Jobs
                    </NavLink>
                    <NavLink 
                      to="/my-accepted-tasks" 
                      onClick={toggleMenu}
                      className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      My Active Tasks
                    </NavLink>
                  </div>
                </>
              )}
              
              {user ? (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center gap-3 px-4 mb-4">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={user.photoURL || 'https://i.ibb.co/hR5FcR3/user.png'}
                      alt={user.displayName || 'User'}
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{user.displayName || 'User'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
                  <Link 
                    to="/login" 
                    onClick={toggleMenu}
                    className="block w-full px-4 py-3 text-center text-gray-700 hover:bg-gray-50 rounded-xl font-medium"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={toggleMenu}
                    className="block w-full px-4 py-3 text-center bg-[#5bbb7b] text-white hover:bg-[#4aa66a] rounded-xl font-semibold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
