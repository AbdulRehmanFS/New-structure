/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import ProgressComponent from "./progressbar";
import { theme } from "util/theme";
import { ContentUploadIcon } from "util/svgFile";
import { errorMessage } from "util/commonSection";
import uploadFileToS3 from "service/S3upload";

const ContentUpload = (props) => {
  const {
    onChange,
    error,
    helperText,
    value = null,
    bg,
    disabled = false,
    size = "mid",
    name,
  } = props;
  const [selectedFileUrl, setSelectedFileUrl] = useState(value);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState(null); // audio or video
  const videoRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (value) {
      const url = value?.url ?? value;
      setFileType(url.includes("video"));
    }
  }, [value]);

  const handleUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const contentType = file?.type.split("/")[0];
    setFileType(contentType);
    const upload_type = contentType === "video" ? 3 : 2;
    const result = await uploadFileToS3(file, upload_type, setUploadPercent);
    if (result?.status === 200) {
      const { url = "", key_name = "" } = result?.data || {};

      const video = document.createElement("video");
      video.src = url; // Directly use the uploaded video URL

      video.onloadedmetadata = () => {
        const { videoWidth, videoHeight, duration } = video;
        const ratio = videoWidth / videoHeight;
        const output = {
          key_name,
          url,
          ratio,
          duration,
        };
       
        onChange(output); // Update the parent component or state
      };

      setSelectedFileUrl(url);
    } else errorMessage(result?.message);
    inputRef.current.value = null;
    setLoading(false);
  };

  const handleClearImage = () => {
    videoRef.current.value = null;
    setSelectedFileUrl(null);
    onChange(null);
    onChange(null);
  };

  return (
    <FileUploadField
      hasError={error}
      bg={bg}
      size={size}
      disabled={disabled}
      fileType={fileType}
    >
      <input
        ref={inputRef}
        accept="video/*, audio/*"
        id={`contained-button-file+${name}`}
        multiple
        type="file"
        onChange={handleUpload}
        disabled={disabled}
      />
      {selectedFileUrl === null ? (
        <div className="field-style">
          {uploadPercent > 0 && uploadPercent < 100 ? (
            <div className="percent-loader flex-center">
              <ProgressComponent
                type="circle"
                percent={uploadPercent}
                size={size === "mid" ? "small" : 40}
              />
            </div>
          ) : loading ? (
            <div className="percent-loader flex-center">Loading...</div>
          ) : (
            <label
              htmlFor={`contained-button-file+${name}`}
              className="upload-image-label"
            >
              {props?.placeholder ?? "Upload Images"}
              <ContentUploadIcon width="12px" height="18px" />
            </label>
          )}
        </div>
      ) : (
        <div className="container">
          <video
            ref={videoRef}
            muted
            src={selectedFileUrl}
            loop
            height="100%"
            width="100%"
            controls
            className="video-tag"
          />
          {!disabled && (
            <div className="closeIcon" onClick={handleClearImage} aria-hidden>
              &#x2715;
            </div>
          )}
        </div>
      )}
      {error && <div className="error-content">{helperText}</div>}
    </FileUploadField>
  );
};

export default ContentUpload;

const FileUploadField = styled.div`
  color: ${theme.greyText};
  input {
    display: none !important;
  }
  label {
    display: flex;
    align-items: center;
    padding: 0 12px;
    width: 100%;
    cursor: ${(props) => (props?.disabled ? "no-drop" : "pointer")};
    justify-content: ${(props) =>
      props.size === "mid" ? "center" : "space-between"};
    gap: ${(props) => (props.size === "mid" ? "10px" : "0px")};
  }
  .field-style {
    width: 100%;
    background: ${(props) => props.bg || theme.greyButton};
    // border: 1px solid
    //   ${(props) => (props.hasError ? theme.primaryColor : "transparent")};
    border-radius: 10px;
    height: ${(props) => (props.size === "mid" ? "140px" : "45px")};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container {
    width: 100%;
    background: ${(props) => props.bg || theme.greyButton};
    // border: 1px solid
    //   ${(props) => (props.hasError ? theme.primaryColor : "transparent")};
    border-radius: 10px;
    height: ${(props) => (props.fileType  ? "350px" : "100px")};
    padding: 10px 14px;
    position: relative;
    .video-tag {
      object-fit: contain;
    }
  }
  .closeIcon {
    position: absolute;
    right: 14px;
    top: 6px;
    cursor: pointer;
  }
`;
