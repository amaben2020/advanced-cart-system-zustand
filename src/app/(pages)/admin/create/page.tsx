"use client";

import Input from "@/components/elements/input";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import AdminDashboardLayout from "../layouts";

const CreateProduct = () => {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  const [formElements, setFormElements] = useState({
    title: "",
    description: "",
    price: 0,
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setFormElements((p) => ({
      ...p,
      [name]: e.target.value,
    }));
  };

  const submitForm = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", file);

    try {
      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setImage(result["fileUrl"]);
      console.log(result);
      console.log(image);
      const products = await fetch("/api/admin/create-product", {
        method: "POST",
        body: JSON.stringify({
          ...formElements,
          images: image,
        }),
      });

      console.log(await products.json());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminDashboardLayout>
      <section className="flex flex-col gap-5 p-10">
        <h1>Create Product</h1>

        <form onSubmit={submitForm}>
          <div className="flex flex-wrap items-center gap-6 my-6">
            <Input
              label="title"
              name="title"
              type="text"
              className="flex-1 basis-20"
              onChange={handleChange}
            />
            <Input
              onChange={handleChange}
              label="description"
              name="description"
              type="text"
              className="flex-1 basis-20"
            />
            <Input
              onChange={handleChange}
              label="price"
              name="price"
              type="number"
              className="flex-1 basis-20"
            />
            <Input
              onChange={handleChange}
              label="discountPercentage"
              name="discountPercentage"
              type="number"
              className="flex-1 basis-20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 my-4">
            <Input
              onChange={handleChange}
              label="rating"
              name="rating"
              type="number"
              className="flex-1 basis-36"
            />
            <Input
              onChange={handleChange}
              label="stock"
              name="stock"
              type="number"
              className="flex-1 basis-36"
            />
            <Input
              onChange={handleChange}
              label="brand"
              name="brand"
              type="text"
              className="flex-1 basis-36"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 my-4">
            <Input
              onChange={handleChange}
              label="category"
              name="category"
              type="text"
              className="flex-1 basis-36"
            />
            <Input
              onChange={handleChange}
              label="thumbnail"
              name="thumbnail"
              type="text"
              className="flex-1 basis-36"
            />
            {/* // array of strings */}

            <label
              htmlFor=""
              className="flex items-center justify-center gap-3 text-center border rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <Input
                type="file"
                onChange={(e: any) => setFile(e.target?.files[0])}
                label="Choose Image"
                className="flex-1 cursor-pointer basis-20"
              />
            </label>
          </div>

          <button
            className="block p-4 px-8 mx-auto mt-6 border rounded-md"
            type="submit"
          >
            Create
          </button>
        </form>

        <Image src={image} height={200} width={200} alt="" />
      </section>
    </AdminDashboardLayout>
  );
};

export default CreateProduct;

{
  /* <div className="container" style={{ width: "600px" }}>
          <div className="my-3">
            <h3>bezkoder.com</h3>
            <h4>Multiple Images Upload in React.js</h4>
          </div>

          <ImagesUpload />
        </div> */
}
