//import styles 👇
import useToggle from "@/hooks/useToggle";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
const DrawerComponent = () => {
  const { isOpen, toggleDrawer } = useToggle();
  const cartState = useCartStore((state) => state);
  return (
    <>
      <button onClick={toggleDrawer}>Show</button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
        size="30%"
      >
        <div className="p-5">
          <span className="text-right border " onClick={toggleDrawer}>
            CLOSE
          </span>
          <div className="p-3">
            {cartState?.cart?.map((cartItem) => {
              return (
                <div
                  key={cartItem.id}
                  className="my-3 border py-4 flex items-center gap-6"
                >
                  <Image
                    src={cartItem.images[0]}
                    alt=""
                    width={100}
                    className="rounded-lg"
                    height={100}
                  />
                  <div>
                    <h4>{cartItem.title}</h4>
                    <h4>${cartItem.price}</h4>
                  </div>

                  <div>
                    <h4> Quantity: </h4>
                    <p>{cartItem.quantity} </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
