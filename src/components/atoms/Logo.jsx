import Image from "next/image";
import React from "react";

export default function Logo({
  path = "/assets/images/logo.png",
  widthSize = "50",
  heightSize = "50",
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
      } cursor-pointer ${
        hoverEffect && "hover:scale-105"
      } transition-all flex justify-start items-center`}
    >
      <Image
        src={path}
        alt={alt}
        className={`object-contain`}
        style={{ width: `${widthSize}px`, height: `${heightSize}px` }}
        width={500}
        height={500}
        priority
      ></Image>
    </div>
  );
}
