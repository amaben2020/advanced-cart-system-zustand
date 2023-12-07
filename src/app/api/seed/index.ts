import { TProduct } from "@/store/useProductsStore";

const seedAPI = async () => {
  const data = await fetch("https://dummyjson.com/products?ref=hackernoon.com");

  const response = await data.json();
  response.products.forEach(async (product: TProduct) => {
    const data = await fetch(`http://localhost:3000/api/admin/create-product`, {
      method: "POST",
      body: JSON.stringify(product),
    });

    const response = await data.json();

    console.log(response);
  });
};

seedAPI();
