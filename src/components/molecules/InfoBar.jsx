"use client";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TbBrandYoutubeFilled, TbPhoneCall } from "react-icons/tb";
import { FaRegClock, FaTwitterSquare, FaYoutubeSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import gsap from "gsap";
import { FaSquareXTwitter, FaSquareYoutube } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { IoCloudyNightOutline } from "react-icons/io5";

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

  function isBetweenTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const nowInMinutes = hours * 60 + minutes;
    const startTime = 3 * 60;
    const endTime = 18 * 60;

    return nowInMinutes > startTime && nowInMinutes < endTime;
  }

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
          {isBetweenTime() ? (
            <TiWeatherPartlySunny className="text-orange-300 text-lg mb-[0.2rem]" />
          ) : (
            <IoCloudyNightOutline className="text-blue-300 text-lg mb-[0.2rem]" />
          )}

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
          <TbPhoneCall className="text-white text-md" />
          <p className="text-white text-sm">+6281 2345 6789</p>
        </div>
        <div
          ref={contactRef}
          className="flex gap-2 justify-center items-center px-3 border-r-1 border-white"
        >
          <FaRegClock className="text-white text-md" />
          <time
            className="text-white text-sm"
            dateTime="2024-01-01"
            suppressHydrationWarning
          >
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </div>
        <div className="flex gap-3 justify-center items-center px-3">
          <Link href={"https://www.facebook.com/"} target="_blank">
            <FaFacebookSquare className="text-white text-md" />
          </Link>
          <Link href={"https://twitter.com/"} target="_blank">
            <FaSquareXTwitter className="text-white text-md" />
          </Link>
          <Link href={"https://www.youtube.com/"} target="_blank">
            <TbBrandYoutubeFilled className="text-white text-md" />
          </Link>
        </div>
      </div>
    </section>
  );
}
