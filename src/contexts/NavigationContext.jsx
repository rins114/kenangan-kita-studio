"use client";
import React, { createContext, useContext, useRef } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const layananRef = useRef(null);
  const kinerjaRef = useRef(null);

  const scrollToSection = (section) => {
    switch (section) {
      case "about":
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "layanan":
        layananRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "home":
        homeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "kinerja":
        kinerjaRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        console.warn(`Section "${section}" not found`);
    }
  };

  return (
    <NavigationContext.Provider
      value={{ homeRef, aboutRef, layananRef, kinerjaRef, scrollToSection }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
