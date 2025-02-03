import React from "react";

export default function Modal({
  children,
  overlayRef,
  setIsModalOpen,
  handleCloseModal,
}) {
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] p-3"
      onClick={() => {
        handleCloseModal();
      }}
    >
      {children}
    </div>
  );
}
