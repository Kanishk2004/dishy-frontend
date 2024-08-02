'use client'

import { createContext, useState, useContext, useEffect } from 'react';
// import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get('accessToken');
//     setIsAuthenticated(!!token);
//   }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);