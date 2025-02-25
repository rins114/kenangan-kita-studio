"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useNavigation } from "@/contexts/NavigationContext";
import Card from "@/components/molecules/Card";
import { HiDocumentCheck } from "react-icons/hi2";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import LogoLink from "@/components/atoms/LogoLink";
import { useRouter } from "next/navigation";
import useScrollToTop from "@/hooks/useScrollToTop";
const AnimatedScroll = dynamic(
  () => import("@/components/gsap/AnimatedScroll"),
  { ssr: false }
);

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function LandingPage() {
  const router = useRouter();

  useScrollToTop();

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
        categories: ["Feb", "Mar", "Apr"],
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
  const { aboutRef, layananRef, kinerjaRef } = useNavigation();
  return (
    //bg-custom-gradient from-mainColor/60 to-thirdColor/40
    <div className="w-full flex flex-col justify-start items-center text-poppins relative top-[5rem] md:top-[6rem]">
      <div className="w-full bg-grayBg">
        <AnimatedScroll
          yFrom={150}
          opacityFrom={0}
          duration={1}
          className={"flex w-full justify-center items-start"}
        >
          <section
            ref={aboutRef}
            className="flex flex-col justify-center items-center gap-10 py-12 md:py-24 px-5 w-full max-w-7xl scroll-mt-20 md:scroll-mt-[27rem]"
          >
            <h1 className="text-3xl font-semibold">APA ITU SIMPRO PBJ?</h1>
            <div className="flex flex-col-reverse md:flex-row gap-10 w-full">
              <AnimatedScroll
                className="md:w-1/2"
                xFrom={-10}
                opacityFrom={0}
                duration={1}
              >
                <div>
                  <p className="text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc arcu nisi, dictum non aliquam eget, pulvinar consequat
                    enim. Nulla malesuada lacinia sollicitudin. Sed in
                    pellentesque lectus. Sed iaculis ligula purus. Aliquam sed
                    turpis risus. Duis non vulputate nulla. In accumsan velit
                    nec leo elementum sodales. Praesent faucibus sollicitudin
                    nunc quis suscipit. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus. Cras eget dolor posuere, commodo
                    sem nec, auctor quam. Integer efficitur rhoncus augue, non
                    cursus sem suscipit eu. Cras tincidunt quam nec turpis porta
                    aliquam. Donec eu placerat augue. Nam at accumsan ligula.
                    Nullam suscipit volutpat dui, a euismod ex tristique quis.
                    Integer venenatis dolor eu rhoncus ultrices. Donec vel nisl
                    convallis, tincidunt odio id, imperdiet odio. Aenean
                    eleifend gravida efficitur. Sed pellentesque ex aliquam
                    felis facilisis faucibus. Integer rutrum aliquet nulla at
                    consectetur.
                  </p>
                </div>
              </AnimatedScroll>
              <AnimatedScroll
                className="md:w-1/2"
                xFrom={10}
                opacityFrom={0}
                duration={1}
              >
                <div className="relative w-full h-64 md:h-96 min-h-80">
                  <Image
                    alt="img"
                    src={"/assets/images/auth-2.jpg"}
                    fill
                    className="object-cover"
                  />
                </div>
              </AnimatedScroll>
            </div>
          </section>
        </AnimatedScroll>
      </div>

      <div
        className="relative w-full flex flex-col justify-start items-center bg-center"
        style={{
          backgroundImage: 'url("/assets/images/DIV.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <svg
          width="100%"
          height="100%"
          id="svg"
          viewBox="0 0 1440 595"
          xmlns="http://www.w3.org/2000/svg"
          className="transition duration-300 ease-in-out delay-150 mb-[1150px] xs:mb-[1090px] sm:mb-[1000px] md:mb-[320px] lg:mb-[230px] xl:mb-28 2xl:mb-0"
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
        </svg> */}
        <section
          ref={layananRef}
          className="w-full justify-center items-center flex pt-5 scroll-mt-[11rem]"
        >
          <div className="flex flex-col gap-10 justify-center items-center max-w-7xl w-full">
            <AnimatedScroll
              yFrom={70}
              duration={0.5}
              opacityFrom={0}
              className={"px-7"}
            >
              <h1 className="text-3xl text-black font-semibold">
                APA SAJA LAYANAN SIMPRO PBJ?
              </h1>
            </AnimatedScroll>
            <div className="md:flex-row flex-col flex gap-5 w-full px-5 justify-center items-center">
              <AnimatedScroll
                className="md:w-[40%]"
                yFrom={-100}
                ease="bounce"
                duration={1}
              >
                <Card
                  title="1. Clearing House"
                  icon={HiMiniClipboardDocumentList}
                  text="Clearing house adalah sebuah lembaga atau sistem yang berfungsi sebagai perantara untuk menyelesaikan transaksi keuangan atau perdagangan antara dua pihak yang terlibat dalam suatu transaksi. Tugas utamanya adalah untuk memastikan bahwa transaksi yang terjadi antara pembeli dan penjual dapat diselesaikan dengan aman dan efisien, serta untuk mengurangi risiko kegagalan atau penipuan dalam transaksi tersebut."
                ></Card>
              </AnimatedScroll>
              <AnimatedScroll
                className="md:w-[40%]"
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
      <div
        ref={kinerjaRef}
        className="flex flex-col px-5 justify-center items-center max-w-7xl w-full gap-5 scroll-mt-[10rem] mt-10"
      >
        <div className="flex flex-col-reverse md:flex-row w-full justify-center md:justify-start items-center gap-10 md:gap-16 h-auto md:h-96">
          <AnimatedScroll
            className="w-full md:w-1/2"
            xFrom={-10}
            opacityFrom={0}
            duration={1}
          >
            <div className="flex flex-col rounded-md justify-center items-center h-auto md:h-full bg-white">
              <ReactApexChart
                options={columnChart.options}
                series={columnChart.series}
                type="bar"
                height={300}
                className="w-full"
              />
            </div>
          </AnimatedScroll>
          <AnimatedScroll
            className="w-full md:w-1/2"
            xFrom={10}
            opacityFrom={0}
            duration={1}
          >
            <div className="flex flex-col h-auto md:h-full justify-center items-start text-center md:text-left">
              <h1 className="text-2xl mb-3 font-bold">
                GRAFIK KINERJA CLEARING HOUSE
              </h1>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                accusamus provident quo ut aspernatur, fugit ipsum dolores
                eligendi quia nam officiis, et laboriosam vel eum maiores? Nihil
                quasi cum iure?
              </p>
            </div>
          </AnimatedScroll>
        </div>

        <div className="flex flex-col-reverse md:flex-row-reverse w-full justify-center md:justify-start items-center gap-10 md:gap-16 h-auto md:h-96">
          <AnimatedScroll
            className="w-full md:w-1/2"
            xFrom={10}
            opacityFrom={0}
            duration={1}
          >
            <div className="flex flex-col rounded-md justify-center items-center h-auto md:h-full bg-white">
              <ReactApexChart
                options={mixedChart.options}
                series={mixedChart.series}
                type="line"
                height={300}
                className="w-full"
              />
            </div>
          </AnimatedScroll>

          <AnimatedScroll
            className="w-full md:w-1/2"
            xFrom={-10}
            opacityFrom={0}
            duration={1}
          >
            <div className="flex flex-col h-auto md:h-full justify-center items-center md:items-end text-center md:text-right">
              <h1 className="text-2xl mb-3 font-bold">
                GRAFIK KINERJA VERIFIKASI BERKAS
              </h1>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                accusamus provident quo ut aspernatur, fugit ipsum dolores
                eligendi quia nam officiis, et laboriosam vel eum maiores? Nihil
                quasi cum iure?
              </p>
            </div>
          </AnimatedScroll>
        </div>
      </div>
      <div className="min-h-72 bg-grayBg w-full mt-10 px-7 py-14 flex flex-col justify-around items-center gap-5">
        <h1 className="text-3xl font-semibold">LINK TERKAIT</h1>
        <div className="flex flex-col justify-center items-center gap-5 md:flex-row">
          <LogoLink
            src="/assets/images/logosbw.png"
            size={200}
            href="https://www.sumbawakab.go.id"
            bordered={false}
            className={"hover:scale-110 transition-all duration-300"}
          ></LogoLink>
          <LogoLink
            src="/assets/images/sirup.png"
            size={200}
            href="https://sirup.lkpp.go.id/sirup/loginctr/index"
            bordered={false}
            className={"hover:scale-110 transition-all duration-300"}
          ></LogoLink>
          <LogoLink
            src="/assets/images/lpse.png"
            size={200}
            href="https://lpse.lkpp.go.id/eproc4"
            bordered={false}
            className={"hover:scale-110 transition-all duration-300"}
          ></LogoLink>
        </div>
      </div>
    </div>
  );
}
