//@ts-nocheck
import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";
import { TProduct } from "./useProductsStore";

export type TState = {
  cart: TProduct[];
  totalPrice: number;
  totalAmount: number;
};

type TActions = {
  addToCart: (product: TProduct) => void;
  removeFromCart: (product: TProduct) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create(
  persist<TState & TActions>(
    (set, get) => ({
      cart: [],
      totalPrice: 0,
      totalAmount: 0,
      addToCart: (product: TProduct) => {
        set((state: any) => {
          const productInCart = state.cart.findIndex(
            (elem: TProduct) => elem?._id === product?._id,
          );

          product["quantity"] = 1;
          if (productInCart > -1) {
            const updatedCart = state.cart.map((elem: TProduct) => {
              if (elem?._id === product?._id) {
                return {
                  ...elem,
                  quantity: elem?.quantity + 1,
                };
              } else {
                return elem;
              }
            });

            return {
              cart: updatedCart,
              totalAmount: state.totalAmount + 1,
              totalPrice: state.totalPrice + product?.price,
            };
          } else {
            return {
              cart: [
                ...state.cart,
                { ...product, quantity: product?.quantity },
              ],
              totalAmount: state.totalAmount + 1,
              totalPrice: state.totalPrice + product?.price,
            };
          }
        });
      },

      removeFromCart: (product: TProduct) => {
        set((state: Pick<TState, "cart" | "totalAmount" | "totalPrice">) => ({
          cart: state.cart.filter((elem) => elem?._id !== product?._id),
          totalAmount: 0,
          totalPrice: 0,
        }));
      },

      updateCartQuantity: (id: number, quantity: number) => {
        const cartState = get().cart;

        const immutableState = [...cartState];

        if (cartState.length > 0) {
          let itemToUpdate: any = immutableState.find(
            (elem) => elem?._id === id,
          );

          if (itemToUpdate) {
            itemToUpdate.quantity = quantity;

            set({
              cart: immutableState,
              totalAmount: cartState?.totalAmount + 1,
              totalPrice: cartState?.totalPrice * quantity,
            });
          }
        }
      },
      clearCart: () => {
        set({
          cart: [],
          totalPrice: 0,
          totalAmount: 0,
        });
      },
    }),
    {
      name: "cart-state",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
