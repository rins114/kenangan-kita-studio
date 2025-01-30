import GalleryCard from "@/components/molecules/GalleryCard";
import GalleryCardContainter from "@/components/molecules/GalleryCardContainter";
import StaticHero from "@/components/molecules/StaticHero";
import React from "react";

export default function GaleriPage() {
  return (
    <div className="min-h-[30rem] flex justify-start items-center flex-col bg-grayBg">
      <StaticHero
        imagePath="/assets/images/staticHero.jpg"
        title="GALERI KEGIATAN"
      ></StaticHero>
      <div className="p-5 max-w-[90rem] min-h-[30rem] w-full flex flex-col justify-center items-center">
        {/* <h1 className="text-2xl font-semibold">Dokumentasi Kegiatan PBJ</h1> */}
        <GalleryCardContainter>
          {[...Array(5)].map((_, index) => (
            <GalleryCard key={index}></GalleryCard>
          ))}
        </GalleryCardContainter>
      </div>
    </div>
  );
}
