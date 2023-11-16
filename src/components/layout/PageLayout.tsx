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
          <button className="ml-auto" onClick={toggleDrawer}>
            <IconComponent name="cart" />
          </button>
        </nav>
      </header>

      {children}
    </main>
  );
};

export default PageLayout;
