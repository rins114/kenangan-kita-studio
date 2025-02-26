import Image from "next/image";
import React from "react";

export default function GalleryCard({
  id = 1,
  title = "Sample Gallery",
  desc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiiseveniet aliquam quam non nemo. Nostrum, nulla tenetur laborum,distinctio expedita enim quia ullam maxime vitae cupiditate temporibus quos aspernatur ducimus.",
  date = "14 Februari 2025",
  imgPath = "/assets/images/hero-1.jpg",
  isModalOpen = false,
  handleOpenedGaleri = () => {},
}) {
  return (
    <div className="w-full pb-5 max-w-sm md:max-w-full shadow-lg bg-white flex flex-col overflow-hidden hover:scale-[1.01] transition-all duration-300 rounded-2xl">
      <Image
        alt=""
        src={imgPath}
        width={1000}
        height={1000}
        className="w-full cursor-pointer object-cover rounded-2xl"
        onClick={() => handleOpenedGaleri(id)}
      />
      <div className="px-5 pt-3">
        <h1
          className="font-medium line-clamp-2 text-sm lg:text-lg xl:text-xl hover:underline cursor-pointer"
          onClick={() => handleOpenedGaleri(id)}
        >
          {title}
        </h1>
        <p className="text-xs md:text-sm text-secondaryColor font-normal cursor-default">
          {date}
        </p>
      </div>
      <section className="cursor-default mt-2">
        <div className="px-5">
          <p className="line-clamp-3 text-justify text-sm">{desc}</p>
        </div>
      </section>
    </div>
  );
}
