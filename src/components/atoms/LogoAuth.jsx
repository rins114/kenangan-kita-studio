import Image from "next/image";
import React from "react";

export default function LogoAuth({
  path = "/assets/images/logo.png",
  size = "50",
  alt = "logo",
  bordered = false,
  hoverEffect = false,
  classNameContainer = "",
  classNameImage = "",
}) {
  return (
    <div
      className={`${classNameContainer} overflow-hidden ${
        bordered && "border"
      } cursor-pointer ${hoverEffect && "hover:scale-105"} transition-all`}
    >
      <Image
        src={path}
        alt={alt}
        className={`${classNameImage}`}
        style={{ width: `${size}px`, height: `${size}px` }}
        width={500}
        height={500}
      ></Image>
    </div>
  );
}
