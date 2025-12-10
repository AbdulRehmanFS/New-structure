/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useRef, useState } from "react";
import { styled } from "styled-components";
import Cropper from "react-easy-crop";

import { ContentUploadIcon } from "util/svgFile";
import Button from "./button";
import { theme } from "util/theme";
import { handleUploadFile } from "util/constant";
import { errorMessage } from "util/commonSection";

const CustomizeFileUpload = (props) => {
  const { onChange, error, helperText, value, name = "fileName", aspectRatio = 1, bg } = props;

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

  const handleSetModal = () => setOpenModal((pre) => !pre);

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
      errorMessage(res);
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
            }
          } else if (name === "event_icon") {
            if (width >= 1400 && height >= 1400) {
              setImage(reader.result);
            } else {
              errorMessage(
                "Event Icon dimensions should be at least 1400 x 1400 pixels in .JPEG or .PNG format and must not exceed 3000 x 3000 pixels. This image should highlight the individual/s that will be showcased in the Live Event.  "
              );
              setImage(null);
              setSelectedFile(null);
              handleSetModal();
            }
          } else {
            if (width == 3000 && height == 1750) {
              setImage(reader.result);
              setCrop({
                x: 100,
                y: 100
              });
            } else {
              setImage(null);
              errorMessage(
                "Banner image dimensions should be horizontal and must not exceed 3000 x 1750 pixels in .JPEG or .PNG format. "
              );
              handleSetModal();
              handleCancelSelection();
            }
          }
        };
      };

      reader.readAsDataURL(file);
      setOpenModal(true);
      setSelectedFile(event.target.files[0]);
      onChange(event.target.files);
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
    <FileUploadField hasError={error} bg={bg} openModal={openModal}>
      <input
        ref={fileRef}
        accept="image/*" //, video/*
        id={`contained-button-file+${name}`}
        multiple
        type="file"
        onChange={imageUploader}
      />
      <label htmlFor={`contained-button-file+${name}`} className="cover-art-label">
        {selectedFile ? (
          <div className="image-section">
            <img src={image?.url ?? selectedFile} width="auto" height="100%" alt="" />
            <span className="clear-icon" onClick={handleInputClear}>
              &#x2715;
            </span>
          </div>
        ) : (
          <div className="label-section">
            <div aria-hidden>{props?.placeholder ?? "Upload Images"}</div>
            <ContentUploadIcon />
          </div>
        )}
      </label>
      {openModal && image && (
        <CropperWrapper className="cropper-wrapper">
          <div className="cropper">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              // objectFit={aspectRatio == 1 && "contain" }
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              style={{ containerClassName: "cropper-container" }}
            />
          </div>
          <div className="cropper-submit-btn">
            <Button
              onClick={handleSubmit}
              text="Submit"
              height="40px"
              width="90px"
              loading={loader}
              htmlType="button"
            />
            <Button onClick={handleCancelSelection} text="Cancel" height="40px" width="90px" />
          </div>
        </CropperWrapper>
      )}
      {error && <div>{helperText}</div>}
    </FileUploadField>
  );
};
export default CustomizeFileUpload;

const CropperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .cropper {
    height: 250px;
    position: relative;
  }
  .cropper-submit-btn {
    justify-content: end;
    gap: 8px;
    margin: 5px;
    display: flex;
  }
`;

const FileUploadField = styled.div`
  color: ${theme.greyText};
  width: 100%;
  input {
    display: none !important;
  }
  label {
    cursor: pointer;
    position: relative;
  }
  .image-section {
    height: ${(props) => (props.openModal ? "100%" : "150px")};
    padding: 2px;
    display: flex;
    justify-content: center;
    background: ${(props) => (props.bg ? props.bg : theme.backgroundGray)};
  }
  .label-section {
    border-radius: 6px;
    background: ${(props) => (props.bg ? props.bg : theme.backgroundGray)};
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 12px;
  }
  .clear-icon {
    position: absolute;
    right: 8px;
    z-index: 999;
  }
`;

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
      ); //reduced the size
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
};
