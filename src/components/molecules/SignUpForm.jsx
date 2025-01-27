"use client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FileInputAtom from "../atoms/FileInput";

export default function SignUpForm() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useRouter();
  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    console.log(accountType);
  }, [accountType]);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form
      action=""
      className="flex flex-col justify-center items-center w-full gap-3"
    >
      <div className="flex flex-row gap-5 w-full">
        <div className="flex flex-col w-full gap-3">
          <Select
            isRequired
            labelPlacement="outside"
            placeholder="Pilih Tipe Pemohon Anda..."
            label="Tipe Pemohon"
            // defaultSelectedKeys={"0"}
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
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

          {accountType === "2" && (
            <Select
              isRequired
              labelPlacement="outside"
              placeholder="Pilih Tipe Pengguna Anda..."
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
          )}

          <Input
            isRequired
            labelPlacement="outside"
            placeholder="Masukkan Alamat Email Anda..."
            type="email"
            label="Email"
            variant="bordered"
            className="w-full !border-transparent"
            radius="none"
          />
          <Input
            label="Password"
            isRequired
            labelPlacement="outside"
            placeholder="Masukkan Password Anda..."
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
            labelPlacement="outside"
            placeholder="Masukkan Konfirmasi Password..."
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
        <div className="flex flex-col w-full gap-3">
          <Input
            isRequired
            labelPlacement="outside"
            placeholder="Masukkan Nama Lengkap Anda..."
            type="text"
            label="Nama Lengkap"
            variant="bordered"
            className="w-full !border-transparent"
            radius="none"
          />
          <Input
            isRequired
            labelPlacement="outside"
            placeholder="Masukkan Nomor Nama Instansi Anda..."
            type="text"
            label="Nama Instansi"
            variant="bordered"
            className="w-full !border-transparent"
            radius="none"
          />
          <Input
            isRequired
            labelPlacement="outside"
            placeholder="Masukkan Nomor NIK Anda..."
            type="text"
            label="NIK"
            variant="bordered"
            className="w-full !border-transparent"
            radius="none"
          />
          <Input
            isRequired
            labelPlacement="outside"
            placeholder="Masukkan Nomor NIP Anda..."
            type="text"
            label="NIP"
            variant="bordered"
            className="w-full !border-transparent"
            radius="none"
          />
          {accountType === "2" && (
          <FileInputAtom
            handleFileChange={() => {}}
            label="SK Jabatan"
            name="sk_jabatan"
            fileName={"sk_jabatan"}
            height={3}
            rounded={false}
          />
          )}
        </div>
      </div>
      
      <Button
        type="submit"
        size="lg"
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
