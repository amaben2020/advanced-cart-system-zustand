import useHydrate from "@/hooks/useHydrate";
import useMatchMedia from "@/hooks/useMatchMedia";
import { useCartStore } from "@/store/useCartStore";
import { TProduct, TStore } from "@/store/useProductsStore";
import Image from "next/image";
import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
const DrawerComponent = ({ toggleDrawer, isOpen }: TToggle) => {
  const { state: cartState } = useHydrate(
    useCartStore,
    (state: TStore) => state,
  );

  // const cartState = useCartStore((state) => state);

  const [qty, setQty] = useState<number>(0);

  const { isTablet } = useMatchMedia(900);

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="rounded-lg border"
        size={isTablet ? "30%" : "70%"}
      >
        <div className="p-5">
          <button className="text-right" onClick={toggleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-red-600 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="p-3">
            {cartState?.cart?.length > 0 ? (
              cartState?.cart?.map((cartItem: TProduct) => {
                return (
                  <div
                    key={cartItem?.id}
                    className="my-3 border py-4 flex items-center gap-6"
                  >
                    <Image
                      src={
                        Array.isArray(cartItem?.images)
                          ? cartItem?.images[0]
                          : cartItem?.images
                      }
                      alt=""
                      width={100}
                      className="rounded-lg"
                      height={100}
                    />
                    <div>
                      <h4>{cartItem?.title}</h4>
                      <h4>${cartItem?.price}</h4>
                    </div>

                    <div>
                      <h4> Quantity: </h4>
                      <p>{cartItem?.quantity} </p>

                      <select onChange={(e) => setQty(Number(e.target.value))}>
                        {[1, 2, 3, 4, 5].map((elem) => (
                          <option value={elem} key={elem}>
                            {elem}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() =>
                          cartState.updateCartQuantity(cartItem?.id, qty)
                        }
                      >
                        Update
                      </button>
                    </div>

                    <div>
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          cartState.removeFromCart(cartItem);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-red-700"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>You have {cartState?.cart?.length} cart items</p>
            )}

            <button className="border w-full my-4 p-4 rounded-lg bg-green-700 font-bold text-white hover:bg-green-800 cursor-not-allowed">
              Pay
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
