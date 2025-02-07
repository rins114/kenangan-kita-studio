import React from "react";

export default function AuthContainer({
  children,
  maxWidth = "28rem",
  classMinWidth = "sm:min-w-[35rem]",
}) {
  return (
    <div
      className={`z-[80] flex flex-col justify-center items-center p-7 border-2 rounded-sm w-full ${classMinWidth} gap-3 bg-white shadow-md`}
      style={{ maxWidth: `${maxWidth}` }}
    >
      {children}
    </div>
  );
}
