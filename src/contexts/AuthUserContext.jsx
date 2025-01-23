import { session } from "@/services/Authentication";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      const token = localStorage.getItem("access_token");
      const authenticatedUser = await session(token);
      setUser(authenticatedUser?.data?.user);
      setIsLoading(false);
    }
    fetchSession();
  }, []);

  const authConfig = {
    user,
    isAuthenticated: !!user,
    isLoading,
  };

  return (
    <AuthUserContext.Provider value={authConfig}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUser = () => {
  return useContext(AuthUserContext);
};
