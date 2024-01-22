//@ts-nocheck
import useHydrate from "@/hooks/useHydrate";
import { TState, useCartStore } from "@/store/useCartStore";
import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";
import Dropdown from "../elements/dropdown";
import IconComponent from "../elements/icon";

const PageLayout = ({
  children,
  toggleDrawer,
}: {
  children: ReactNode;
  toggleDrawer?: () => void;
}) => {
  const { state: cartState } = useHydrate(
    useCartStore,
    (state: TState) => state.cart,
  );

  const session = useSession();

  const userRole = session.data?.user?.user?.role;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="p-6 lg:p-10 xl:p-10 2xl:p-20">
      <header>
        <nav className="flex px-2 pb-10">
          <div className="flex items-center gap-3 ml-auto">
            {session.data && (
              <div className="flex flex-col">
                <p className="text-sm capitalize flex gap-1">
                  Welcome, {userRole === "admin" && <h2>Admin</h2>}{" "}
                  {session?.data?.user?.user?.firstName}
                </p>

                <Dropdown />

                {isOpen && <div className="border-2">Settings</div>}
              </div>
            )}

            {userRole !== "admin" && (
              <button className="relative ml-auto" onClick={toggleDrawer}>
                <IconComponent name="cart" className="p-2" />
                {cartState?.length > 0 && (
                  <div className="absolute w-6 h-6 text-white bg-green-700 rounded-full -top-3 -right-3">
                    <p> {Number(cartState?.length)}</p>
                  </div>
                )}
              </button>
            )}
          </div>
        </nav>
      </header>

      {children}
    </main>
  );
};

export default PageLayout;
