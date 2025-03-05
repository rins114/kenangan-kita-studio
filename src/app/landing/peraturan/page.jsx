"use client";
import SearchBar from "@/components/molecules/SearchBar";
import StaticHero from "@/components/molecules/StaticHero";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { HiDownload, HiEye } from "react-icons/hi";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PeraturanPage() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const pieChartData = {
    series: [20, 55, 25],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["KEPWAL", "PERWAL", "PERDA"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  const handlePreview = (url) => {
    setPdfUrl(url);
    setIsModalOpen(true);
  };

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop(); // Mengambil nama file dari URL
    link.click();
  };

  const closeModal = () => {
    setPdfUrl("");
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col justify-start items-center gap-5 text-poppins bg-grayBg">
      <StaticHero imagePath="/assets/images/staticHero.jpg"></StaticHero>
      <div className="w-full flex flex-col min-h-96 justify-start items-center relative bottom-16 gap-7 px-5">
        <SearchBar></SearchBar>
        <div className="w-full max-w-[90rem] flex flex-col md:flex-row gap-7">
          <section className="flex flex-col justify-start items-center md:w-2/3 border-2 min-h-80 rounded-2xl px-5 py-10 gap-7 shadow-md bg-white">
            <h1 className="text-2xl font-bold">PENCARIAN TERPOPULER</h1>
            <ul className="flex flex-col gap-5">
              {[...Array(5)].map((_, index) => (
                <li key={index}>
                  <div className="p-5 border-2 rounded-2xl flex flex-col gap-3 bg-grayBg shadow-md">
                    <div className="border-b-2 pb-2">
                      <p className="text-justify font-semibold">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Similique excepturi, accusamus ea quibusdam cupiditate
                        illo dicta.
                      </p>
                    </div>
                    <div className="flex flex-row gap-3">
                      <Button
                        className="bg-gray-500 text-white font-medium"
                        onClick={() => handlePreview(`/assets/pdf/dokumen${index + 1}.pdf`)}
                      >
                        <HiEye className="text-lg" />
                        Pratinjau
                      </Button>
                      <Button
                        className="bg-mainColor text-white font-medium"
                        onClick={() => handleDownload(`/assets/pdf/dokumen${index + 1}.pdf`)}
                      >
                        <HiDownload className="text-lg" />
                        Unduh
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col md:w-1/3">
            <div className="flex flex-col justify-start items-center w-full border-2 rounded-2xl px-5 py-10 shadow-md bg-white gap-7">
              <h1 className="text-2xl font-bold">PRODUK HUKUM</h1>
              <ReactApexChart
                options={pieChartData.options}
                series={pieChartData.series}
                type="donut"
              />
            </div>
          </section>
        </div>
      </div>

      {/* Modal untuk PDF Viewer */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
          onClick={closeModal}
        >
          
          <div
            className="bg-white p-5 rounded-lg w-3/5 h-[90vh] max-h-[90vh] relative flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <div className="flex flex-col h-full">
                <div className="border-b pb-2">
                  <Toolbar />
                </div>
                <div className="flex-grow overflow-auto">
                  <Viewer
                    fileUrl={pdfUrl}
                    defaultScale={SpecialZoomLevel.PageWidth}
                    plugins={[toolbarPluginInstance]}
                  />
                </div>
              </div>
            </Worker>
          </div>
        </div>
      )}
    </div>
  );
}
