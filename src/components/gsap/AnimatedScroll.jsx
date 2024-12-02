/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);
const AnimatedScroll = ({
  children,
  className,
  ease = "power1.inOut",
  yFrom = 0,
  yTo = 0,
  xFrom = 0,
  xTo = 0,
  opacityFrom = 1,
  opacityTo = 1,
  delay = 0,
  duration = 0.5,
  toggleActions = "play none none reverse",
}) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const animation = gsap.fromTo(
      containerRef.current,
      {
        x: xFrom,
        y: yFrom,
        opacity: opacityFrom,
        ease: ease,
        duration: duration,
      },
      {
        x: xTo,
        y: yTo,
        opacity: opacityTo,
        duration: duration,
        ease: ease,
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          toggleActions: toggleActions,
          // markers: {
          //   startColor: "purple",
          //   endColor: "red",
          //   fontSize: "2rem",
          // },
        },
      }
    );

    return () => {
      animation?.scrollTrigger?.kill();
    };
  }, []);
  return (
    <div ref={containerRef} className={`${className}`}>
      {children}
    </div>
  );
};

export default AnimatedScroll;
