import { useState, useCallback } from "react";
import useApiClientUser from "../../services/api-client-user";

interface FileData {
  id: number;
  image: string;
  cell_test_id: string;
}

const useHandleFiles = (
  patient_id: string,
  cell_test_id: string,
  hospital?: string | number
) => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [filesData, setFilesData] = useState<FileData[]>([]);
  const apiClient = useApiClientUser({ hospital });

  // Base URL for accessing media files
  const BASE_URL = "http://127.0.0.1:8000";

  const handleFiles = useCallback(
    async (files: File[]): Promise<void> => {
      setUploadStatus("uploading");

      try {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });

        const url = `/patients/${patient_id}/cell_tests/${cell_test_id}/data_images`;

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
    },
    [apiClient, cell_test_id, patient_id]
  );

  const fetchFiles = useCallback(async (): Promise<void> => {
    try {
      const url = `/patients/${patient_id}/cell_tests/${cell_test_id}/data_images`;
      const response = await apiClient.get<FileData[]>(url);

      // Update each file's image path to a full URL
      const updatedFilesData = response.data.map((file) => ({
        ...file,
        image: `${BASE_URL}/${file.image}`,
      }));

      setFilesData(updatedFilesData);
      console.log("Fetched files:", updatedFilesData);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, [apiClient, cell_test_id, patient_id, BASE_URL]);

  return { handleFiles, uploadStatus, fetchFiles, filesData };
};

export default useHandleFiles;
