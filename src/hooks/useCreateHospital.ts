import usePostData from "./usePostData";

interface Hospital {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface CreateHospitalResult {
  isLoading: boolean;
  error: string;
  createHospital: (hospitalData: Hospital) => Promise<void>;
}

const useCreateHospital = (): CreateHospitalResult => {
  const {
    isLoading: isPosting,
    postData,
    error,
  } = usePostData<void>("/hospital");

  const createHospital = async (hospitalData: Hospital): Promise<void> => {
    try {
      await postData(hospitalData);
    } catch (error) {
      console.error("Error creating hospital:", error);
    }
  };

  return {
    isLoading: isPosting,
    error,
    createHospital,
  };
};

export default useCreateHospital;