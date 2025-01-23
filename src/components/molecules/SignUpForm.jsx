"use client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUpForm() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form
      action=""
      className="flex flex-col justify-center items-center w-full gap-3"
    >
      <div className="flex flex-col w-full gap-3">
        <Select
          isRequired
          label="Tipe Akun"
          // defaultSelectedKeys={"0"}
          className="w-full"
          variant="bordered"
          radius="none"
        >
          <SelectItem key={"1"} value={"penyedia"}>
            Penyedia
          </SelectItem>
          <SelectItem key={"2"} value={"non-penyedia"}>
            Non Penyedia
          </SelectItem>
        </Select>

        <Select
          isRequired
          label="Tipe Pengguna"
          // defaultSelectedKeys={"0"}
          className="w-full"
          variant="bordered"
          radius="none"
        >
          <SelectItem key={"1"} value={"ppk"}>
            PPK
          </SelectItem>
          <SelectItem key={"2"} value={"pa"}>
            PA
          </SelectItem>
          <SelectItem key={"3"} value={"bendahara"}>
            BENDAHARA
          </SelectItem>
          <SelectItem key={"4"} value={"pptk"}>
            PPTK
          </SelectItem>
        </Select>

        <Input
          isRequired
          type="email"
          label="Email"
          variant="bordered"
          className="w-full !border-transparent"
          radius="none"
        />
        <Input
          label="Password"
          isRequired
          variant="bordered"
          radius="none"
          endContent={
            <button
              className="focus:outline-none h-full"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <FaEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="w-full"
        />
        <Input
          label="Confirm Password"
          isRequired
          variant="bordered"
          radius="none"
          endContent={
            <button
              className="focus:outline-none h-full"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <FaEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="w-full"
        />
      </div>
      <Button
        type="submit"
        className="w-full rounded-sm bg-mainColor text-white"
      >
        Daftar
      </Button>
      <p>
        Sudah punya akun?{" "}
        <span>
          <Link href="/signin" className="text-mainColor hover:underline">
            Sign In
          </Link>
        </span>
      </p>
    </form>
  );
}
