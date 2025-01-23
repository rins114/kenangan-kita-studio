import { useEffect } from "react";
import { useAuthUser } from "@/contexts/AuthUserContext";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const { user, isAuthenticated, isLoading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (user && !isLoading && !isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
};

export default useLogin;
