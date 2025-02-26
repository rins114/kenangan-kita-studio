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
import React, { useEffect, useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";

export default function SearchBar({ searchParams, setSearchParams }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Data untuk dropdown bentuk peraturan
  const bentukPeraturan = [
    { label: "PERWAL", value: "perwal" },
    { label: "PERDA", value: "perda" },
    { label: "KEPWAL", value: "kepwal" },
  ];

  // State untuk menyimpan nilai filter
  const [filters, setFilters] = useState({
    bentuk: "",
    nomorPeraturan: "",
    tahunPeraturan: "",
  });

  const handleFilterChange = (name, value) => {
    console.log(name, value);
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilter = () => {
    setSearchParams((prev) => ({
      ...prev,
      title: "",
      bentuk: "",
      nomor: "",
      tahun: "",
    }));
  };

  const handleSearch = () => {
    console.log("Filter yang diterapkan:", filters);
    onClose();
  };

  useEffect(() => {
    console.log("searchParams", searchParams);
  }, [searchParams]);

  return (
    <>
      <form
        action=""
        className="flex flex-row gap-1 md:gap-5 w-full max-w-[90rem] p-5 bg-white border-1 rounded-2xl z-[20] text-montserrat shadow-md"
      >
        <Input
          value={searchParams.title}
          onChange={(e) =>
            setSearchParams((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
          size="md"
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
        {/* <Button
          size="md"
          isIconOnly
          className="flex md:hidden bg-mainColor text-white font-medium"
        >
          <FaSearch />
        </Button> */}
        {/* <Button
          size="lg"
          className="hidden md:flex bg-mainColor text-white font-medium"
        >
          Search
        </Button> */}
        <Button
          size="md"
          isIconOnly
          className="flex md:hidden bg-secondaryColor text-white font-medium"
          onClick={onOpen}
        >
          <FaFilter />
        </Button>
        <Button
          size="md"
          className="hidden md:flex bg-secondaryColor text-white font-medium"
          onClick={onOpen}
        >
          Adv. Search
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
                    selectedKeys={
                      searchParams.bentuk ? [searchParams.bentuk] : []
                    }
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
                    value={searchParams.nomor}
                    onChange={(e) =>
                      handleFilterChange("nomor", e.target.value)
                    }
                  />

                  <Input
                    label="Tahun Peraturan"
                    labelPlacement="outside"
                    placeholder="Masukkan Tahun peraturan"
                    variant="bordered"
                    value={searchParams.tahun}
                    onChange={(e) =>
                      handleFilterChange("tahun", e.target.value)
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="warning"
                  variant="light"
                  onPress={handleClearFilter}
                >
                  Bersihkan
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button
                  color="primary"
                  onPress={handleSearch}
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
