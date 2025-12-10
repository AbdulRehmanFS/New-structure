import { constant, folderName } from "util/constant";
import store from "store/reduxStore";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const uploadFileToS3 = async (file, upload_type, setUploadProgress = () => {}) => {
  try {
    const folder = folderName[upload_type] ?? constant.PROFILE_FOLDER;
    const fileName = file.name.split(".");
    const user_id = store.getState()?.signIn?.data?._id;

    // First initiate multipart upload
    const initiateResponse = await axios.post(`${API_URL}/content/initiate-upload`, {
      key: `${user_id}/${folder}/media-${Date.now()}.${fileName[fileName.length - 1]}`,
      content_type: file.type
    });

    if (!initiateResponse?.data?.data) {
      throw new Error("Failed to initiate upload");
    }

    const uploadId = initiateResponse.data.data;
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
    const totalParts = Math.ceil(file.size / CHUNK_SIZE);
    const parts = [];

    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      // Get presigned URL for this part
      const urlResponse = await axios.post(`${API_URL}/content/upload-chunk`, {
        file_name: initiateResponse.data.key,
        part_number: partNumber,
        upload_id: uploadId
      });

      if (!urlResponse?.data?.data) {
        throw new Error("Failed to get upload URL");
      }

      const presignedUrl = urlResponse.data.data;

      // Upload the chunk directly to S3 using the presigned URL
      const start = (partNumber - 1) * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const uploadResponse = await axios.put(presignedUrl, chunk, {
        headers: {
          "Content-Type": file.type
        },
        onUploadProgress: (progressEvent) => {
          const percentForThisPart = (progressEvent.loaded / progressEvent.total) * 100;
          const overallPercent = Math.round(((partNumber - 1 + (percentForThisPart / 100)) / totalParts) * 100);
          setUploadProgress(overallPercent);
        }
      });

      parts.push({
        PartNumber: partNumber,
        ETag: uploadResponse.headers.etag
      });
    }

    // Complete the multipart upload
    const completeResponse = await axios.post(`${API_URL}/content/complete-upload`, {
      upload_id: uploadId,
      file_name: initiateResponse.data.key,
      parts: parts
    });

    if (!completeResponse?.data?.data) {
      throw new Error("Failed to complete upload");
    }

    const { key_name, url } = completeResponse.data.data;
    return { status: 200, data: { url, key_name } };
  } catch (error) {
    console.error("Upload Error:", error);
    return { status: 500, error };
  }
};

export default uploadFileToS3;
