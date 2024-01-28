import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EditProduct = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      confirm("Are you sure you want to delete this product?.");

      const resposne = await fetch(`/api/admin/delete-product/${params.id}`, {
        method: "POST",
      });

      const message = await resposne.json();

      toast(message.message);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      EditProduct
      {params.id}
      <div>
        <button
          onClick={handleDelete}
          className="p-4 text-white bg-red-600 rounded-md"
        >
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
