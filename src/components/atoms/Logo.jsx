import Image from "next/image";
import React from "react";

export default function Logo({
  path = "/assets/images/logo.png",
  size = "50",
  alt = "logo",
  bordered = false,
  hoverEffect = false,
  rounded = true,
  className = "",
}) {
  return (
    <div
      className={`${className} overflow-hidden ${rounded && "rounded-full"} ${
        bordered && "border-2"
      } cursor-pointer ${hoverEffect && "hover:scale-105"} transition-all`}
    >
      <Image
        src={path}
        alt={alt}
        className={`object-contain`}
        style={{ width: `${size}px`, height: `${size}px` }}
        width={500}
        height={500}
      ></Image>
    </div>
  );
}
