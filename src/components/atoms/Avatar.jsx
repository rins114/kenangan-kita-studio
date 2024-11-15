import Image from "next/image";
import React from "react";

export default function Avatar() {
  return (
    <div className="w-56 h-56 rounded-full overflow-hidden">
      <Image
        src="/assets/images/default_pp.png"
        width={500}
        height={500}
        alt="avatar"
        className="object-center object-cover"
      />
    </div>
  );
}
