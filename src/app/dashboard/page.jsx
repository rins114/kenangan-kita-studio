"use client";
import React from "react";
import dynamic from "next/dynamic";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { IoHome } from "react-icons/io5";
const ReactPdfView = dynamic(
  () => import("@/components/molecules/ReactPdfView"),
  {
    ssr: false, // Disable server-side rendering
  }
);

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DashboardPage() {
  const columnChart = {
    series: [
      {
        name: "Permohonan",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
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
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
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

  const pieChart = {
    series: [2, 4, 3, 10],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Diajukan", "Ditolak", "Terverifikasi", "Selesai"],
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
    <div className="p-5 flex flex-col justify-start items-center gap-3">
      <div className="w-full flex gap-3"></div>
      <div className="w-full flex gap-5 justify-center items-start h-full">
        <div className="flex flex-col w-1/2 border-2 rounded-md justify-center items-center h-full shadow-md bg-white min-h-96">
          <ReactApexChart
            options={columnChart.options}
            series={columnChart.series}
            type="bar"
            height={300}
            width={500}
            className=""
          />
        </div>
        <div className="flex flex-col gap-3 w-1/2 border-2 rounded-md justify-center items-center h-full shadow-md bg-white min-h-96">
          <ReactApexChart
            options={pieChart.options}
            series={pieChart.series}
            type="pie"
            height={300}
            width={500}
            className=""
          />
        </div>
        <ReactPdfView></ReactPdfView>
      </div>
    </div>
  );
}
