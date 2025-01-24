import React from "react";

export default function AuthContainer({ children, maxWidth = "max-w-md" }) {
  return (
    <div
      className={`z-[80] flex flex-col justify-center items-center p-7 border-2 rounded-sm w-full sm:${maxWidth} gap-3 bg-white shadow-md`}
    >
      {children}
    </div>
  );
}
