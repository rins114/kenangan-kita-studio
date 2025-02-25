"use client";
import { useAuthUser } from "@/contexts/AuthUserContext";
import useLogin from "@/hooks/useLogin";
import React, { useEffect, useState } from "react";
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
  user,
} from "@nextui-org/react";
import { IoHome } from "react-icons/io5";
import { getClearingHouseStatusStats } from "@/services/Stats";
import { showToast } from "@/utils/ShowToast";
import { getStatusString } from "@/utils/GetStatusHelper";
const ReactPdfView = dynamic(
  () => import("@/components/molecules/ReactPdfView"),
  {
    ssr: false, // Disable server-side rendering
  }
);

const TOKEN = localStorage.getItem("access_token");

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DashboardPage() {
  const { user } = useAuthUser();
  const { isLoading } = useLogin();
  const [stats, setStats] = useState([]);

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Selamat Pagi");
    } else if (currentHour < 15) {
      setGreeting("Selamat Siang");
    } else if (currentHour < 18) {
      setGreeting("Selamat Sore");
    } else {
      setGreeting("Selamat Malam");
    }
  }, []);

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
    series: stats?.datasets ?? [],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: stats?.labels ?? [],
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

  useEffect(() => {
    async function fetchStats() {
      const result = await getClearingHouseStatusStats(TOKEN);
      console.log(result);
      if (result.status !== 200) {
        await showToast("error", result.message);
        return;
      }
      const newLabel = result?.data?.labels?.map((label) =>
        getStatusString(label)
      );
      setStats((prev) => ({
        ...prev,
        datasets: result.data.datasets,
        labels: newLabel,
      }));
    }
    fetchStats();
  }, []);

  useEffect(() => {
    console.log(stats);
  }, [stats]);

  return (
    <div className="p-5 flex flex-col justify-start items-center gap-3">
      <div className="w-full text-center text-xl font-bold mb-5">
        {greeting ? greeting : "Halo"} {user?.name}, Selamat Datang di SIMPRO
        PBJ Kabupaten Sumbawa!
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-5 justify-center items-center h-full">
        <div className="flex flex-col w-full max-w-md xl:w-1/2 border-none rounded-md justify-center items-center min-h-96 shadow-none bg-white">
          <ReactApexChart
            options={columnChart.options}
            series={columnChart.series}
            className="flex flex-col justify-center items-center"
            type="bar"
            height="70%"
            width="100%"
          />
        </div>
        <div className="flex flex-col w-full max-w-md xl:w-1/2 border-none rounded-md justify-center items-center min-h-96 shadow-none bg-white">
          <ReactApexChart
            options={pieChart.options}
            series={pieChart.series}
            className="flex justify-center items-center"
            type="pie"
            height="45%"
            width="100%"
          />
        </div>
        {/* <ReactPdfView></ReactPdfView> */}
      </div>
    </div>
  );
}
