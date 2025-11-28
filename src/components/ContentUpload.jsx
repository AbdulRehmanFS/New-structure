/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Progress } from "antd";
import { theme } from "@utils/theme";
import { ContentUploadIcon } from "@utils/svgFile";
import uploadFileToS3 from "@services/S3upload";
import { errorMessage } from "@utils/helpers";

const ContentUpload = ({
  onChange,
  error,
  helperText,
  value = null,
  bg,
  disabled = false,
  size = "mid",
  name,
}) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState(value);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState(null);
  const videoRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (value) {
      const url = value?.url ?? value;
      setFileType(url?.includes?.("video"));
    }
  }, [value]);

  const handleUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (!file) {
      setLoading(false);
      return;
    }
    const contentType = file?.type.split("/")[0];
    setFileType(contentType);
    const upload_type = contentType === "video" ? 3 : 2;
    const result = await uploadFileToS3(file, upload_type, setUploadPercent);
    if (result?.status === 200) {
      const { url = "", key_name = "" } = result?.data || {};

      if (contentType === "video") {
        const video = document.createElement("video");
        video.src = url;

        video.onloadedmetadata = () => {
          const { videoWidth, videoHeight, duration } = video;
          const ratio = videoWidth / videoHeight;
          const output = {
            key_name,
            url,
            ratio,
            duration,
          };
          onChange(output);
        };
      } else {
        const audio = document.createElement("audio");
        audio.src = url;
        audio.onloadedmetadata = () => {
          const { duration } = audio;
          const output = {
            key_name,
            url,
            duration,
          };
          onChange(output);
        };
      }

      setSelectedFileUrl(url);
    } else {
      errorMessage(result?.message || "Failed to upload file");
    }
    inputRef.current.value = null;
    setLoading(false);
  };

  const handleClearImage = () => {
    videoRef.current.value = null;
    setSelectedFileUrl(null);
    onChange(null);
  };

  const heightClass = size === "mid" ? "h-[140px]" : "h-[45px]";
  const containerHeight = fileType ? "h-[350px]" : "h-[100px]";

  return (
    <div className={`w-full ${error ? "border border-red-500" : ""}`}>
      <input
        ref={inputRef}
        accept="video/*, audio/*"
        id={`contained-button-file+${name}`}
        type="file"
        onChange={handleUpload}
        disabled={disabled}
        className="hidden"
      />
      {selectedFileUrl === null ? (
        <div
          className={`w-full rounded-[10px] ${heightClass} flex justify-center items-center ${
            bg || theme.buttonColor
          }`}
          style={{ backgroundColor: bg || theme.buttonColor }}
        >
          {uploadPercent > 0 && uploadPercent < 100 ? (
            <div className="flex items-center justify-center">
              <Progress
                type="circle"
                percent={uploadPercent}
                size={size === "mid" ? 60 : 40}
                strokeColor={theme.primaryColor}
              />
            </div>
          ) : loading ? (
            <div className="text-white">Loading...</div>
          ) : (
            <label
              htmlFor={`contained-button-file+${name}`}
              className={`flex items-center gap-2.5 cursor-pointer ${
                size === "mid" ? "justify-center" : "justify-between px-3"
              }`}
            >
              <span className="text-white text-[15px]">
                {name === "uploadTrailer" ? "Upload Trailer" : "Upload Content Here"}
              </span>
              <ContentUploadIcon width="12px" height="18px" />
            </label>
          )}
        </div>
      ) : (
        <div
          className={`w-full rounded-[10px] ${containerHeight} p-2.5 relative`}
          style={{ backgroundColor: bg || theme.buttonColor }}
        >
          {fileType === "video" ? (
            <video
              ref={videoRef}
              muted
              src={selectedFileUrl}
              loop
              height="100%"
              width="100%"
              controls
              className="object-contain"
            />
          ) : (
            <audio src={selectedFileUrl} controls className="w-full" />
          )}
          {!disabled && (
            <div
              className="absolute right-3.5 top-1.5 cursor-pointer text-white text-xl"
              onClick={handleClearImage}
              aria-hidden
            >
              &#x2715;
            </div>
          )}
        </div>
      )}
      {error && <div className="text-red-500 text-sm mt-1">{helperText}</div>}
    </div>
  );
};

export default ContentUpload;

