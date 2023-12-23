import Input from "@/components/elements/input";
import AdminDashboardLayout from "../layout";

const CreateProduct = () => {
  return (
    <AdminDashboardLayout>
      <section className="flex flex-col gap-5 p-10">
        <h1>Create Product</h1>

        <form action="">
          <div className="flex flex-wrap items-center gap-6 my-4">
            <Input label="title" type="text" className="flex-1" />
            <Input label="description" type="text" />
            <Input label="price" type="number" />
            <Input
              label="discountPercentage"
              type="number"
              className="flex-1"
            />
          </div>

          <Input label="rating" type="number" />
          <Input label="stock" type="number" />
          <Input label="brand" type="text" />
          <Input label="category" type="text" />
          <Input label="thumbnail" type="text" />
          {/* // array of strings */}
          <Input label="images" type="text" />

          <button className="block" type="submit">
            Create
          </button>
        </form>
      </section>
    </AdminDashboardLayout>
  );
};

export default CreateProduct;
