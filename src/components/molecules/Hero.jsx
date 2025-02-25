"use client";
import { useNavigation } from "@/contexts/NavigationContext";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { getPublishedSlider } from "@/services/Slider";
import APP_CONFIG from "@/globals/app-config";
import { CircularProgress } from "@nextui-org/react";
import { showToast } from "@/utils/ShowToast";
// const TOKEN = localStorage.getItem("access_token");

export default function Hero() {
  const { homeRef } = useNavigation();
  const swiperRef = useRef(null);
  const [slider, setSlider] = useState([]);
  const [token, setToken] = useState(null); // Gunakan state untuk menyimpan token

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedToken = localStorage.getItem("access_token");
        if (savedToken) {
          setToken(savedToken);
        }
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

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
    async function fetchSlider() {
      const result = await getPublishedSlider();
      console.log(result);
      if (result.status !== 200) {
        await showToast("error", "Kesalahan pada server: getPublishedSlider");
        return;
      }
      setSlider(result.data);
    }
    fetchSlider();
  }, [token]);

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
      className="flex h-[auto] overflow-hidden relative top-16 text-poppins w-full"
    >
      <Swiper
        ref={swiperRef}
        className="mySwiper w-full"
        autoplay={{
          delay: 5000, // 3 detik antar slide
          disableOnInteraction: false, // Tidak menghentikan autoplay saat interaksi
        }}
        loop={true}
        modules={[Autoplay]}
      >
        {slider.length === 0 ? (
          <SwiperSlide>
            <div className="flex justify-center items-center h-full">
              <CircularProgress></CircularProgress>
            </div>
          </SwiperSlide>
        ) : (
          slider?.map((item) => (
            <SwiperSlide key={item.id}>
              <Image
                alt="hero"
                src={APP_CONFIG.STORAGE_URL + item.img}
                layout="intrinsic"
                width={999990}
                height={600}
                className="w-auto h-auto max-w-full max-h-full object-contain"
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>

      {/* <div className="bg-custom-gradient from-mainColor/60 via-mainColor/40 to-secondaryColor/40 z-10 absolute top-0 left-0 w-full h-full flex flex-col text-white justify-center items-center px-7">
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
      </div> */}
    </div>
  );
}
