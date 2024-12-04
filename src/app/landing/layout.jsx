"use client";
import Hero from "@/components/molecules/Hero";
import InfoBar from "@/components/molecules/InfoBar";
import NavbarCustom from "@/components/molecules/NavbarCustom";
import { NavigationProvider } from "@/contexts/NavigationContext";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/components/organisms/Footer"), {
  ssr: false,
});
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function LandingPageLayout({ children }) {
  const pathname = usePathname();
  return (
    <NavigationProvider>
      <div className="w-full">
        <InfoBar></InfoBar>
        <NavbarCustom></NavbarCustom>
        {!pathname.startsWith("/landing/peraturan") && <Hero></Hero>}
        {children}
        <Footer></Footer>
      </div>
    </NavigationProvider>
  );
}
