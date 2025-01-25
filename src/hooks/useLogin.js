import { useEffect } from "react";
import { useAuthUser } from "@/contexts/AuthUserContext";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/ShowToast";

const useLogin = () => {
  const { user, isAuthenticated, isLoading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    async function init() {
      console.log(user);
      if (isLoading) return;
      console.log(isAuthenticated);
      console.log(isLoading);
      if (!isLoading && !isAuthenticated) {
        await showToast("error", "Sesi Habis");
        router.push("/signin");
        return;
      }
    }
    init();
    // if (!user && !isAuthenticated && !isLoading) {
    //   router.push("/signin");
    //   return;
    // }
  }, [user, isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
};

export default useLogin;
