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
type TOptions = { limit: number; skip: number };
type TActions = {
  fetchProducts: (options: TOptions) => Promise<void>;
};

const PRODUCT_API = "https://dummyjson.com/products?ref=hackernoon.com";

export const useProductsStore = create<TStore & TActions>((set) => ({
  products: [],
  loading: false,
  error: false,
  fetchProducts: async (options: TOptions) => {
    set({ products: [], loading: true, error: false });
    try {
      let query =
        options.limit ||
        (options.skip && options?.limit > 0 && options?.skip > 0)
          ? `${PRODUCT_API}?skip=${options?.skip}&limit=${options?.limit}`
          : PRODUCT_API;

      const response = await fetch(query);

      const data = await response.json();

      set({ products: data.products, loading: false, error: false });
    } catch (error: any) {
      if (error instanceof Error) {
        // getting access to current state of things if needed
        set((state) => ({
          products: [],
          loading: false,
          error: true,
        }));
      }
    }
  },
}));
