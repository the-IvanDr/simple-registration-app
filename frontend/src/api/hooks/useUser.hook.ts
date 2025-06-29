import { useState, useEffect } from "react";
import { api } from "../../api/configs/axios";
import { LocalStorageService } from "../../services/local-storage.service";
import { UserModel } from "@/models/user.model";

interface CreateUserDto {
  name: string;
  address: string;
  phoneNumber: string;
}

export function useUser() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    setIsLogin(LocalStorageService.hasUser());
  }, []);

  const createUser = async (data: CreateUserDto): Promise<void> => {
    const response = await api.post<UserModel>("/api/users", data);
    LocalStorageService.saveUser(response.data);
    setIsLogin(true);
  };

  const getUserByPhoneNumber = async (phoneNumber: string): Promise<void> => {
    const response = await api.get<UserModel>(`/api/users/${phoneNumber}`);
    LocalStorageService.saveUser(response.data);
    setIsLogin(true);
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
