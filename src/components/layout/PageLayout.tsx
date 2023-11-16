import { ReactNode } from "react";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header>
        Header Here Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
        molestiae veniam autem esse totam. Vel harum inventore impedit quam. Qui
        distinctio consequatur, architecto eius unde minima autem voluptas
        excepturi id.
      </header>

      {children}
    </>
  );
};

export default PageLayout;
