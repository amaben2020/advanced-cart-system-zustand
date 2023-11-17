import useHydrate from "@/hooks/useHydrate";
import { TState, useCartStore } from "@/store/useCartStore";
import { ReactNode } from "react";
import IconComponent from "../icon";

const PageLayout = ({
  children,
  toggleDrawer,
}: {
  children: ReactNode;
  toggleDrawer: () => void;
}) => {
  // const cartState = useCartStore((state) => state.cart);
  const { state: cartState } = useHydrate(
    useCartStore,
    (state: TState) => state.cart,
  );
  return (
    <main className="p-20">
      <header>
        <nav className="py-4 px-2 flex">
          <button className="ml-auto relative" onClick={toggleDrawer}>
            <IconComponent name="cart" className="p-2" />
            {cartState?.length > 0 && (
              <div className="absolute -top-3 rounded-full bg-red-500 w-6 h-6 -right-3">
                <p> {Number(cartState?.length)}</p>
              </div>
            )}
          </button>
        </nav>
      </header>

      {children}
    </main>
  );
};

export default PageLayout;
