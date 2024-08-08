import { useState } from "react";
import useApiClientUser from "../../services/api-client-user";

const useFileUpload = (hospital?: string | number) => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const apiClient = useApiClientUser({ hospital });

  const uploadFiles = async (
    patient_id: string,
    cell_test_id: string,
    files: File[]
  ) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("data_images", file);
      });

      const url = `/patient/${patient_id}/cell_test/${cell_test_id}/data_images`;
      const response = await apiClient.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadStatus("Upload successful");
      console.log("Response:", response.data);
    } catch (error) {
      setUploadStatus("Upload failed");
      console.error("Error uploading files:", error);
    }
  };

  return { uploadFiles, uploadStatus };
};

export default useFileUpload;
