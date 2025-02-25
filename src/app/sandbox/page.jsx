"use client";
import ImageCropper from "@/components/molecules/ImageCropper";
import React, { useEffect, useState } from "react";

export default function SandBoxPage() {
  const [blob, setBlob] = useState(null);
  const [inputImg, setInputImage] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);

  const getBlob = (blob) => {
    setBlob(blob);
  };

  const onInputChange = (e) => {
    // convert image file to base64 string
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        setInputImage(reader.result);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  function blobToFile(blob, fileName) {
    return new File([blob], fileName, { type: blob?.type });
  }

  const handleSubmitImage = (e) => {
    setCroppedImage(blob);
  };

  useEffect(() => {
    console.log(blob);
    const file = blobToFile(blob, "Image 1");
    console.log(file);
    setCroppedImage(file);
  }, [blob]);
  return (
    <div className="flex">
      <div className="p-5">
        <form onSubmit={handleSubmitImage}>
          <input type="file" accept="image/*" onChange={onInputChange} />
          {inputImg && (
            <div className="w-[50rem] h-[40rem]">
              <ImageCropper getBlob={getBlob} inputImg={inputImg} />
            </div>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
