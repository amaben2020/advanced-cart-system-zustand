import { ReactNode } from "react";
import IconComponent from "../icon";

const PageLayout = ({
  children,
  toggleDrawer,
}: {
  children: ReactNode;
  toggleDrawer: () => void;
}) => {
  return (
    <main className="p-20">
      <header>
        <nav className="py-4 px-2 flex">
          <button className="ml-auto relative" onClick={toggleDrawer}>
            <IconComponent name="cart" />
            <div className="absolute -top-3 rounded-full bg-red-500 w-6 h-6 -right-3">
              <p> 10</p>
            </div>
          </button>
        </nav>
      </header>

      {children}
    </main>
  );
};

export default PageLayout;
