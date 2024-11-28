"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignInForm() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form
      action=""
      className="flex flex-col justify-center items-center w-full gap-3"
    >
      <div className="flex flex-col w-full gap-3">
        <Input
          isRequired
          type="email"
          label="Email"
          variant="bordered"
          className="max-w-xs !border-transparent"
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
          className="max-w-xs"
        />
        <Link href="#">
          <p className="text-sm hover:underline">Lupa Password?</p>
        </Link>
      </div>
      <Button
        type="submit"
        className="w-full rounded-sm bg-mainColor text-white"
      >
        Masuk
      </Button>
      <Button
        type="button"
        className="w-full rounded-sm border-2 border-mainColor text-mainColor bg-white"
        onClick={() => navigate.push("/signup")}
      >
        Buat Akun
      </Button>
    </form>
  );
}
