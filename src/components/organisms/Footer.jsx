import React, { useMemo } from "react";
import Logo from "../atoms/Logo";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customMarkerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export default function Footer() {
  return (
    <footer className="bg-white flex justify-center items-center py-10 px-7 text-poppins">
      <div className="w-full">
        <div className="w-full flex lg:flex-row gap-10 xl:gap-0 flex-col justify-center items-center">
          <div className="w-[20rem] flex-col justify-center items-center lg:items-start">
            <Logo
              path="/assets/images/logopbj.png"
              rounded={false}
              widthSize="300"
              heightSize="80"
              className=""
            ></Logo>
            {/* <p className="justify-start items-start font-medium text-gray-900">Alamat</p> */}
            <p className="text-md text-center lg:text-left mt-3">
              Jl. Garuda No. 1, Lempeh, Kecamatan Sumbawa, Kabupaten Sumbawa,
              Nusa Tenggara Barat. 84316
            </p>

            <div className="flex flex-col justify-center items-center">
              <p className="font-medium mt-5">Ikuti Sosial Media Kami</p>
              <ul className="flex gap-6">
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-blue-500 transition hover:to-blue-500"
                  >
                    <span className="sr-only">Facebook</span>

                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-red-500 transition hover:to-blue-500"
                  >
                    <span className="sr-only">Instagram</span>

                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75"
                  >
                    <span className="sr-only">Twitter</span>

                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:ml-10 gap-10 justify-center items-center">
            <div className="flex justify-center items-center h-80 rounded-xl overflow-hidden min-w-[20rem] md:w-[20rem] lg:w-[25rem] xl:w-[30rem]">
              <MapContainer
                center={[-8.489673, 117.419503]}
                zoom={50}
                className="w-full h-full z-10"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={[-8.489673, 117.419503]}
                  icon={customMarkerIcon}
                >
                  <Popup>Alamat Kantor PBJ Kab. Sumbawa.</Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="flex flex-col gap-10 md:flex-row justify-start items-start">
              <div className="flex md:flex-row flex-col justify-center px-5 w-full items-start gap-5">
                <div className="flex flex-col justify-center items-center md:items-start">
                  <p className="font-medium text-gray-900">Menu Utama</p>

                  <ul className="mt-6 space-y-4 text-sm flex flex-col justify-center items-center md:items-start">
                    <li>
                      <a
                        href="#"
                        className="text-gray-700 transition hover:opacity-75 hover:underline hover:text-blue-500"
                      >
                        {" "}
                        Beranda{" "}
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-gray-700 transition hover:opacity-75 hover:underline hover:text-blue-500"
                      >
                        {" "}
                        Peraturan{" "}
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-gray-700 transition hover:opacity-75 hover:underline hover:text-blue-500"
                      >
                        {" "}
                        Galeri{" "}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col justify-center items-center md:items-start">
                  <p className="font-medium text-gray-900">Link Terkait</p>

                  <ul className="mt-6 space-y-4 text-sm flex flex-col justify-center items-center md:items-start">
                    <li>
                      <a
                        href="#"
                        className="text-gray-700 transition hover:opacity-75 hover:underline hover:text-blue-500"
                      >
                        {" "}
                        SumbawaKab{" "}
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-gray-700 transition hover:opacity-75"
                      >
                        {" "}
                        SiRUP{" "}
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-gray-700 transition hover:opacity-75"
                      >
                        {" "}
                        LPSE{" "}
                      </a>
                    </li>
                  </ul>
                </div>

                {/* <div className="flex flex-col justify-center items-center md:items-start">
                <p className="font-medium text-gray-900">Legal</p>

                <ul className="mt-6 space-y-4 text-sm flex flex-col justify-center items-center md:items-start">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Accessibility{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Returns Policy{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Refund Policy{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Hiring Statistics{" "}
                    </a>
                  </li>
                </ul>
              </div> */}
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center mt-10">
          &copy; 2024. Diskominfotiksan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
