import Hero from "@/components/molecules/Hero";
import InfoBar from "@/components/molecules/InfoBar";
import NavbarCustom from "@/components/molecules/NavbarCustom";
import { NavigationProvider } from "@/contexts/NavigationContext";
import React from "react";

export default function LandingPageLayout({ children }) {
  return (
    <NavigationProvider>
      <div className="w-full">
        <InfoBar></InfoBar>
        <NavbarCustom></NavbarCustom>
        <Hero></Hero>
        <div className="w-full">{children}</div>
      </div>
    </NavigationProvider>
  );
}
