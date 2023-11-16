import { create } from "zustand";
import { TProduct } from "./useProductsStore";

type TState = {
  cart: TProduct[];
  totalItems: number;
  totalAmount: number;
};

type TActions = {
  addToCart: (product: TProduct) => void;
  removeFromCart: (product: TProduct) => void;
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

  removeFromCart: (product: TProduct) => {
    set((state) => ({
      cart: state.cart.filter((elem) => elem.id !== product.id),
      totalAmount: 0,
      totalItems: 0,
    }));
  },
}));
