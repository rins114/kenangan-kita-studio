"use client";
import React from "react";
import dynamic from "next/dynamic";

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
  return (
    //bg-custom-gradient from-mainColor/60 to-thirdColor/40
    <div className=" flex flex-col justify-start items-center">
      <div className="flex flex-col px-5 py-10 gap-7 justify-center items-center max-w-7xl w-full">
        {/* <div className="text-montserrat text-3xl font-bold">
          <h1 className="text-white">Grafik Kinerja Clearing House</h1>
        </div> */}
        <div className="flex flex-row w-full justify-start items-center gap-16 h-96">
          <div className="flex flex-col w-1/2 rounded-none justify-center items-center h-full bg-white min-h-96">
            <ReactApexChart
              options={columnChart.options}
              series={columnChart.series}
              type="bar"
              height={300}
              width={500}
              className=""
            />
          </div>
          <div className="flex flex-col w-1/2 h-full justify-center items-start">
            <h1 className="text-2xl mb-3">Kinerja Clearing House</h1>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              accusamus provident quo ut aspernatur, fugit ipsum dolores
              eligendi quia nam officiis, et laboriosam vel eum maiores? Nihil
              quasi cum iure?
            </p>
          </div>
        </div>
        <div className="flex w-full justify-start items-center gap-16 h-96 flex-row-reverse">
          <div className="flex flex-col w-1/2 rounded-none justify-center items-center h-full bg-white min-h-96">
            <ReactApexChart
              options={mixedChart.options}
              series={mixedChart.series}
              type="line"
              width={500}
              height={300}
            />
          </div>
          <div className="flex flex-col w-1/2 h-full justify-center items-end">
            <h1 className="text-2xl mb-3">Kinerja Verifikasi Berkas</h1>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              accusamus provident quo ut aspernatur, fugit ipsum dolores
              eligendi quia nam officiis, et laboriosam vel eum maiores? Nihil
              quasi cum iure?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
