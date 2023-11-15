import { create } from "zustand";
import { TProduct } from "./useProductsStore";

type TState = {
  cart: TProduct[];
  totalItems: number;
  totalAmount: number;
};

type TActions = {
  addToCart: (product: TProduct) => void;
};

export const useCartStore = create<TState & TActions>((set, get) => ({
  cart: [],
  totalItems: 0,
  totalAmount: 0,
  addToCart: (product: TProduct) => {
    set((state) => ({
      cart: [...state.cart, product],
      totalAmount: 0,
      totalItems: 0,
    }));
  },
}));
