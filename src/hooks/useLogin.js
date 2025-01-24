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
      return;
    }
    // if (!user && !isAuthenticated && !isLoading) {
    //   router.push("/signin");
    //   return;
    // }
  }, [user, isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
};

export default useLogin;
