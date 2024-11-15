"use client";
import React from "react";
import NavBar from "../molecules/NavBar";
import { usePathname } from "next/navigation";

const disableNavbar = ["/signin", "/signup", "/sandbox"];

export default function Header() {
  const pathname = usePathname();
  return (
    <div>
      {disableNavbar.includes(pathname) ||
      pathname.startsWith("/beranda") ? null : (
        <NavBar></NavBar>
      )}
    </div>
  );
}
