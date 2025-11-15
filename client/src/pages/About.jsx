import { Link } from 'react-router-dom';
import { FaHandshake, FaUsers, FaShieldAlt, FaRocket } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-br from-[#1f4b3f] to-[#2d6b57] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About FreelanceHub</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Your trusted marketplace connecting businesses with talented freelancers worldwide
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To create a seamless platform where businesses can find skilled freelancers 
              and professionals can showcase their talents while building meaningful careers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1f4b3f] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trust & Quality</h3>
              <p className="text-gray-600">We ensure every project meets high standards</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#5bbb7b] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Community</h3>
              <p className="text-gray-600">Connect with professionals worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1f4b3f] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600">Protected payments and data security</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#5bbb7b] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick project completion and support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn bg-[#1f4b3f] text-white px-8 py-3 rounded-lg hover:bg-[#2d6b57] transition-colors">
              Join as Freelancer
            </Link>
            <Link to="/all-jobs" className="btn bg-[#5bbb7b] text-white px-8 py-3 rounded-lg hover:bg-[#4aa66a] transition-colors">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;