// Footer component with copyright and social links
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-4 py-10">
        <div className="footer grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <aside>
            <Link to="/" className="text-2xl font-bold text-primary">
              <span className="text-success">Freelance</span>Hub
            </Link>
            <p className="mt-4">
              Your trusted marketplace for freelance opportunities.
              <br />
              Connecting talent with projects since 2025.
            </p>
          </aside>

          {/* Quick Links */}
          <nav>
            <h6 className="footer-title">Quick Links</h6>
            <Link to="/all-jobs" className="link link-hover">All Jobs</Link>
            <Link to="/add-job" className="link link-hover">Post a Job</Link>
            <Link to="/my-added-jobs" className="link link-hover">My Jobs</Link>
            <Link to="/my-accepted-tasks" className="link link-hover">My Tasks</Link>
          </nav>

          {/* Social Links */}
          <nav>
            <h6 className="footer-title">Follow Us</h6>
            <div className="flex gap-4 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-sm btn-ghost">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-sm btn-ghost">
                <FaXTwitter className="text-xl" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-sm btn-ghost">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-sm btn-ghost">
                <FaGithub className="text-xl" />
              </a>
            </div>
          </nav>
        </div>

        {/* Copyright */}
        <div className="border-t border-base-300 mt-8 pt-6 text-center">
          <p>&copy; {currentYear} FreelanceHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
