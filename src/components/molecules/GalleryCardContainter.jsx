import React from "react";

export default function GalleryCardContainter({ children }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full py-5 px-1 sm:px-5  gap-4 justify-center">
      {children}
    </div>
  );
}
