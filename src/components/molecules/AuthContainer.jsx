import React from "react";

export default function AuthContainer({ children }) {
  return (
    <div className="flex flex-col justify-center items-center p-7 border-2 rounded-3xl w-1/2 gap-3 bg-white shadow-md">
      {children}
    </div>
  );
}
