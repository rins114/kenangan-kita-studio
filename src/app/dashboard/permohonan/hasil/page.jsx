"use client";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function HasilPage() {
  const navigate = useRouter();
  useEffect(() => {
    navigate.push("/dashboard/permohonan");
  });
  return (
    <div className="w-full p-5 flex justify-center items-center">
      <CircularProgress></CircularProgress>
    </div>
  );
}
