"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    redirect("/landing");
  });
  return (
    <div className="flex justify-center items-center w-full h-96">
      <h1>Redirecting...</h1>
      <p>
        You will be redirected to the landing page shortly, of click{" "}
        <a href="/landing" className="text-blue-500 hover:underline">
          here
        </a>
      </p>
    </div>
  );
}
