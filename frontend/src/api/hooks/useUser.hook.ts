import { useState, useEffect } from "react";
import { api } from "../../api/configs/axios";
import { LocalStorageService } from "../../services/local-storage.service";
import { UserModel } from "@/models/user.model";
import { AxiosError } from "axios";

interface CreateUserDto {
  name: string;
  address: string;
  phoneNumber: string;
}

interface Response {
  data: UserModel | null;
  errors?: string[];
}

export function useUser() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    setIsLogin(LocalStorageService.hasUser());
  }, []);

  const createUser = async (data: CreateUserDto): Promise<Response> => {
    try {
      const response = await api.post<UserModel>("/users", data);
      LocalStorageService.saveUser(response.data);
      setIsLogin(true);

      return { data: response.data };
    } catch (error) {
      if (error instanceof AxiosError) {
        return { data: null, errors: error.response?.data.errors };
      }

      return { data: null };
    }
  };

  const getUserByPhoneNumber = async (
    phoneNumber: string
  ): Promise<Response> => {
    try {
      const response = await api.get<UserModel>(`/users/${phoneNumber}`);
      LocalStorageService.saveUser(response.data);
      setIsLogin(true);

      return { data: response.data };
    } catch (error) {
      if (error instanceof AxiosError) {
        return { data: null, errors: error.response?.data.errors };
      }

      return { data: null };
    }
  };

  const logout = (): void => {
    LocalStorageService.removeUser();
    setIsLogin(false);
  };

  return {
    isLogin,
    createUser,
    getUserByPhoneNumber,
    logout,
  };
}
