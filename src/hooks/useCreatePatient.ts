import usePostData from "./usePostData";

interface Patient {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
}

interface CreatePatientResult {
  isLoading: boolean;
  error: string;
  createPatient: (patientData: Patient) => Promise<void>;
}

const useCreatePatient = (): CreatePatientResult => {
  const {
    isLoading: isPosting,
    postData,
    error,
  } = usePostData<void>("/hospital/{hospital_id}/patient");

  const createPatient = async (patientData: Patient): Promise<void> => {
    try {
      await postData(patientData);
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  return {
    isLoading: isPosting,
    error,
    createPatient,
  };
};

export default useCreatePatient;
