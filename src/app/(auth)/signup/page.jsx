import Logo from "@/components/atoms/Logo";
import AuthContainer from "@/components/molecules/AuthContainer";
import SignUpForm from "@/components/molecules/SignUpForm";
import Image from "next/image";
import React from "react";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-100">
      <section className="flex flex-col justify-center items-center w-1/2 h-full">
        <AuthContainer>
          {/* <Logo size={150} bordered></Logo> */}
          <div className="w-1/3 justify-center items-center flex flex-col gap-1 mb-3">
            <h1 className="text-2xl">Sign Up</h1>
            <hr className="border-2 w-1/2 border-orange-500" />
          </div>

          <SignUpForm />
        </AuthContainer>
      </section>
      <section className="flex flex-col justify-center items-center h-full w-1/2 relative">
        <Image
          src="/assets/images/auth-2.jpg"
          alt="signin"
          width={4000}
          height={3000}
          className="w-full h-full object-cover"
        ></Image>
        <div className="h-full w-full flex flex-col bg-black/60 z-10 absolute top-0 left-0 justify-center items-center gap-3">
          <Logo size={200} path="/assets/images/logo-3.png"></Logo>
          <h1 className="text-2xl text-white max-w-sm text-center">
            Sistem Informasi Proaktif Pengadaan Barang dan Jasa
          </h1>
        </div>
      </section>
    </div>
  );
}
