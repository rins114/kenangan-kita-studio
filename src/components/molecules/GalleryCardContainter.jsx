import React from "react";

export default function GalleryCardContainter({ children }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-7 gap-5">
      {children}
    </div>
  );
}
