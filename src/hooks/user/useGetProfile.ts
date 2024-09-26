import useGetData from "../generic/useGetData";

export interface UserProfile {
  username: string;
  email: string;
  full_name: string;
  address: string;
  blood_group: string;
  gender: string;
  contact_no: string;
}

const useGetProfile = () => {
  return useGetData<UserProfile>("/me", "userProfile");
};

export default useGetProfile;
