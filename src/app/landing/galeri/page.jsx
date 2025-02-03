"use client";
import Modal from "@/components/atoms/Modal";
import GalleryCard from "@/components/molecules/GalleryCard";
import GalleryCardContainter from "@/components/molecules/GalleryCardContainter";
import StaticHero from "@/components/molecules/StaticHero";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";

export default function GaleriPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            <GalleryCard
              key={index}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            ></GalleryCard>
          ))}
        </GalleryCardContainter>
      </div>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          <div
            className="bg-white md:min-h-[30rem] md:max-h-[65rem] w-full max-w-[70rem] rounded-2xl flex flex-col md:flex-row ove gap-7 overflow-hidden"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="relative md:w-1/2 rounded-none flex flex-col md:flex-row">
              <img
                src="/assets/images/auth-2.jpg"
                alt=""
                className="h-[95%] md:h-full md:w-[95%] object-cover"
              />
              <div className="absolute -bottom-4 right-5 md:-right-2 xl:-right-1 md:bottom-[35%] flex flex-row md:flex-col gap-3 z-[50]">
                <Button
                  className="md:w-16 md:h-16 w-9 h-9 hover:!opacity-100 hover:bg-gray-500 bg-mainColor rounded-full"
                  isIconOnly
                >
                  <BiLike className="md:text-2xl text-lg text-white" />
                </Button>
                <Button
                  className="md:w-16 md:h-16 w-9 h-9 hover:!opacity-100 hover:bg-gray-500 bg-mainColor rounded-full"
                  isIconOnly
                >
                  <FaRegShareFromSquare className="md:text-2xl text-lg text-white" />
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col pb-5 md:pb-7 md:py-7 justify-center items-start z-[40] overflow-hidden">
              <h1 className="md:w-full w-[96%] text-xl sm:text-2xl font-semibold px-5 py-3 bg-mainColor text-white mb-3 rounded-r-full md:rounded-r-none md:rounded-l-full pr-10 line-clamp-3">
                Sample Title
              </h1>
              <div className="px-5 md:px-0 md:pr-10 md:pl-6">
                <h1 className="text-secondaryColor font-medium">
                  14 Februari 2025
                </h1>
                <p className="sm:text-lg text-sm text-justify">
                  Pemerintah mengumumkan kebijakan baru untuk mengurangi emisi
                  karbon, fokus pada energi terbarukan seperti panel surya dan
                  turbin angin. Insentif diberikan kepada perusahaan ramah
                  lingkungan, sementara masyarakat didorong mengurangi plastik
                  sekali pakai. Langkah ini bertujuan menciptakan masa depan
                  yang lebih bersih dan berkelanjutan.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
