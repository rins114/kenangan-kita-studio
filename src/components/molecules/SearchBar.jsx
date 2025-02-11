import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Data untuk dropdown bentuk peraturan
  const bentukPeraturan = [
    { label: "Undang-Undang", value: "UU" },
    { label: "Peraturan Pemerintah", value: "PP" },
    { label: "Peraturan Presiden", value: "PERPRES" },
    { label: "Peraturan Menteri", value: "PERMEN" },
    { label: "Keputusan Presiden", value: "KEPRES" },
  ];

  // Generate tahun dari 1945-2024
  const years = Array.from({ length: 2024 - 1945 + 1 }, (_, index) => ({
    label: String(1945 + index),
    value: String(1945 + index),
  })).reverse(); // Urutkan dari yang terbaru

  // State untuk menyimpan nilai filter
  const [filters, setFilters] = useState({
    bentuk: "",
    nomorPeraturan: "",
    tahunPeraturan: "",
  });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    console.log("Filter yang diterapkan:", filters);
    onClose();
  };

  return (
    <>
      <form
        action=""
        className="flex flex-row gap-5 w-3/4 max-w-[90rem] p-5 bg-white border-1 rounded-2xl z-[20] text-montserrat shadow-md"
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
          startContent={<FaSearch />}
        />
        <Button
          size="lg"
          isIconOnly
          className="flex md:hidden bg-mainColor text-white font-medium"
        >
          <FaSearch />
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
          className="flex md:hidden bg-gray-500 text-white font-medium"
          onClick={onOpen}
        >
          <FaFilter />
        </Button>
        <Button
          size="lg"
          className="hidden md:flex bg-gray-500 text-white font-medium"
          onClick={onOpen}
        >
          Filter
        </Button>
      </form>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        placement="center"
        className="pt-1"
      >
        <ModalContent
          style={{
            zIndex: 1050,
            marginTop: "11rem", // Memberi jarak dari navbar
          }}
        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-3">
                Filter Pencarian
              </ModalHeader>
              <ModalBody className="px-6">
                <div className="space-y-8 gap-3">
                  <Select
                    label="Bentuk Peraturan"
                    labelPlacement="outside"
                    placeholder="Pilih bentuk peraturan"
                    variant="bordered"
                    selectedKeys={filters.bentuk ? [filters.bentuk] : []}
                    onChange={(e) =>
                      handleFilterChange("bentuk", e.target.value)
                    }
                  >
                    {bentukPeraturan.map((bentuk) => (
                      <SelectItem key={bentuk.value} value={bentuk.value}>
                        {bentuk.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    label="Nomor Peraturan"
                    labelPlacement="outside"
                    placeholder="Masukkan nomor peraturan"
                    variant="bordered"
                    value={filters.nomorPeraturan}
                    onChange={(e) =>
                      handleFilterChange("nomorPeraturan", e.target.value)
                    }
                  />

                  <Select
                    label="Tahun Peraturan"
                    labelPlacement="outside"
                    placeholder="Pilih tahun peraturan"
                    variant="bordered"
                    selectedKeys={
                      filters.tahunPeraturan ? [filters.tahunPeraturan] : []
                    }
                    onChange={(e) =>
                      handleFilterChange("tahunPeraturan", e.target.value)
                    }
                  >
                    {years.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Batal
                </Button>
                <Button
                  color="primary"
                  onClick={handleSearch}
                  className="bg-mainColor"
                >
                  Cari
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
