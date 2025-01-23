"use client";
import JoyStepper from "@/components/molecules/JoyStepper";
import HorizontalStepperWithError from "@/components/molecules/Stepper";
import React, { useState } from "react";

export default function PermohonanDetailPage({ params }) {
  const { id } = React.use(params);
  const [section, setSection] = useState("Step-1");
  const data = {
    name: "Permohonan 1",
    status: "Ditolak",
  };

  return (
    <div className="w-full flex flex-col justify-start items-center p-7 gap-7">
      <section className="p-5 rounded-xl h-full bg-blue-950/0 flex flex-col w-full">
        {/* <HorizontalStepperWithError></HorizontalStepperWithError> */}
        <JoyStepper setSection={setSection} data={data}></JoyStepper>
      </section>
      {section === "Step-1" && (
        <section className="h-full min-h-96 border-2 rounded-xl w-full p-5">
          <h1>Content Step 1</h1>
        </section>
      )}
      {section === "Step-2" && (
        <section className="h-full min-h-96 border-2 rounded-xl w-full p-5">
          <h1>Content Step 2</h1>
        </section>
      )}
      {section === "Step-3" && (
        <section className="h-full min-h-96 border-2 rounded-xl w-full p-5">
          <h1>Content Step 3</h1>
        </section>
      )}
    </div>
  );
}
