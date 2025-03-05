import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoHome } from "react-icons/io5";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/");

  let url;
  const breadcrumbLinks = segments.map((segment, index) => {
    if (index === 0) url = "";
    url += `${segment}`;
    if (index !== segments.length - 1) url += "/";
    const formatSegment = segment
      .replace(/%20/g, " ")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return (
      <Link
        key={index}
        href={"http://localhost:3000" + url}
        className="flex gap-1"
      >
        {segment === "" ? (
          <div className="flex gap-1 justify-start items-center">
            <IoHome></IoHome> Home
          </div>
        ) : (
          <p
            className={`${
              index === segments.length - 1 && "font-medium text-success-500"
            }`}
          >
            {formatSegment}
          </p>
        )}
        {index !== segments.length - 1 && " / "}
      </Link>
    );
  });
  return breadcrumbLinks;
}
