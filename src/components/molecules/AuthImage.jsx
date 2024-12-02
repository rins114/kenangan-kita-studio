import React from "react";
import Logo from "../atoms/Logo";
import Image from "next/image";

export default function AuthImage() {
  return (
    <section className="flex flex-col justify-center items-center h-full w-1/2 relative text-montserrat">
      <Image
        src="/assets/images/auth-2.jpg"
        alt="signin"
        width={4000}
        height={3000}
        className="w-full h-full object-cover"
      ></Image>
      <div className="h-full w-full flex flex-col bg-diagonal-gradient from-secondaryColor/70 to-mainColor/70 z-10 absolute top-0 left-0 justify-center items-center gap-1">
        <Logo
          size={200}
          path="/assets/images/logosbw.png"
          rounded={false}
          className="mb-3"
        ></Logo>
        <h1 className="text-4xl font-bold text-white max-w-sm text-center">
          SIMPRO PBJ
        </h1>
        <h1 className="text-2xl text-white max-w-sm text-center">
          Sistem Informasi Proaktif Pengadaan Barang dan Jasa
        </h1>
      </div>
    </section>
  );
}
