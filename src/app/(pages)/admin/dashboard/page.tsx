import Table from "@/components/elements/table";
import { Orders } from "@/utils/api/services/orders";
import AdminDashboardLayout from "../layout";

const AdminDashboard = async () => {
  // TODO: create order Schema, create an endpoint that gets updated via webhook the orderSchema in mongodb or create in Airtable

  const orders = new Orders();
  const allOrders = await orders.getAll();
  return (
    <AdminDashboardLayout>
      <div>Welcome Back, Admin</div>
      <div className="grid grid-cols-3 my-6 gap-x-10">
        <div className="col-span-2 p-10 border rounded-md">
          Summary this would be a chart
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
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
