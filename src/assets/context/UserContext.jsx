/* eslint-disable react-refresh/only-export-components */
// UserContext.jsx
import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const auth = getAuth();

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setCurrentUser(user);
      // You can also do additional operations like updating user profile here.
    } catch (error) {
      // Handle registration errors
      console.error("Error registering user:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setCurrentUser(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const value = {
    currentUser,
    register,
    error,
    login,
    logOut,
    // Add other authentication-related functions here (e.g., login, logout).
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
