"use client";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useNavigation } from "@/contexts/NavigationContext";
import Card from "@/components/molecules/Card";
import { HiDocumentCheck } from "react-icons/hi2";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
const AnimatedScroll = dynamic(
  () => import("@/components/gsap/AnimatedScroll"),
  { ssr: false }
);

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function LandingPage() {
  const columnChart = {
    series: [
      {
        name: "Permohonan",
        data: [44, 55, 57],
      },
      {
        name: "Selesai",
        data: [34, 35, 47],
      },
      {
        name: "Ditolak",
        data: [10, 20, 10],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          // "May",
          // "Jun",
          // "Jul",
          // "Aug",
          // "Sep",
          // "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "Jumlah Permohonan",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " dokumen";
          },
        },
      },
    },
  };

  const mixedChart = {
    series: [
      {
        name: "Income",
        type: "column",
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: "Cashflow",
        type: "column",
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
      },
      {
        name: "Revenue",
        type: "line",
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 5],
      },
      // title: {
      //   text: "Sample Title",
      //   align: "left",
      //   offsetX: 110,
      // },
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      },
      yaxis: [
        {
          seriesName: "Income",
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#008FFB",
          },
          labels: {
            style: {
              colors: "#008FFB",
            },
          },
          title: {
            text: "Income (thousand crores)",
            style: {
              color: "#008FFB",
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: "Cashflow",
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#00E396",
          },
          labels: {
            style: {
              colors: "#00E396",
            },
          },
          title: {
            text: "Operating Cashflow (thousand crores)",
            style: {
              color: "#00E396",
            },
          },
        },
        {
          seriesName: "Revenue",
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#FEB019",
          },
          labels: {
            style: {
              colors: "#FEB019",
            },
          },
          title: {
            text: "Revenue (thousand crores)",
            style: {
              color: "#FEB019",
            },
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topleft",
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };
  const { aboutRef, contactRef } = useNavigation();
  return (
    //bg-custom-gradient from-mainColor/60 to-thirdColor/40
    <div className=" flex flex-col justify-start items-center text-montserrat">
      <AnimatedScroll yFrom={150} opacityFrom={0} duration={1}>
        <section
          ref={aboutRef}
          className="flex flex-col justify-center items-center gap-10 py-24 px-5 w-full max-w-7xl scroll-mt-96"
        >
          <h1 className="text-3xl font-semibold">Apa itu SIMPRO PBJ?</h1>
          <div className="flex gap-10">
            <AnimatedScroll
              className="w-1/2"
              xFrom={-200}
              opacityFrom={0}
              duration={1}
            >
              <div>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat esse deserunt nisi quas possimus perferendis
                  explicabo laboriosam deleniti, error nihil! Repudiandae
                  officia repellat obcaecati nihil eos eveniet tempora, non
                  consequuntur? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Repellat esse deserunt nisi quas possimus
                  perferendis explicabo laboriosam deleniti, error nihil!
                  Repudiandae officia repellat obcaecati nihil eos eveniet
                  tempora, non consequuntur? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Repellat esse deserunt nisi quas
                  possimus perferendis explicabo laboriosam deleniti, error
                  nihil! Repudiandae officia repellat obcaecati nihil eos
                  eveniet tempora, non consequuntur?
                </p>
              </div>
            </AnimatedScroll>
            <AnimatedScroll
              className="w-1/2"
              xFrom={200}
              opacityFrom={0}
              duration={1}
            >
              <div className="min-w-xl min-h-xl">
                <Image
                  alt="img"
                  src={"/assets/images/auth-2.jpg"}
                  width={2000}
                  height={2000}
                ></Image>
              </div>
            </AnimatedScroll>
          </div>
        </section>
      </AnimatedScroll>
      <div className="relative w-full flex flex-col justify-start items-center">
        <svg
          width="100%"
          height="50%"
          id="svg"
          viewBox="0 0 1440 650"
          xmlns="http://www.w3.org/2000/svg"
          className="transition duration-300 ease-in-out delay-150"
        >
          <path
            d="M 0,700 L 0,262 C 174,226.66666666666669 348,191.33333333333334 507,199 C 666,206.66666666666666 810,257.3333333333333 963,275 C 1116,292.6666666666667 1278,277.33333333333337 1440,262 L 1440,700 L 0,700 Z"
            stroke="none"
            strokeWidth="0"
            fill="#0098da"
            fillOpacity="1"
            className="transition-all duration-300 ease-in-out delay-150 path-0"
            transform="rotate(-180 720 350)"
          ></path>
        </svg>
        <section className="absolute w-full justify-center items-center flex pt-10">
          <div className="flex flex-col gap-10 justify-center items-center max-w-7xl w-full">
            <AnimatedScroll yFrom={70} duration={0.5} opacityFrom={0}>
              <h1 className="text-3xl text-white font-semibold">
                Apa Saja Layanan SIMPRO PBJ?
              </h1>
            </AnimatedScroll>
            <div className="flex gap-7 w-full justify-center items-center">
              <AnimatedScroll
                className="w-[40%]"
                yFrom={-100}
                ease="bounce"
                duration={0.8}
              >
                <Card
                  title="1. Clearing House"
                  icon={HiMiniClipboardDocumentList}
                  text="Clearing house adalah sebuah lembaga atau sistem yang berfungsi sebagai perantara untuk menyelesaikan transaksi keuangan atau perdagangan antara dua pihak yang terlibat dalam suatu transaksi. Tugas utamanya adalah untuk memastikan bahwa transaksi yang terjadi antara pembeli dan penjual dapat diselesaikan dengan aman dan efisien, serta untuk mengurangi risiko kegagalan atau penipuan dalam transaksi tersebut."
                ></Card>
              </AnimatedScroll>
              <AnimatedScroll
                className="w-[40%]"
                yFrom={-100}
                ease="bounce"
                duration={1.2}
              >
                <Card
                  title="2. Verifikasi Berkas"
                  icon={HiDocumentCheck}
                  text="Verifikasi berkas adalah proses pemeriksaan dan pengecekan dokumen atau informasi yang diberikan oleh suatu pihak untuk memastikan keaslian, kebenaran, dan kelengkapan dari dokumen tersebut. Verifikasi berkas umumnya dilakukan oleh lembaga atau instansi yang berwenang untuk memastikan bahwa data atau dokumen yang diserahkan sesuai dengan ketentuan atau persyaratan yang berlaku."
                ></Card>
              </AnimatedScroll>
            </div>
          </div>
        </section>
      </div>
      <section className="flex flex-col px-5 justify-center items-center max-w-7xl w-full">
        {/* <div className="text-montserrat text-3xl font-bold">
          <h1 className="text-white">Grafik Kinerja Clearing House</h1>
        </div> */}
        <div className="flex flex-row w-full justify-start items-center gap-16 h-96">
          <AnimatedScroll
            className="w-1/2"
            xFrom={-200}
            opacityFrom={0}
            duration={1}
          >
            <div className="flex flex-col rounded-none justify-center items-center h-full bg-white min-h-96">
              <ReactApexChart
                options={columnChart.options}
                series={columnChart.series}
                type="bar"
                height={300}
                width={500}
                className=""
                fallback={<div>Loading chart...</div>}
              />
            </div>
          </AnimatedScroll>

          <AnimatedScroll
            className="w-1/2"
            xFrom={200}
            opacityFrom={0}
            duration={1}
          >
            <div className="flex flex-col h-full justify-center items-start">
              <h1 className="text-2xl mb-3">Kinerja Clearing House</h1>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                accusamus provident quo ut aspernatur, fugit ipsum dolores
                eligendi quia nam officiis, et laboriosam vel eum maiores? Nihil
                quasi cum iure?
              </p>
            </div>
          </AnimatedScroll>
        </div>

        <div className="flex w-full justify-start items-center gap-16 h-96 flex-row-reverse">
          <AnimatedScroll
            className="w-1/2"
            xFrom={200}
            opacityFrom={0}
            duration={1}
          >
            <div className="flex flex-col rounded-none justify-center items-center h-full bg-white min-h-96">
              <ReactApexChart
                options={mixedChart.options}
                series={mixedChart.series}
                type="line"
                width={500}
                height={300}
              />
            </div>
          </AnimatedScroll>
          <AnimatedScroll
            className="w-1/2"
            xFrom={-200}
            opacityFrom={0}
            duration={1}
          >
            <div className="flex flex-col h-full justify-center items-end">
              <h1 className="text-2xl mb-3">Kinerja Verifikasi Berkas</h1>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                accusamus provident quo ut aspernatur, fugit ipsum dolores
                eligendi quia nam officiis, et laboriosam vel eum maiores? Nihil
                quasi cum iure?
              </p>
            </div>
          </AnimatedScroll>
        </div>
      </section>
    </div>
  );
}
