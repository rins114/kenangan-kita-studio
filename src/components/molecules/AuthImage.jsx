import Image from "next/image";
import React from "react";
import Logo from "../atoms/LogoAuth";

export default function AuthImage() {
  return (
    <section className="md:flex flex-col justify-center items-center h-full w-1/2 relative hidden">
      <Image
        src="/assets/images/authimg.jpg"
        alt="signin"
        width={6000}
        height={5000}
        className="w-full h-full object-cover"
      ></Image>
      <div className="h-full w-full flex flex-col bg-black/50 z-10 absolute py-20 top-0 left-0 justify-center items-center gap-3">
        <h1 className="text-4xl xl:text-6xl font-extrabold text-white max-w-xl text-center leading-snug font-manrope [text-shadow:_0_6px_6px_rgb(0_0_0_/_0.8)]">
          SIMPRO PBJ
        </h1>
        <h1 className="px-3 xl:px-0 text-lg xl:text-2xl font-semibold text-white max-w-xl text-center leading-snug font-manrope [text-shadow:_0_3px_3px_rgb(0_0_0_/_0.8)]">
          SISTEM INFORMASI PROAKTIF PENGADAAN BARANG DAN JASA
        </h1>
        <Logo
          classNameImage="object-contain"
          size={300}
          path="/assets/images/logosbw.png"
        ></Logo>
      </div>
    </section>
  );
}
