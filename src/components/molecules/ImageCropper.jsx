import { getCroppedImg } from "@/utils/CropImage";
import React, { useState } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({ getBlob, inputImg }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  /* onCropComplete() will occur each time the user modifies the cropped area, 
    which isn't ideal. A better implementation would be getting the blob 
    only when the user hits the submit button, but this works for now  */
  const onCropComplete = async (_, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(inputImg, croppedAreaPixels);
    getBlob(croppedImage);
  };

  return (
    /* need to have a parent with `position: relative` 
    to prevent cropper taking up whole page */
    <div className="relative w-full h-full">
      <Cropper
        image={inputImg}
        crop={crop}
        zoom={zoom}
        aspect={2.6}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
  );
};

export default ImageCropper;
