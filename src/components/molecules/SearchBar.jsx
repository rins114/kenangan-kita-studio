import { Button, Input } from "@nextui-org/react";
import React from "react";
import { FaFilter, FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <form
      action=""
      className="flex flex-row gap-5 w-full max-w-[90rem] p-5 bg-white border-1 rounded-2xl z-[20] text-poppins shadow-md"
    >
      <Input
        size="lg"
        placeholder="Masukkan kata kunci pencarian"
        variant="bordered"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-white",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "bg-grayBg",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        startContent={<FaSearch></FaSearch>}
      ></Input>
      <Button
        size="lg"
        isIconOnly
        className="flex md:hidden bg-mainColor text-white font-medium"
      >
        <FaSearch></FaSearch>
      </Button>
      <Button
        size="lg"
        className="hidden md:flex bg-mainColor text-white font-medium"
      >
        Search
      </Button>
      <Button
        size="lg"
        isIconOnly
        className="flex md:hidden bg-secondaryColor text-white font-medium"
      >
        <FaFilter></FaFilter>
      </Button>
      <Button
        size="lg"
        className="hidden md:flex bg-secondaryColor text-white font-medium"
      >
        Filter
      </Button>
    </form>
  );
}
