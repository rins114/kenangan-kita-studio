import { Button as NextButton } from "@nextui-org/react";
import React from "react";

export default function Button({ color = "primary" }) {
  return <NextButton color={color}>Button</NextButton>;
}
