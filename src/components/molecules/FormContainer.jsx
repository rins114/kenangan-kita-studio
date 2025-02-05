import React from "react";

export default function FormContainer({ children, title }) {
  return (
    <div className="p-5 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-1 w-full border-2 border-slate-200 rounded-md bg-white overflow-hidden">
        <div className="bg-slate-300 p-3">
          <h1 className="text-md font-medium">{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
