// Authentication context to manage user state across the application
import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

// Create Auth Context
const AuthContext = createContext();

// Export AuthContext for debugging purposes
export { AuthContext };

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register new user with email and password
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user with email and password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const googleProvider = new GoogleAuthProvider();
  
  const googleLogin = async () => {
    setLoading(true);
    console.log('Initiating Google login...');
    
    try {
      // Configure Google provider for better UX
      googleProvider.setCustomParameters({
        prompt: 'select_account',
        hd: '' // Allow any domain
      });
      
      // Add required scopes
      googleProvider.addScope('email');
      googleProvider.addScope('profile');
      
      console.log('Firebase Auth instance:', auth);
      console.log('Google Provider configured:', googleProvider);
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google login successful:', result.user);
      console.log('User email:', result.user.email);
      console.log('User display name:', result.user.displayName);
      
      return result;
    } catch (error) {
      console.error('Google login error in AuthContext:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        customData: error.customData
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile (name, photo)
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    });
  };

  // Logout user
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Observer for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auth context value
  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    googleLogin,
    updateUserProfile,
    logoutUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};
