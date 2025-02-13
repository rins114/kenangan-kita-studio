import React from "react";

export default function DataView({ _key, value }) {
  return (
    <div className="flex flex-col md:flex-row w-full justify-start items-start gap-1">
      <div className="w-full lg:w-1/4 text-gray-500">
        <p>{_key}</p>
      </div>

      <div className="w-full">
        <p>{value}</p>
      </div>
    </div>
  );
}
