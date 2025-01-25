import { session } from "@/services/Authentication";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchSession() {
      // setIsLoading(true);
      const token = localStorage.getItem("access_token");
      const authenticatedUser = await session(token);
      if (authenticatedUser.status === 500) {
        await showToast("error", "Kesalahan pada server");
        setIsLoading(false);
        return;
      }
      if (authenticatedUser.status === 401) {
        localStorage.removeItem("access_token");
        setIsLoading(false);
        return;
      }
      setUser(authenticatedUser?.data?.user);
      setIsLoading(false);
    }
    fetchSession();
  }, [pathname]);

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
