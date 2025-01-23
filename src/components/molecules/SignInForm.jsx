"use client";
import { login } from "@/services/Authentication";
import { showToast } from "@/utils/ShowToast";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignInForm() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState("");
  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsEmailValid(false);
    setIsPasswordValid(false);
    setInvalidMessage("");
    if (email == "" || !validateEmail(email)) {
      setIsEmailValid(true);
      setInvalidMessage("Please enter a valid email");
      return;
    }
    if (password == "") {
      setIsPasswordValid(true);
      setInvalidMessage("Please enter a valid password");
      return;
    }
    const result = await login(email, password);
    if (result.status === 401) {
      await showToast("warning", "Email atau password salah");
      return;
    }
    if (result.status === 500) {
      await showToast("error", "Server error, coba lagi nanti");
      return;
    }
    localStorage.setItem("access_token", result?.data?.token);
    await showToast("success", "Login Berhasil");
    navigate.push("/dashboard");
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <form
      action=""
      onSubmit={(e) => handleLogin(e)}
      className="flex flex-col justify-center items-center w-full gap-3"
    >
      <div className="flex flex-col w-full gap-3">
        <Input
          isRequired
          type="email"
          label="Email"
          variant="bordered"
          errorMessage={invalidMessage}
          isInvalid={isEmailValid}
          className="w-full !border-transparent"
          radius="none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          isRequired
          variant="bordered"
          errorMessage={invalidMessage}
          radius="none"
          isInvalid={isPasswordValid}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
