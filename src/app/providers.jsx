"use client";

import { AuthUserProvider } from "@/contexts/AuthUserContext";
import { NextUIProvider } from "@nextui-org/react";
export function Providers({ children }) {
  return (
    <NextUIProvider>
      <AuthUserProvider>{children}</AuthUserProvider>
    </NextUIProvider>
  );
}
