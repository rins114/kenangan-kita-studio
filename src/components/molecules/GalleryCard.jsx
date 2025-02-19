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
    <div className="w-full min-h-[20rem] shadow-lg bg-white overflow-hidden hover:scale-[1.01] transition-all duration-300 rounded-sm">
      <section className="overflow-hidden flex flex-col ">
        <Image
          alt=""
          src={imgPath}
          width={1000}
          height={1000}
          className="w-full h-1/2 cursor-pointer object-cover"
          onClick={() => handleOpenedGaleri(id)}
        />
        <div className="px-5 pt-3 pb-1">
          <h1
            className="font-medium line-clamp-2 text-md lg:text-xl hover:underline cursor-pointer"
            onClick={() => handleOpenedGaleri(id)}
          >
            {title}
          </h1>
          <p className="text-xs md:text-sm text-secondaryColor font-normal cursor-default">
            {date}
          </p>
        </div>
      </section>
      <section className="cursor-default">
        <div className="px-5 pb-5">
          <p className="line-clamp-3 text-justify text-sm">{desc}</p>
        </div>
      </section>
    </div>
  );
}
