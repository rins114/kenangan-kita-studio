import React from "react";

export default function Modal({ children, setIsModalOpen }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] p-3"
      onClick={() => {
        setIsModalOpen(false);
      }}
    >
      {children}
    </div>
  );
}
