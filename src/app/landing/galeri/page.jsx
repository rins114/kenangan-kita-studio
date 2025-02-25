"use client";
import Modal from "@/components/atoms/Modal";
import GalleryCard from "@/components/molecules/GalleryCard";
import GalleryCardContainter from "@/components/molecules/GalleryCardContainter";
import StaticHero from "@/components/molecules/StaticHero";
import { Button, Pagination } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import gsap from "gsap";
import { getPublishedGallery } from "@/services/Galeri";
import { showToast } from "@/utils/ShowToast";
import APP_CONFIG from "@/globals/app-config";
import { formatTanggal } from "@/utils/FormatDateHelper";
import paginate from "@/utils/PaginationHelper";
// const TOKEN = localStorage.getItem("access_token");

export default function GaleriPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [galeri, setGaleri] = useState([]);
  const [openedGaleri, setOpenedGaleri] = useState(null);

  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [entries, setEntries] = useState(12);

  useEffect(() => {
    async function fetchPublishedGallery() {
      const result = await getPublishedGallery();
      console.log(result);
      if (result.status !== 200) {
        await showToast("error", result.message);
        return;
      }
      setGaleri(result.data);
    }
    fetchPublishedGallery();
  }, []);

  function handleOpenedGaleri(id) {
    setOpenedGaleri(galeri.find((g) => g.id === id));
    setIsModalOpen(true);
  }

  useEffect(() => {
    console.log(galeri);
    const _paginateData = paginate(galeri, currentPage, entries);
    console.log(_paginateData);
    setTotalPages(_paginateData.totalPages);
    setTotalItems(_paginateData.totalItems);
    setPaginatedData(_paginateData.data);
  }, [galeri, currentPage]);

  useEffect(() => {
    if (isModalOpen) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isModalOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setIsModalOpen(false),
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setIsModalOpen(false),
    });
  };

  return (
    <div className="min-h-[30rem] flex justify-start items-center flex-col bg-grayBg">
      <StaticHero
        imagePath="/assets/images/banner.jpg"
        title="GALERI KEGIATAN"
      ></StaticHero>
      <div className="p-5 max-w-[90rem] min-h-[30rem] w-full flex flex-col justify-center items-center">
        {/* <h1 className="text-2xl font-semibold">Dokumentasi Kegiatan PBJ</h1> */}
        <GalleryCardContainter>
          {paginatedData.map((item, index) => (
            <GalleryCard
              id={item.id}
              title={item.title}
              desc={item.desc}
              date={formatTanggal(item.created_at)}
              imgPath={APP_CONFIG.STORAGE_URL + item.img}
              key={index}
              isModalOpen={isModalOpen}
              handleOpenedGaleri={handleOpenedGaleri}
            ></GalleryCard>
          ))}
        </GalleryCardContainter>
      </div>
      {totalItems > entries && (
        <div className="flex flex-col mb-5">
          <Pagination
            showControls
            isCompact
            color="default"
            className="pg"
            initialPage={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        </div>
      )}
      {isModalOpen && openedGaleri && (
        <Modal
          overlayRef={overlayRef}
          setIsModalOpen={setIsModalOpen}
          handleCloseModal={handleClose}
        >
          <div
            ref={modalRef}
            className="bg-white md:min-h-[30rem] md:max-h-[65rem] w-full max-w-[70rem] rounded-2xl flex flex-col md:flex-row ove gap-7 overflow-hidden"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="relative md:w-1/2 rounded-none flex flex-col md:flex-row">
              <img
                src={APP_CONFIG.STORAGE_URL + openedGaleri.img}
                alt=""
                className="h-[95%] md:h-full md:w-[95%] object-cover"
              />
              {/* <div className="absolute -bottom-4 right-5 md:-right-2 xl:-right-1 md:bottom-[35%] flex flex-row md:flex-col gap-3 z-[50]">
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
              </div> */}
            </div>
            <div className="md:w-1/2 flex flex-col pb-5 md:pb-7 md:py-7 justify-center items-start z-[40] overflow-hidden">
              <h1 className="md:w-full w-[96%] text-xl sm:text-2xl font-semibold px-5 py-3 bg-red-700 text-white mb-3 rounded-r-full md:rounded-r-none md:rounded-l-full pr-10 line-clamp-3">
                {openedGaleri.title}
              </h1>
              <div className="px-5 md:px-0 md:pr-10 md:pl-6">
                <h1 className="text-secondaryColor font-medium">
                  {formatTanggal(openedGaleri.created_at)}
                </h1>
                <p className="sm:text-lg text-sm text-justify">
                  {openedGaleri.desc}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
