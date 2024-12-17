"use client";
import { useNavigation } from "@/contexts/NavigationContext";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function Hero() {
  const { homeRef } = useNavigation();
  const swiperRef = useRef(null);

  // Function to handle the fade-in animation
  const handleSlideChange = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const slides = swiperRef.current.swiper.slides;
      gsap.fromTo(
        slides[swiperRef.current.swiper.activeIndex],
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
      );
    }
  };

  useEffect(() => {
    gsap.from("#heroTitle", { opacity: 0, y: 100, duration: 1 });
    gsap.from("#heroSubTitle", { opacity: 0, y: -100, duration: 1 });

    // Add the slideChange event listener
    const swiperInstance = swiperRef.current.swiper;
    swiperInstance.on("slideChange", handleSlideChange);

    // Clean up the event listener on component unmount
    return () => {
      swiperInstance.off("slideChange", handleSlideChange);
    };
  }, []);

  return (
    <div
      ref={homeRef}
      className="flex h-screen overflow-hidden relative text-poppins z-10"
    >
      <Swiper
        ref={swiperRef}
        className="mySwiper"
        autoplay={{
          delay: 5000, // 3 detik antar slide
          disableOnInteraction: false, // Tidak menghentikan autoplay saat interaksi
        }}
        loop={true}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <Image
            alt="hero"
            src="/assets/images/hero-2.jpg"
            width={4000}
            height={3000}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="hero"
            src="/assets/images/hero-1.jpg"
            width={4000}
            height={3000}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        {/* Tambahkan slide lainnya jika perlu */}
      </Swiper>

      <div className="bg-custom-gradient from-mainColor/60 via-mainColor/40 to-secondaryColor/40 z-10 absolute top-0 left-0 w-full h-full flex flex-col text-white justify-center items-center px-7">
        <div className="flex flex-col font-bold max-w-4xl justify-center items-center border-b-2 py-3 overflow-hidden">
          <h1 id="heroTitle" className="text-center text-5xl md:text-7xl">
            SELAMAT DATANG DI SIMPRO PBJ
          </h1>
        </div>
        <div className="flex flex-col font-bold max-w-2xl justify-center items-center py-3 overflow-hidden">
          <h1 id="heroSubTitle" className="text-center text-md md:text-3xl">
            SISTEM INFORMASI PROAKTIF PENGADAAN BARANG DAN JASA
          </h1>
        </div>
      </div>
    </div>
  );
}
