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
            <Link to="/about" className="link link-hover">About Us</Link>
            <Link to="/contact" className="link link-hover">Contact</Link>
            <Link to="/all-jobs" className="link link-hover">All Jobs</Link>
            <Link to="/add-job" className="link link-hover">Post a Job</Link>
          </nav>

          {/* Support */}
          <nav>
            <h6 className="footer-title">Support</h6>
            <Link to="/my-added-jobs" className="link link-hover">My Jobs</Link>
            <Link to="/my-accepted-tasks" className="link link-hover">My Tasks</Link>
            <span className="text-gray-500">Help Center</span>
            <span className="text-gray-500">Privacy Policy</span>
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
