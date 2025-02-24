"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TbPhoneCall } from "react-icons/tb";
import { FaRegClock, FaTwitterSquare, FaYoutubeSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import gsap from "gsap";

export default function InfoBar() {
  const [time, updateTime] = useState(new Date());
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  // Refs for the elements to animate
  const infoBarRef = useRef(null);
  const weatherRef = useRef(null);
  const timeRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      updateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    gsap.from(infoBarRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(weatherRef.current, {
      opacity: 0,
      x: -50,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
    gsap.from(timeRef.current, {
      opacity: 0,
      x: 50,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
    gsap.from(contactRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.7,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      ref={infoBarRef}
      className="h-auto bg-secondaryColor hidden justify-between items-center py-1 px-0 md:flex xl:px-44 text-inter fixed z-[99] w-full"
    >
      <div className="flex">
        <div
          ref={weatherRef}
          className="flex gap-1 justify-center items-center text-white border-r-1 border-white px-3"
        >
          <TiWeatherPartlySunny className="text-blue-300 text-lg" />
          <p className="text-sm">
            {`${time.getDate()} ${months[time.getMonth()]}`}
          </p>
        </div>
        <div className="flex gap-5 justify-center items-center text-white px-3">
          <Link href="/faq" className="text-sm hover:text-mainColor">
            Sumbawa Besar
          </Link>
          {/* <Link href="/faq" className="text-sm hover:text-mainColor">
            FAQ's
          </Link> */}
          <Link href="/faq" className="text-sm hover:text-mainColor">
            Pemerintah
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div
          ref={timeRef}
          className="flex gap-2 justify-center items-center px-3 border-r-1 border-white"
        >
          <TbPhoneCall className="text-blue-300 text-md" />
          <p className="text-white text-sm">+6281 2345 6789</p>
        </div>
        <div
          ref={contactRef}
          className="flex gap-2 justify-center items-center px-3 border-r-1 border-white"
        >
          <FaRegClock className="text-blue-300 text-md" />
          <time
            className="text-white text-sm"
            dateTime="2024-01-01"
            suppressHydrationWarning
          >
            {time.toLocaleTimeString()}
          </time>
        </div>
        <div className="flex gap-3 justify-center items-center px-3">
          <Link href={"https://www.facebook.com/"} target="_blank">
            <FaFacebookSquare className="text-blue-400 text-md" />
          </Link>
          <Link href={"https://twitter.com/"} target="_blank">
            <FaTwitterSquare className="text-black text-md" />
          </Link>
          <Link href={"https://www.youtube.com/"} target="_blank">
            <FaYoutubeSquare className="text-red-700 text-md" />
          </Link>
        </div>
      </div>
    </section>
  );
}
