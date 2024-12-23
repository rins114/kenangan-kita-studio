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
    <div className="flex justify-center items-center h-screen bg-zinc-100">
      <div className="h-full pt-2 pl-2">
        <Button
          className="p-1 bg-transparent"
          isIconOnly
          onClick={() => navigate.push("/landing")}
        >
          <IoClose className="text-3xl text-gray-500"></IoClose>
        </Button>
      </div>
      <section className="flex flex-col justify-center items-center w-1/2 h-full">
        <AuthContainer>
          {/* <Logo size={150} bordered></Logo> */}
          <div className="w-1/3 justify-center items-center flex flex-col gap-1 mb-3">
            <h1 className="text-2xl">Daftar</h1>
            <hr className="border-2 w-1/2 border-mainColor" />
          </div>

          <SignUpForm />
        </AuthContainer>
      </section>
      <AuthImage></AuthImage>
    </div>
  );
}
