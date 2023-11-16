import { ReactNode } from "react";
import IconComponent from "../icon";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="p-20">
      <header>
        <nav>
          <IconComponent name="cart" />
          ICONS
        </nav>
      </header>

      {children}
    </main>
  );
};

export default PageLayout;
