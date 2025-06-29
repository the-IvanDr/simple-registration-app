import { UserModel } from "@/models/user.model";

const USER_KEY = "user";

export const LocalStorageService = {
  saveUser: (user: UserModel) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: (): UserModel | null => {
    const data = localStorage.getItem(USER_KEY);
    return data ? (JSON.parse(data) as UserModel) : null;
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  hasUser: (): boolean => {
    return !!localStorage.getItem(USER_KEY);
  },
};
