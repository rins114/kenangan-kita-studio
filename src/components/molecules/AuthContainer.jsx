import React from "react";

export default function AuthContainer({ children }) {
  return (
    <div className="z-[80] flex flex-col justify-center items-center p-7 border-2 rounded-sm w-full sm:max-w-md gap-3 bg-white shadow-md">
      {children}
    </div>
  );
}
