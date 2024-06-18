import React, { useState, useEffect } from "react";
import {
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import apiClient from "../../services/api-client";

interface Hospital {
  id: string;
  name: string;
}

interface HospitalSelectProps {
  value: string | null;
  onChange: (hospitalId: string | null) => void;
  error?: string;
}

const HospitalSelect = ({ value, onChange, error }: HospitalSelectProps) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await apiClient.get("/hospital", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        setHospitals(response.data);
      } else {
        console.error("Failed to fetch hospitals:", response);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHospitalId = e.target.value;
    onChange(selectedHospitalId === "" ? null : selectedHospitalId);
  };

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor="hospital">Hospital</FormLabel>
      <Select
        id="hospital"
        name="hospital"
        value={value || ""}
        onChange={handleChange}
        placeholder="Select the hospital"
      >
        {hospitals.map((hospital) => (
          <option key={hospital.id} value={hospital.id}>
            {hospital.name}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default HospitalSelect;
