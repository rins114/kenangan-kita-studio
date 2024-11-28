import Hero from "@/components/molecules/Hero";
import NavbarCustom from "@/components/molecules/NavbarCustom";
import React from "react";

export default function LandingPageLayout({ children }) {
  return (
    <div className="flex flex-col">
      <NavbarCustom></NavbarCustom>
      <Hero></Hero>
      {children}
    </div>
  );
}
