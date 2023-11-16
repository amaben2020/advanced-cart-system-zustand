import { create } from "zustand";

// Zustand pattern for state and actions

export type TProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
};
export type TStore = {
  products: TProduct[];
  loading: boolean;
  error: boolean;
};
type TActions = {
  fetchProducts: () => Promise<void>;
};

const PRODUCT_API = "https://dummyjson.com/products?ref=hackernoon.com";

export const useProductsStore = create<TStore & TActions>((set) => ({
  products: [],
  loading: false,
  error: false,
  fetchProducts: async () => {
    set({ products: [], loading: true, error: false });
    try {
      const response = await fetch(PRODUCT_API);

      const data = await response.json();

      set({ products: data.products, loading: false, error: false });
    } catch (error: any) {
      if (error instanceof Error) {
        // getting access to current state of things
        set((state) => ({
          ...state,
          error: error.message,
        }));
      }
    }
  },
}));
