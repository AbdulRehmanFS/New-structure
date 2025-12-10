import { useRef, useState } from "react";
import styled from "styled-components";
import { errorMessage } from "util/commonSection";
import { handleUploadFile } from "util/constant";
import { ContentUploadIcon } from "util/svgFile";
import { theme } from "util/theme";

const SRTFileUpload = (props) => {
  const { onChange, error, helperText, value, name = "fileName", bg } = props;


  const [selectedFile, setSelectedFile] = useState(value);
  const [loader, setLoader] = useState(false);
  const fileRef = useRef(null);

  const fileUploader = async (event) => {
    const file = event.target.files[0];
    const allowedExtensions = ["srt", "vtt", "scc"];

    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        errorMessage("Only srt,vtt,scc files are allowed.");
        setSelectedFile(null);
        fileRef.current.value = null;
        onChange(null); // Notify parent that no valid file is selected
        return;
      }

      setSelectedFile(file);
      setLoader(true);

      // Prepare the file for upload
      const formData = new FormData();
      formData.append("upload_type", 1);
      formData.append("content", file);

      // Upload the file and handle the response
      const res = await handleUploadFile(formData);
      setLoader(false);

      if (res?.status === 200) {
        const { url = null, key_name = "" } = res?.data || {};
        onChange({ url, key_name, name: file.name }); // Pass the file info to parent
      } else {
        errorMessage(res);
        setSelectedFile(null);
        fileRef.current.value = null;
        onChange(null);
      }
    }
  };

  const handleInputClear = (e) => {
    e.preventDefault();
    setSelectedFile(null);
    fileRef.current.value = null;
    onChange(null); // Notify parent that file has been cleared
  };

  return (
    <FileUploadField hasError={error} bg={bg}>
      <input
        ref={fileRef}
        accept=".srt,.vtt,pdf,.scc"
        id={`contained-button-file+${name}`}
        type="file"
        key={value}
        onChange={fileUploader} // Handle file upload
      />
      <label htmlFor={`contained-button-file+${name}`} className="file-upload-label">
        {selectedFile ? (
          <div className="file-info">
            <span>{selectedFile.name}</span>
            <span className="clear-icon" onClick={handleInputClear}>
              &#x2715;
            </span>
          </div>
        ) : (
          <div className="label-section">
            <div aria-hidden>{props?.placeholder ?? "Upload subtitle file"}</div>
            <ContentUploadIcon />
          </div>
        )}
      </label>
      {loader && <div>Uploading...</div>}
      {error && <div>{helperText}</div>}
    </FileUploadField>
  );
};

  
  export default SRTFileUpload;
  
  const FileUploadField = styled.div`
    color: ${theme.greyText};
    width: 100%;
    padding:10px 0;
    input {
      display: none !important;
      
    }
    label {
      cursor: pointer;
      position: relative;
    
    }
    .file-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
      background: ${(props) => (props.bg ? props.bg : theme.backgroundGray)};
      border-radius: 6px;
    }
    .label-section {
      border-radius: 6px;
      background: ${(props) => (props.bg ? props.bg : theme.backgroundGray)};
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 20px 0 12px;
      
    }
    .clear-icon {
      cursor: pointer;
      padding: 0 5px;
    }
    .file-url {
      margin-top: 10px;
      a {
        color: ${theme.linkColor};
        text-decoration: none;
      }
    }
  `;
  