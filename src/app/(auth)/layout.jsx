"use client";
import { useAuthUser } from "@/contexts/AuthUserContext";
import { showToast } from "@/utils/ShowToast";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function LayoutAuth({ children }) {
  const { isAuthenticated } = useAuthUser();
  const navigate = useRouter();
  useEffect(() => {
    async function onMount() {
      if (isAuthenticated) {
        await showToast("warning", "Sesi masih ada");
        navigate.push("/dashboard");
        return;
      }
    }
    onMount();
  });
  return <>{children}</>;
}
