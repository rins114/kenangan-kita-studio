import Image from "next/image";
import React from "react";

export default function LogoLink({
  src = "/assets/images/logosbw.png",
  size = 32,
  bordered = true,
  className,
  href = "https://www.google.co.id",
}) {
  return (
    <a
      href={href}
      className={`flex px-2 py-5 ${
        bordered ? "border-2" : ""
      } rounded-lg bg-transparent ${className}`}
      style={{ width: size, height: size }}
      target="_blank"
    >
      <Image
        src={src}
        width={500}
        height={500}
        alt="link"
        className="object-contain"
      ></Image>
    </a>
  );
}
