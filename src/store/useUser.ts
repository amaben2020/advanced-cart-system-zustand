import { create } from "zustand";

type TUserStore = {
  user: TUser;
  addUser: (data: TUser) => void;
};

type TUser = {
  firstName: string;
  lastName: string;
  accessToken: string;
};

export const useUserStore = create<TUserStore>((set, get) => ({
  user: {
    firstName: "",
    lastName: "",
    accessToken: "",
  },

  addUser: (data: TUser) => {
    set({
      user: data,
    });
  },
}));
