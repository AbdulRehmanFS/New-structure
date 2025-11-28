/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { ContentUploadIcon } from "@utils/svgFile";
import { theme } from "@utils/theme";
import { handleUploadFile } from "@utils/constant";
import { errorMessage } from "@utils/helpers";

const SRTFileUpload = ({ onChange, error, helperText, value, name = "fileName", bg }) => {
  const [selectedFile, setSelectedFile] = useState(value);
  const [loader, setLoader] = useState(false);
  const fileRef = useRef(null);

  const fileUploader = async (event) => {
    const file = event.target.files[0];
    const allowedExtensions = ["srt", "vtt", "scc"];

    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        errorMessage("Only srt, vtt, scc files are allowed.");
        setSelectedFile(null);
        fileRef.current.value = null;
        onChange(null);
        return;
      }

      setSelectedFile(file);
      setLoader(true);

      const formData = new FormData();
      formData.append("upload_type", 1);
      formData.append("content", file);

      const res = await handleUploadFile(formData);
      setLoader(false);

      if (res?.status === 200) {
        const { url = null, key_name = "" } = res?.data || {};
        onChange({ url, key_name, name: file.name });
      } else {
        errorMessage(res?.message || "Failed to upload file");
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
    onChange(null);
  };

  return (
    <div className={`w-full py-2.5 ${error ? "border border-red-500" : ""}`}>
      <input
        ref={fileRef}
        accept=".srt,.vtt,.scc"
        id={`contained-button-file+${name}`}
        type="file"
        key={value}
        onChange={fileUploader}
        className="hidden"
      />
      <label
        htmlFor={`contained-button-file+${name}`}
        className="cursor-pointer relative block"
      >
        {selectedFile ? (
          <div
            className="flex justify-between items-center p-2 rounded-md"
            style={{ backgroundColor: bg || theme.backgroundGray }}
          >
            <span className="text-white text-sm">{selectedFile.name}</span>
            <span
              className="cursor-pointer px-1.5 text-white text-xl"
              onClick={handleInputClear}
            >
              &#x2715;
            </span>
          </div>
        ) : (
          <div
            className="rounded-md h-[45px] flex justify-between items-center px-3"
            style={{ backgroundColor: bg || theme.backgroundGray }}
          >
            <span className="text-white text-[15px]">Upload subtitle file</span>
            <ContentUploadIcon />
          </div>
        )}
      </label>
      {loader && <div className="text-white text-sm mt-1">Uploading...</div>}
      {error && <div className="text-red-500 text-sm mt-1">{helperText}</div>}
    </div>
  );
};

export default SRTFileUpload;

