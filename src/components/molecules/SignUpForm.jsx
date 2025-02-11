"use client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FileInputAtom from "../atoms/FileInput";

export default function SignUpForm({
  handleRegister,
  formData,
  handleFormDataChange,
  handleFileChange,
  confirmPassword,
  setConfirmPassword,
  userRoles,
  userSubRoles,
  selectedRolesName,
  setSelectedRolesName,
  selectedSubRolesName,
  setSelectedSubRolesName,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useRouter();
  const [passwordError, setPasswordError] = useState(""); // State untuk menyimpan pesan error jika password kurang dari 6 karakter
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    // ✅ Validasi panjang password minimal 6 karakter
    if (formData.password.length > 0 && formData.password.length < 6) {
      setPasswordError("Password harus minimal 6 karakter");
    } else {
      setPasswordError("");
    }

    // ✅ Validasi Confirm Password harus sama dengan Password
    if (
      formData.confirmPassword &&
      formData.confirmPassword.length > 0 &&
      formData.confirmPassword !== formData.password
    ) {
      setConfirmPasswordError("Konfirmasi password tidak cocok");
    } else {
      setConfirmPasswordError("");
    }
  }, [formData.password, formData.confirmPassword]); // 🔄 Akan dijalankan setiap Password atau Confirm Password berubah

  useEffect(() => {
    console.log(userSubRoles);
  }, [userSubRoles]);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col justify-center items-center w-full gap-3 max-h-[33rem]"
    >
      <div className="flex flex-col lg:flex-row gap-5 w-full overflow-y-auto">
        <div className="flex flex-col lg:w-1/2 gap-3">
          <Select
            isRequired
            labelPlacement="outside"
            placeholder="Pilih Tipe Pemohon Anda"
            label="Tipe Pemohon"
            // defaultSelectedKeys={"0"}
            value={selectedRolesName}
            onChange={(e) => setSelectedRolesName(e.target.value)}
            className="w-full"
            variant="bordered"
            radius="none"
          >
            {userRoles.map((role) => (
              <SelectItem key={role.name} value={role.name}>
                {role.name.replace(/_/g, " ")}
              </SelectItem>
            ))}
            {/* <SelectItem key={"1"} value={"penyedia"}>
              Penyedia
            </SelectItem>
            <SelectItem key={"2"} value={"non-penyedia"}>
              Non Penyedia
            </SelectItem> */}
          </Select>

          {userSubRoles.length > 0 && (
            <Select
              isRequired
              labelPlacement="outside"
              placeholder="Pilih Tipe Pengguna Anda"
              label="Tipe Pengguna"
              // defaultSelectedKeys={"0"}
              className="w-full"
              variant="bordered"
              radius="none"
              value={selectedSubRolesName}
              onChange={(e) => setSelectedSubRolesName(e.target.value)}
            >
              {userSubRoles.map((subRole) => (
                <SelectItem key={subRole.sub_roles} value={subRole.sub_roles}>
                  {subRole.sub_roles}
                </SelectItem>
              ))}
            </Select>
          )}

          <Input
            isRequired
            labelPlacement="outside"
            placeholder="Masukkan Alamat Email Anda"
            type="email"
            name="email"
            label="Email"
            variant="bordered"
            className="w-full !border-transparent"
            radius="none"
            value={formData.email}
            onChange={handleFormDataChange}
          />
          <Input
            label={
              passwordError ? (
                <span className="text-red-500 text-sm">{passwordError}</span> // ✅ Pesan error muncul di label
              ) : (
                "Password" // ✅ Label default jika tidak ada error
              )
            }
            isRequired
            labelPlacement="outside"
            placeholder="Masukkan Password Anda"
            variant="bordered"
            radius="none"
            name="password"
            value={formData.password}
            onChange={handleFormDataChange}
            endContent={
              <button
                className="focus:outline-none h-full"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <FaEye className="text-xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-full"
          />

          <Input
            label={
              confirmPasswordError ? (
                <span className="text-red-500 text-sm">
                  {confirmPasswordError}
                </span> // ✅ Pesan error di label
              ) : (
                "Confirm Password" // ✅ Label default jika tidak ada error
              )
            }
            isRequired
            labelPlacement="outside"
            placeholder="Masukkan Konfirmasi Password"
            variant="bordered"
            radius="none"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endContent={
              <button
                className="focus:outline-none h-full"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <FaEye className="text-xl text-default-400 pointer-events-none" />
                ) : (
                  <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-full"
          />
        </div>
        <div className="flex flex-col lg:w-1/2 gap-3">
          <Input
            isRequired
            labelPlacement="outside"
            placeholder="Masukkan Nama Lengkap Anda"
            type="text"
            label="Nama Lengkap"
            name="name"
            variant="bordered"
            className="w-full !border-transparent"
            radius="none"
            value={formData.name}
            onChange={handleFormDataChange}
          />
          <Input
            isRequired
            labelPlacement="outside"
            placeholder="Masukkan Nomor Nama Instansi Anda"
            type="text"
            name="nama_perusahaan"
            label="Nama Instansi"
            variant="bordered"
            className="w-full !border-transparent"
            radius="none"
            value={formData.nama_perusahaan}
            onChange={handleFormDataChange}
          />
          <Input
            isRequired
            labelPlacement="outside"
            placeholder="Masukkan Nomor NIK Anda"
            type="text"
            label="NIK"
            name="nik"
            variant="bordered"
            value={formData.nik}
            className="w-full !border-transparent"
            radius="none"
            onChange={handleFormDataChange}
          />
          <Input
            isRequired
            labelPlacement="outside"
            placeholder="Masukkan Nomor NIP Anda"
            type="text"
            label="NIP"
            name="nip"
            value={formData.nip}
            variant="bordered"
            className="w-full !border-transparent"
            radius="none"
            onChange={handleFormDataChange}
          />
          {userSubRoles.length > 0 && (
            <FileInputAtom
              label="SK Jabatan"
              name="sk_jabatan"
              fileName={"sk_jabatan"}
              height={3}
              rounded={false}
              handleFileChange={handleFileChange}
            />
          )}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-sm bg-mainColor text-white h-[5rem] lg:h-[3rem]"
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
