"use client";
import * as React from "react";
import Stepper from "@mui/joy/Stepper";
import Step, { stepClasses } from "@mui/joy/Step";
import StepIndicator, { stepIndicatorClasses } from "@mui/joy/StepIndicator";
import Typography, { typographyClasses } from "@mui/joy/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Link from "next/link";
import { BedOutlined } from "@mui/icons-material";

export default function JoyStepper({ setSection, data }) {
  const getColorStep2 = (status) => {
    switch (status) {
      case "Ditolak":
        return "danger";
      case "Terverifikasi":
      case "Selesai":
        return "success";
      case "Diproses":
        return "primary";
      default:
        return ""; // Untuk status yang tidak sesuai
    }
  };

  const getColorStep3 = (status) => {
    switch (status) {
      case "Selesai":
        return "success";
      case "Terverifikasi":
        return "primary";
      case "Ditolak":
        return "danger";
      case "Diproses":
      case "Belum diproses":
        return "";
      default:
        return "";
    }
  };
  return (
    <>
      {data && (
        <div className="w-full overflow-x-auto py-2">
          <Stepper
            orientation="horizontal"
            sx={(theme) => ({
              "--Stepper-verticalGap": "2.5rem",
              "--StepIndicator-size": "2.5rem",
              "--Step-gap": "1rem",
              "--Step-connectorInset": "0.5rem",
              "--Step-connectorRadius": "1rem",
              "--Step-connectorThickness": "4px",
              "--joy-palette-success-solidBg": "var(--joy-palette-success-400)",
              [`& .${stepClasses.completed}`]: {
                "&::after": { bgcolor: "success.solidBg" },
              },
              [`& .${stepClasses.active}`]: {
                [`& .${stepIndicatorClasses.root}`]: {
                  border: "4px solid",
                  borderColor: "#fff",
                  boxShadow: `0 0 0 1px ${theme.vars.palette.primary[500]}`,
                },
              },
              [`& .${stepClasses.active}`]: {
                [`& .${stepIndicatorClasses.root}`]: {
                  border: "4px solid",
                  borderColor: "#fff",
                  boxShadow: `0 0 0 1px ${theme.vars.palette.primary[500]}`,
                },
              },
              [`& .${stepClasses.disabled} *`]: {
                color: "neutral.softDisabledColor",
              },
              [`& .${typographyClasses["title-sm"]}`]: {
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "10px",
              },
            })}
          >
            <Step
              completed={
                data.status === "Diproses" ||
                data.status === "Ditolak" ||
                data.status === "Terverifikasi" ||
                data.status === "Selesai"
              }
              active={data.status === "Belum diproses"}
              indicator={
                <StepIndicator
                  variant="solid"
                  color={
                    data.status === "Belum diproses" ? "primary" : "success"
                  }
                >
                  {data.status === "Belum diproses" && (
                    <AppRegistrationRoundedIcon />
                  )}
                  {(data.status === "Diproses" ||
                    data.status === "Ditolak" ||
                    data.status === "Selesai" ||
                    data.status === "Terverifikasi") && <CheckRoundedIcon />}
                </StepIndicator>
              }
            >
              <div className="text-black">
                <Typography level="title-sm" className="text-black">
                  Step 1
                </Typography>
                <button
                  className="text-black hover:underline text-left"
                  onClick={() => setSection("Step-1")}
                >
                  Pengajuan Permohonan
                </button>
              </div>
            </Step>
            <Step
              completed={
                data.status === "Terverifikasi" || data.status === "Selesai"
              }
              active={data.status === "Diproses"}
              disabled={data.status === "Belum diproses"}
              indicator={
                <StepIndicator
                  variant="solid"
                  color={getColorStep2(data.status)}
                >
                  {data.status === "Ditolak" && <CancelOutlinedIcon />}
                  {(data.status === "Terverifikasi" ||
                    data.status === "Selesai") && <CheckRoundedIcon />}
                  {data.status === "Diproses" && <AppRegistrationRoundedIcon />}
                  {data.status === "Belum diproses" && (
                    <StepIndicator>2</StepIndicator>
                  )}
                </StepIndicator>
              }
            >
              <div
                className={`${
                  data.status === "Ditolak" ? "text-danger" : "text-black"
                }`}
              >
                <Typography
                  level="title-sm"
                  className={`${
                    data.status === "Ditolak" ? "text-danger" : "text-black"
                  }`}
                >
                  Step 2
                </Typography>
                <button
                  className={`${
                    data.status === "Ditolak" ? "text-danger" : "text-black"
                  } hover:underline text-left
              }`}
                  onClick={() => setSection("Step-2")}
                >
                  Verifikasi Berkas
                </button>
              </div>
            </Step>
            <Step
              completed={data.status === "Selesai"}
              active={data.status === "Terverifikasi"}
              disabled={
                data.status === "Diproses" || data.status === "Belum diproses"
              }
              indicator={
                <StepIndicator
                  variant="solid"
                  color={getColorStep3(data.status)}
                >
                  {data.status === "Terverifikasi" && (
                    <AppRegistrationRoundedIcon />
                  )}
                  {data.status === "Selesai" && <CheckRoundedIcon />}
                  {data.status === "Ditolak" && <CancelOutlinedIcon />}
                  {(data.status === "Diproses" ||
                    data.status === "Belum diproses") && (
                    <StepIndicator>3</StepIndicator>
                  )}
                </StepIndicator>
              }
            >
              <div className={data.status === "Ditolak" ? "text-danger" : ""}>
                <Typography level="title-sm" className="text-black">
                  Step 3
                </Typography>
                <button
                  disabled={
                    data.status === "Diproses" || data.status === "Ditolak"
                  }
                  className={`${
                    data.status === "Ditolak" ? "text-danger" : "text-black"
                  } ${
                    data.status === "Diproses" || data.status === "Ditolak"
                      ? ""
                      : "hover:underline"
                  } text-left
              }`}
                  onClick={() => setSection("Step-3")}
                >
                  Keputusan Akhir
                </button>
              </div>
            </Step>
            {/* <Step disabled indicator={<StepIndicator>4</StepIndicator>}>
            <div>
              <Typography level="title-sm">Step 4</Typography>
              Payment details
            </div>
          </Step> */}
          </Stepper>
        </div>
      )}
    </>
  );
}
