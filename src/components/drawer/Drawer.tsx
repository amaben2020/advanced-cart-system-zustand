import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
const DrawerComponent = ({ toggleDrawer, isOpen }: TToggle) => {
  const cartState = useCartStore((state) => state);

  return (
    <>
      <button onClick={toggleDrawer}>Show</button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="rounded-lg border"
        size="30%"
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
            {cartState.cart.length > 0 ? (
              cartState?.cart?.map((cartItem) => {
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
              <p>You have {cartState.cart.length} cart items</p>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
