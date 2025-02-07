"use client";
import Logo from "@/components/atoms/Logo";
import AuthContainer from "@/components/molecules/AuthContainer";
import AuthImage from "@/components/molecules/AuthImage";
import SignInForm from "@/components/molecules/SignInForm";
import { Button } from "@nextui-org/react";
import { IoClose } from "react-icons/io5";
import React from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const navigate = useRouter();
  return (
    <div className="flex justify-center gap-10 items-center h-screen bg-zinc-100 w-full">
      <div className="top-2 left-2 fixed">
        <Button
          className="p-1 bg-transparent"
          isIconOnly
          onClick={() => navigate.push("/landing")}
        >
          <IoClose className="text-3xl text-gray-500"></IoClose>
        </Button>
      </div>
      <section className="flex flex-col justify-center items-center w-full md:w-1/2 h-full px-2 sm:px-5">
        <AuthContainer classMinWidth="sm:min-w-30rem">
          {/* <Logo size={150} bordered></Logo> */}
          <div className="lg:w-1/2 justify-center items-center flex flex-col gap-1 mb-3">
            <h1 className="text-2xl">Masuk Akun</h1>
            <hr className="border-2 w-1/2 border-mainColor" />
          </div>

          <SignInForm />
        </AuthContainer>
      </section>
      <AuthImage></AuthImage>
    </div>
  );
}
