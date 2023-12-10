import AdminDashboardLayout from "../layout";

const AdminDashboard = () => {
  // TODO: create order Schema, create an endpoint that gets updated via webhook the orderSchema in mongodb or create in Airtable
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
        <div className="col-span-2 p-10 border rounded-md">
          <p>1. Render all orders here</p>
          <p> 2. Orders can be cancelled or delivered</p>
          <p> 3. Delivery should /api/paystack/orders/</p>
        </div>
        <div className="col-span-1 p-10 border rounded-md">Recent Orders</div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
