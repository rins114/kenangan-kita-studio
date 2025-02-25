"use client";
import SearchBar from "@/components/molecules/SearchBar";
import StaticHero from "@/components/molecules/StaticHero";
import { Button, Pagination } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { HiDownload, HiEye } from "react-icons/hi";
import { getPeraturan } from "@/services/Peraturan";
import APP_CONFIG from "@/globals/app-config";
import paginate from "@/utils/PaginationHelper";
import { showToast } from "@/components/atoms/SweetAlert";

// const TOKEN = localStorage.getItem("access_token");

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PeraturanPage() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  const [peraturan, setPeraturan] = useState([]);

  const [searchParams, setSearchParams] = useState({
    title: "",
    bentuk: "",
    nomor: "",
    tahun: "",
  });

  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [entries, setEntries] = useState(10);

  const [token, setToken] = useState(null); // Gunakan state untuk menyimpan token

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedToken = localStorage.getItem("access_token");
        if (savedToken) {
          setToken(savedToken);
        }
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

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

  useEffect(() => {
    async function fetchPeraturan() {
      const result = await getPeraturan(searchParams);
      console.log(result);
      if (result.status !== 200) {
        await showToast("error", "Kesalahan pada server: getPeraturan");
        return;
      }
      setPeraturan(result.data);
    }
    fetchPeraturan();
  }, [searchParams.title]);

  useEffect(() => {
    console.log(peraturan);
    const _paginateData = paginate(peraturan, currentPage, entries);
    console.log(_paginateData);
    setTotalPages(_paginateData.totalPages);
    setTotalItems(_paginateData.totalItems);
    setPaginatedData(_paginateData.data);
  }, [peraturan, currentPage]);

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
    link.setAttribute("download", url.split("/").pop());
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    setPdfUrl("");
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col justify-start items-center gap-5 text-poppins bg-grayBg">
      <StaticHero imagePath="/assets/images/banner.jpg"></StaticHero>
      <div className="w-full flex flex-col min-h-96 justify-start items-center relative bottom-16 gap-7 px-5">
        <SearchBar
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        ></SearchBar>
        <div className="w-full max-w-[90rem] flex flex-col md:flex-row gap-7">
          <section className="flex flex-col justify-start items-center md:w-2/3 border-2 min-h-80 rounded-2xl px-5 py-10 gap-7 shadow-md bg-white">
            <h1 className="text-2xl font-bold">DAFTAR PERATURAN</h1>
            <ul className="flex flex-col gap-5 w-full">
              {paginatedData.map((item, index) => (
                <li key={index} className="w-full">
                  <div className="p-5 border-2 rounded-2xl flex flex-col gap-3 bg-grayBg shadow-md w-full">
                    <div className="border-b-2 pb-2">
                      <p className="text-justify font-semibold">{item.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {item.bentuk_peraturan} NOMOR {item.no_peraturan} TAHUN{" "}
                      {item.tahun_peraturan}
                    </p>
                    <div className="flex flex-row gap-3">
                      <Button
                        className="bg-gray-500 text-white font-medium"
                        onPress={() =>
                          handlePreview(APP_CONFIG.STORAGE_URL + item.file)
                        }
                      >
                        <HiEye className="text-lg" />
                        Pratinjau
                      </Button>
                      <Button
                        className="bg-secondaryColor text-white font-medium"
                        onPress={() =>
                          handleDownload(APP_CONFIG.STORAGE_URL + item.file)
                        }
                      >
                        <HiDownload className="text-lg" />
                        Unduh
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {totalItems > entries && (
              <div className="flex flex-col">
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
