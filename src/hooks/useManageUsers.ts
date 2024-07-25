import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  address: string;
  blood_group: string;
  gender: string;
  contact_no: string;
  password: string;
  is_admin: boolean;
  is_hospital_admin: boolean;
  hospital_id : number;
}

const useManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const fetchUsers = async () => {
    try {
      const token = getAccessToken();
      const response = await apiClient.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  const deleteUser = async (user_id: number) => {
    try {
      const token = getAccessToken();
      await apiClient.delete(`/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== user_id));
    } catch (error) {
      setError("Failed to delete user");
    }
  };

  const updateUser = async (
    user_id: number,
    updatedUser: Partial<User>
  ) => {
    try {
      const token = getAccessToken();
      const response = await apiClient.patch(
        `/users/${user_id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((user) =>
          user.id === user_id ? { ...user, ...response.data } : user
        )
      );
    } catch (error) {
      setError("Failed to update user");
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    deleteUser,
    updateUser,
  };
};

export default useManageUsers;
