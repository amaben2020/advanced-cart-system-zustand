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
  count?: number;
};
type TOptions = { limit: number; skip: number };
type TActions = {
  fetchProducts: (options: TOptions) => Promise<void>;
};

const PRODUCT_API = `${process.env.NEXT_PUBLIC_URL}/api/get-products`;

export const useProductsStore = create<TStore & TActions>((set) => ({
  products: [],
  loading: false,
  error: false,
  fetchProducts: async (options?: TOptions) => {
    set({ products: [], loading: true, error: false });
    try {
      let query =
        options !== undefined
          ? `${PRODUCT_API}?skip=${options?.skip}&limit=${options?.limit}`
          : PRODUCT_API;

      const response = await fetch(query);

      const data = await response.json();

      // we need this to disable the loadmore button
      const totalProducts = await fetch(PRODUCT_API);
      const info = await totalProducts.json();

      set({
        products: data.products,
        loading: false,
        error: false,
        count: info.products.length,
      });
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
