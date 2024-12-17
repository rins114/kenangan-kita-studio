"use client";
import SearchBar from "@/components/molecules/SearchBar";
import StaticHero from "@/components/molecules/StaticHero";
import { Button } from "@nextui-org/react";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PeraturanPage() {
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

  return (
    <div className="flex flex-col justify-start items-center gap-5 text-poppins bg-grayBg">
      <StaticHero imagePath="/assets/images/staticHero.jpg"></StaticHero>
      <div className="w-full flex flex-col min-h-96 justify-start items-center relative bottom-16 gap-7 px-5">
        <SearchBar></SearchBar>
        <div className="w-full max-w-[90rem] flex flex-col md:flex-row gap-7">
          <section className="flex flex-col justify-start items-center md:w-2/3 border-2 min-h-80 rounded-2xl px-5 py-10 gap-7 shadow-md bg-white">
            <h1 className="text-2xl font-bold">Pencarian Terpopuler</h1>
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
                      <Button className="bg-gray-500 text-white font-medium">
                        Pratinjau
                      </Button>
                      <Button className="bg-mainColor text-white font-medium">
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
              <h1 className="text-2xl font-bold">Produk Hukum</h1>
              <ReactApexChart
                options={pieChartData.options}
                series={pieChartData.series}
                type="donut"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
