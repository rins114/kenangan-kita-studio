import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div className="h-[650px] overflow-hidden relative text-montserrat">
      <Image
        alt="hero"
        src="/assets/images/hero-2.jpg"
        width={4000}
        height={3000}
        className="w-full h-full object-cover"
      ></Image>
      <div className="bg-custom-gradient from-mainColor/60 via-mainColor/40 to-thirdColor/40 z-10 absolute top-0 left-0 w-full h-full flex flex-col text-white justify-center items-center">
        <div className="flex flex-col text-7xl font-bold max-w-4xl justify-center items-center border-b-2 py-3">
          <h1 className="text-center">SELAMAT DATANG DI SIMPRO PBJ</h1>
        </div>
        <div className="flex flex-col text-3xl font-bold max-w-2xl justify-center items-center py-3">
          <h1 className="text-center">
            SISTEM INFORMASI PROAKTIF PENGADAAN BARANG DAN JASA
          </h1>
        </div>
      </div>
    </div>
  );
}
