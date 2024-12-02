import React from "react";

export default function DropdownHoverItem({ children }) {
  return (
    <a className="block font-medium hover:bg-gray-200 w-full h-full p-3">
      {children}
    </a>
  );
}
