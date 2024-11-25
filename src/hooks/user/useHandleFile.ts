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
  const BASE_URL = "http://127.0.0.1:8000";

  // Upload files to the server and update the local state
  const handleFiles = useCallback(
    async (files: File[]): Promise<void> => {
      if (!files || files.length === 0) {
        setUploadStatus("Upload failed: No files selected");
        return;
      }

      setUploadStatus("Uploading...");

      try {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        const url = `/patients/${patient_id}/cell_tests/${cell_test_id}/data_images`;
        const response = await apiClient.post<FileData[]>(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setUploadStatus("Upload successful");
        const uploadedFiles = response.data.map((file) => ({
          ...file,
          image: `${BASE_URL}/${file.image}`,
        }));
        setFilesData((prevFiles) => [...prevFiles, ...uploadedFiles]);
      } catch (error) {
        setUploadStatus("Upload failed");
        console.error("Error uploading files:", error);
      }
    },
    [apiClient, cell_test_id, patient_id, BASE_URL]
  );

  const fetchFiles = useCallback(async (): Promise<void> => {
    try {
      const url = `/patients/${patient_id}/cell_tests/${cell_test_id}/data_images`;
      const response = await apiClient.get<FileData[]>(url);

      const updatedFilesData = response.data.map((file) => ({
        ...file,
        image: `${BASE_URL}/${file.image}`,
      }));

      setFilesData(updatedFilesData);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, [apiClient, cell_test_id, patient_id, BASE_URL]);

  const deleteFileFromServer = useCallback(
    async (image_id: number): Promise<void> => {
      try {
        const url = `/patients/${patient_id}/cell_tests/${cell_test_id}/data_images/${image_id}`;
        await apiClient.delete(url); 

        setFilesData((prevFiles) => prevFiles.filter((file) => file.id !== image_id));
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    },
    [apiClient, cell_test_id, patient_id]
  );

  return { handleFiles, uploadStatus, fetchFiles, filesData, setFilesData, deleteFileFromServer };
};

export default useHandleFiles;
