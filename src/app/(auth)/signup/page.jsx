"use client";
import Logo from "@/components/atoms/Logo";
import AuthContainer from "@/components/molecules/AuthContainer";
import AuthImage from "@/components/molecules/AuthImage";
import SignUpForm from "@/components/molecules/SignUpForm";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { IoClose } from "react-icons/io5";

export default function SignUpPage() {
  const navigate = useRouter();
  return (
    <div className="relative flex justify-center items-center h-screen bg-zinc-100 w-full">
      <div className="absolute h-full w-full">
        <Image
          src="/assets/images/authimg.jpg"
          width={1000}
          height={1000}
          className="w-full h-full"
          alt="auth img"
        ></Image>
      </div>
      <div className="absolute h-full w-full bg-black opacity-50"></div>
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
        <AuthContainer maxWidth="max-w-4xl">
          {/* <Logo size={150} bordered></Logo> */}
          <div className="w-1/3 justify-center items-center flex flex-col gap-1 mb-3">
            <h1 className="text-2xl">Sign Up</h1>
            <hr className="border-2 w-1/2 border-mainColor" />
          </div>

          <SignUpForm />
        </AuthContainer>
      </section>
      {/* <AuthImage></AuthImage> */}
    </div>
  );
}
