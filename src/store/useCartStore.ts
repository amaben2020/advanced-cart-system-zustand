import { create } from "zustand";
import { TProduct } from "./useProductsStore";

type TState = {
  cart: TProduct[];
  totalPrice: number;
  totalAmount: number;
};

type TActions = {
  addToCart: (product: TProduct) => void;
  removeFromCart: (product: TProduct) => void;
};

export const useCartStore = create<TState & TActions>((set, get) => ({
  cart: [],
  totalPrice: 0,
  totalAmount: 0,
  addToCart: (product: TProduct) => {
    set((state) => {
      const productInCart = state.cart.findIndex(
        (elem) => elem.id === product.id,
      );

      product["quantity"] = 1;
      if (
        productInCart > -1 &&
        state.cart.find((elem) => elem.id === product.id)
      ) {
        const updatedCart = state.cart.map((elem) => {
          if (elem.id === product.id) {
            return {
              ...elem,
              quantity: elem.quantity + 1,
            };
          }
        });

        return {
          cart: updatedCart,
          totalAmount: state.totalAmount + 1,
          totalPrice: state.totalPrice + product.price,
        };
      } else {
        return {
          cart: [...state.cart, { ...product, quantity: product.quantity }],
          totalAmount: state.totalAmount + 1,
          totalPrice: state.totalPrice + product.price,
        };
      }
    });
  },

  removeFromCart: (product: TProduct) => {
    set((state) => ({
      cart: state.cart.filter((elem) => elem.id !== product.id),
      totalAmount: 0,
      totalPrice: 0,
    }));
  },
}));
