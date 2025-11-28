/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { Modal } from "antd";
import Cropper from "react-easy-crop";
import { ContentUploadIcon } from "@utils/svgFile";
import ButtonComponent from "@components/Button";
import { theme } from "@utils/theme";
import { handleUploadFile } from "@utils/constant";
import { errorMessage } from "@utils/helpers";

const FileUpload = ({
  onChange,
  error,
  helperText,
  value,
  name = "fileName",
  aspectRatio = 1,
  bg,
}) => {
  const [selectedFile, setSelectedFile] = useState(value);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const fileRef = useRef(null);

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImg);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSetModal = () => setOpenModal((prev) => !prev);

  const handleSubmit = async () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("upload_type", 1);
    formData.append("content", croppedImage);
    const res = await handleUploadFile(formData);
    if (res?.status === 200) {
      const { url = null, key_name = "" } = res?.data || {};
      setImage(res?.data ?? {});
      onChange({ url, key_name, name: selectedFile?.name });
      handleSetModal();
    } else {
      setSelectedFile(null);
      fileRef.current.value = null;
      errorMessage(res?.message || "Failed to upload image");
    }
    setLoader(false);
  };

  const imageUploader = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const img = new Image();
        img.src = reader.result;
        img.onload = function () {
          const width = img.width;
          const height = img.height;

          if (name === "cover_art") {
            if (width >= 1400 && height >= 1400) {
              setImage(reader.result);
            } else {
              errorMessage(
                "Cover Art image dimensions should be square and at least 1400 x 1400 pixels in .JPEG or .PNG format."
              );
              setImage(null);
              setSelectedFile(null);
              handleSetModal();
              return;
            }
          } else if (name === "event_icon") {
            if (width >= 1400 && height >= 1400) {
              setImage(reader.result);
            } else {
              errorMessage(
                "Event Icon dimensions should be at least 1400 x 1400 pixels in .JPEG or .PNG format and must not exceed 3000 x 3000 pixels."
              );
              setImage(null);
              setSelectedFile(null);
              handleSetModal();
              return;
            }
          } else {
            if (width === 3000 && height === 1750) {
              setImage(reader.result);
              setCrop({ x: 100, y: 100 });
            } else {
              setImage(null);
              errorMessage(
                "Banner image dimensions should be horizontal and must not exceed 3000 x 1750 pixels in .JPEG or .PNG format."
              );
              handleSetModal();
              handleCancelSelection();
              return;
            }
          }
          setOpenModal(true);
        };
      };

      reader.readAsDataURL(file);
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleInputClear = (e) => {
    e.preventDefault();
    setSelectedFile(null);
    setImage(null);
    fileRef.current.value = null;
    onChange(null);
  };

  const handleCancelSelection = () => {
    fileRef.current.value = null;
    setSelectedFile(null);
    setImage(null);
    setOpenModal(false);
  };

  return (
    <div className={`w-full ${error ? "border border-red-500" : ""}`}>
      <input
        ref={fileRef}
        accept="image/*"
        id={`contained-button-file+${name}`}
        type="file"
        onChange={imageUploader}
        className="hidden"
      />
      <label
        htmlFor={`contained-button-file+${name}`}
        className="cursor-pointer relative block"
      >
        {selectedFile ? (
          <div
            className={`h-[150px] p-0.5 flex justify-center ${
              bg || theme.backgroundGray
            }`}
            style={{ backgroundColor: bg || theme.backgroundGray }}
          >
            <img
              src={image?.url ?? selectedFile}
              width="auto"
              height="100%"
              alt=""
              className="object-contain"
            />
            <span
              className="absolute right-2 top-1 z-10 cursor-pointer text-white text-xl"
              onClick={handleInputClear}
            >
              &#x2715;
            </span>
          </div>
        ) : (
          <div
            className={`rounded-md h-[45px] flex justify-between items-center px-3 ${
              bg || theme.backgroundGray
            }`}
            style={{ backgroundColor: bg || theme.backgroundGray }}
          >
            <span className="text-white text-[15px]">
              {name === "cover_art" ? "Cover Art" : "Upload Images"}
            </span>
            <ContentUploadIcon />
          </div>
        )}
      </label>
      {openModal && image && (
        <Modal
          open={openModal}
          onCancel={handleCancelSelection}
          footer={null}
          width={520}
        >
          <div className="flex flex-col">
            <div className="h-[250px] relative">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                style={{ containerClassName: "cropper-container" }}
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <ButtonComponent
                onClick={handleSubmit}
                text="Submit"
                height="40px"
                width="90px"
                loading={loader}
              />
              <ButtonComponent
                onClick={handleCancelSelection}
                text="Cancel"
                height="40px"
                width="90px"
              />
            </div>
          </div>
        </Modal>
      )}
      {error && <div className="text-red-500 text-sm mt-1">{helperText}</div>}
    </div>
  );
};

const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      ctx.drawImage(
        img,
        croppedAreaPixels.x * scaleX,
        croppedAreaPixels.y * scaleY,
        croppedAreaPixels.width * scaleX,
        croppedAreaPixels.height * scaleY,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob(
        (file) => {
          resolve(file);
        },
        "image/jpeg",
        0.6
      );
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
};

export default FileUpload;

