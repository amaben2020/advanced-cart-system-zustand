//@ts-nocheck
import useHydrate from "@/hooks/useHydrate";
import { TState, useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import IconComponent from "../elements/icon";

const PageLayout = ({
  children,
  toggleDrawer,
}: {
  children: ReactNode;
  toggleDrawer: () => void;
}) => {
  const { state: cartState } = useHydrate(
    useCartStore,
    (state: TState) => state.cart,
  );

  const session = useSession();

  return (
    <main className="p-6 lg:p-10 xl:p-10 2xl:p-20">
      <header>
        <nav className="flex px-2 py-4">
          <div>
            {session.data && (
              <p>Welcome, {session?.data?.user?.user?.firstName}</p>
            )}
          </div>

          <button className="relative ml-auto" onClick={toggleDrawer}>
            <IconComponent name="cart" className="p-2" />
            {cartState?.length > 0 && (
              <div className="absolute w-6 h-6 bg-red-500 rounded-full -top-3 -right-3">
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
