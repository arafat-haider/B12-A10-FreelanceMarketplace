import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success('Logged out successfully!')
      })
      .catch(error => {
        toast.error(error.message)
      })
  }

  const navLinks = (
    <>
      <NavLink
        to='/'
        className={({ isActive }) =>
          `px-4 py-2 rounded-md text-sm font-medium ${
            isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-200'
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to='/all-jobs'
        className={({ isActive }) =>
          `px-4 py-2 rounded-md text-sm font-medium ${
            isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-200'
          }`
        }
      >
        All Jobs
      </NavLink>
      {user && (
        <>
          <NavLink
            to='/my-added-jobs'
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            My Jobs
          </NavLink>
          <NavLink
            to='/my-accepted-tasks'
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            My Tasks
          </NavLink>
        </>
      )}
    </>
  )

  return (
    <nav className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link to='/' className='flex-shrink-0'>
              <span className='text-2xl font-bold text-gray-800'>
                FreelanceHub
              </span>
            </Link>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                {navLinks}
              </div>
            </div>
          </div>
          <div className='hidden md:block'>
            <div className='ml-4 flex items-center md:ml-6'>
              {user ? (
                <div className='ml-3 relative'>
                  <div className='flex items-center'>
                    <Link
                      to='/add-job'
                      className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 mr-4'
                    >
                      Post a Job
                    </Link>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                    >
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src={user.photoURL || 'https://i.ibb.co/kxv0VS2/user.png'}
                        alt=''
                      />
                    </button>
                  </div>
                  {isOpen && (
                    <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5'>
                      <div className='px-4 py-2 text-sm text-gray-700'>
                        {user.displayName}
                      </div>
                      <button
                        onClick={handleLogout}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className='flex items-center'>
                  <Link
                    to='/login'
                    className='text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium'
                  >
                    Login
                  </Link>
                  <Link
                    to='/register'
                    className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ml-4'
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className='-mr-2 flex md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
            >
              <span className='sr-only'>Open main menu</span>
              {isOpen ? (
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>{navLinks}</div>
          <div className='pt-4 pb-3 border-t border-gray-700'>
            {user ? (
              <div className='flex items-center px-5'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-10 w-10 rounded-full'
                    src={user.photoURL || 'https://i.ibb.co/kxv0VS2/user.png'}
                    alt=''
                  />
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium leading-none text-white'>
                    {user.displayName}
                  </div>
                  <div className='text-sm font-medium leading-none text-gray-400'>
                    {user.email}
                  </div>
                </div>
              </div>
            ) : (
              <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                <Link
                  to='/login'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200'
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200'
                >
                  Register
                </Link>
              </div>
            )}
            {user && (
              <div className='mt-3 px-2 space-y-1'>
                <Link
                  to='/add-job'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200'
                >
                  Post a Job
                </Link>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200'
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar