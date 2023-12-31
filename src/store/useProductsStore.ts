import { SortOrder } from "mongoose";
import { create } from "zustand";

// Zustand pattern for state and actions

export type TProduct = {
  _id: number;
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
type TOptions = {
  sort: { sortBy: "title" | "price"; direction: SortOrder };
  category: string[];
};
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
      let query;
      if (Array.isArray(options?.category) && options?.category?.length) {
        const singleCategory = options?.category[0];
        const mappedCategories = [options?.category.join(",")];
        const isMultiple = options?.category.length > 1;
        const filterByCategories = isMultiple
          ? mappedCategories
          : singleCategory;

        query =
          options !== undefined
            ? `${PRODUCT_API}?category=${filterByCategories}&sortBy=${options.sort.sortBy}&direction=${options.sort.direction}`
            : PRODUCT_API;
      } else {
        query = `${PRODUCT_API}?sortBy=${options?.sort?.sortBy}&direction=${options?.sort?.direction}`;
      }
      const response = await fetch(query);

      const data = await response.json();

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
        // getting access to current state of things if needed, state would point to previous state
        set((state) => ({
          products: [],
          loading: false,
          error: true,
        }));
      }
    }
  },
}));
