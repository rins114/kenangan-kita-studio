"use client";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect } from "react";

export default function StaticHero({
  imagePath = "/assets/images/hero-1.jpg",
}) {
  useEffect(() => {
    gsap.from("#heroTitle", { opacity: 0, y: 100, duration: 1 });
    gsap.from("#heroSubTitle", { opacity: 0, y: -100, duration: 1 });
  }, []);
  return (
    <div className="relative w-full overflow-hidden h-[40rem] flex md:rounded-b-[2rem]">
      <Image
        alt="heroStatic"
        src={imagePath}
        width={3000}
        height={3000}
        className="object-cover w-full h-full object-center"
      ></Image>
      <div className="bg-custom-gradient from-mainColor/60 via-mainColor/40 to-secondaryColor/40 z-10 absolute top-0 left-0 w-full h-full flex flex-col text-white justify-center items-center px-7">
        <div className="flex flex-col font-bold max-w-4xl justify-center items-center border-b-2 py-3 overflow-hidden mt-16">
          <h1 id="heroTitle" className="text-center text-5xl md:text-7xl">
            PERATURAN HUKUM
          </h1>
        </div>
        <div className="flex flex-col font-bold max-w-2xl justify-center items-center py-3 overflow-hidden">
          <h1 id="heroSubTitle" className="text-center text-md md:text-3xl">
            PENGADAAN BARANG DAN JASA
          </h1>
        </div>
      </div>
    </div>
  );
}
