import { create } from 'zustand';

interface SignUpFormState {
  formErrors: { [key: string]: string };
  signUp: (formData: {
    username: string,
    email: string,
    password: string,
    fullName: string,
    gender: string,
    contactNo: string,
    bloodGroup: string,
    address: string,
  }) => void;
}

export const useSignUpStore = create<SignUpFormState>((set) => ({
  formErrors: {},
  signUp: async (formData) => {
    set({ formErrors: {} });

    const errors: { [key: string]: string } = {};
    if (!formData.username) {
      errors.username = 'Username is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    if (!formData.fullName) {
      errors.fullName = 'Full name is required';
    }
    if (!formData.gender) {
      errors.gender = 'Gender is required';
    }
    if (!formData.contactNo) {
      errors.contactNo = 'Contact number is required';
    }
    if (!formData.bloodGroup) {
      errors.bloodGroup = 'Blood group is required';
    }
    if (!formData.address) {
      errors.address = 'Address is required';
    }

    if (Object.keys(errors).length > 0) {
      set({ formErrors: errors });
      return;
    }

    try {
      console.log('Form data:', formData);
      set({ formErrors: {} });
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }
}));
