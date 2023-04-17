import React, { useState, useEffect } from 'react';
import { Authenticate, Logout } from './APIAuth';

const AuthContainer = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isAuthenticated) {
          const authToken = await Authenticate();
          if (authToken === 200) {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  useEffect(() => {
    const closeSession = async () => {
      if (isAuthenticated) {
        await Logout();
        setIsAuthenticated(false);
      }
    };

    return () => {
      closeSession();
    };
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default AuthContainer;