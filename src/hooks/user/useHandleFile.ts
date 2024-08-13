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

  const handleFiles = useCallback(
    async (files: File[]): Promise<void> => {
      setUploadStatus("uploading");

      try {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("file", file);
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
      setFilesData(response.data);
      console.log("Fetched files:", response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, [apiClient, cell_test_id, patient_id]);

  return { handleFiles, uploadStatus, fetchFiles, filesData };
};

export default useHandleFiles;
