"use client";
import React, { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

const PdfViewer = ({
  fileUrl = "http://localhost:3000/assets/pdf/dokumen1.pdf",
}) => {
  const [url, setUrl] = useState(""); // State to hold the entered URL
  const [file, setFile] = useState(null); // State to store the fetched File object
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  const fetchPdfFromUrl = async (pdfUrl) => {
    try {
      console.log(pdfUrl);
      const response = await fetch(pdfUrl);
      console.log(response.body);
      const blob = await response.blob();
      const fileName = pdfUrl.split("/").pop();
      const file = new File([blob], fileName, { type: "application/pdf" });
      setFile(file);
    } catch (error) {
      console.log("Error fetching PDF:", error);
      alert("Failed to load the PDF. Please check the URL.");
    }
  };

  const handleLoadPdf = () => {
    if (url.trim() !== "") {
      fetchPdfFromUrl(url.trim());
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      className="border-2 rounded-lg h-[50rem] max-w-2xl"
    >
      {/* URL Input */}
      {/* <div
        style={{
          padding: "0.5rem",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f1f1f1",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Enter PDF URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleLoadPdf}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Load PDF
        </button>
      </div> */}

      {/* Toolbar */}
      <div
        style={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          padding: "0.5rem",
          backgroundColor: "#f1f1f1",
        }}
      >
        <Toolbar />
      </div>

      {/* PDF Viewer */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div style={{ flex: 1, overflow: "auto" }}>
          {/* {file ? ( */}
          <Viewer fileUrl={fileUrl} plugins={[toolbarPluginInstance]} />
          {/* ) : (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              Please enter a valid PDF URL to view.
            </p>
          )} */}
        </div>
      </Worker>
    </div>
  );
};

export default PdfViewer;
