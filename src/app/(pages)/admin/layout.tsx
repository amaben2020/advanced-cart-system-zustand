import { ReactNode } from "react";

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="grid h-screen grid-cols-5">
      <aside className="flex flex-col col-span-1 p-4 text-white bg-black gap-y-6">
        <div className="flex">Cartstand</div>

        <h3 className="text-white">General</h3>
        <ul className="flex flex-col gap-y-4">
          <li className="flex "> Dashboard </li>
          <li className="flex "> Product </li>
          <li className="flex "> Inventory </li>
          <li className="flex "> Customers </li>
        </ul>
      </aside>
      <div className="col-span-4 p-4 ">{children}</div>
    </section>
  );
};

export default AdminDashboardLayout;
