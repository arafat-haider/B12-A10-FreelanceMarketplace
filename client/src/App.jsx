// Main App component with routing configuration
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AddJob from './pages/AddJob';
import AllJobs from './pages/AllJobs';
import JobDetails from './pages/JobDetails';
import MyAddedJobs from './pages/MyAddedJobs';
import UpdateJob from './pages/UpdateJob';
import MyAcceptedTasks from './pages/MyAcceptedTasks';
import NotFound from './pages/NotFound';

// Create a query client for TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/all-jobs" element={<AllJobs />} />

                {/* Private Routes */}
                <Route
                  path="/add-job"
                  element={
                    <PrivateRoute>
                      <AddJob />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/job/:id"
                  element={
                    <PrivateRoute>
                      <JobDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/my-added-jobs"
                  element={
                    <PrivateRoute>
                      <MyAddedJobs />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/update-job/:id"
                  element={
                    <PrivateRoute>
                      <UpdateJob />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/my-accepted-tasks"
                  element={
                    <PrivateRoute>
                      <MyAcceptedTasks />
                    </PrivateRoute>
                  }
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 3000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
