//@ts-nocheck
import Table from "@/components/elements/table";
import { Orders } from "@/utils/api/services/orders";

import Chart from "@/components/module/chart";

const AdminDashboard = async () => {
  // TODO: create order Schema, create an endpoint that gets updated via webhook the orderSchema in mongodb or create in Airtable

  const orders = new Orders();
  const allOrders = await orders?.getAll();
  const chartData = allOrders?.orders?.map((order: any) => ({
    email: order.email,
    cost: order.total,
  }));

  return (
    <section>
      <div>Welcome Back, Admin</div>
      <div className="grid grid-cols-3 my-6 gap-x-10">
        <div className="col-span-2 p-10 border rounded-md max-h-[600px]">
          Summary this would be a chart
          <Chart data={chartData} />
        </div>
        <div className="col-span-1 p-10 border rounded-md">Recent Orders</div>
      </div>

      <div className="grid grid-cols-3 my-6 gap-x-10">
        <div className="col-span-2 border rounded-md">
          <div className="p-5 border-b">
            <h3> Recent Orders</h3>

            <div>
              <Table
                heading={["Id", "Email", "Total", "Payment Status"]}
                type="orders"
                body={allOrders?.orders}
              />
            </div>
          </div>

          <div className="p-5">Orders List Here</div>
        </div>
        <div className="col-span-1 p-10 border rounded-md">Recent Orders</div>
      </div>
    </section>
  );
};

export default AdminDashboard;
