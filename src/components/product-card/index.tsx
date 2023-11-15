"use client";
import { useCartStore } from "@/store/useCartStore";
import { TProduct } from "@/store/useProductsStore";

const ProductCard = ({ product }: { product: TProduct }) => {
  const cart = useCartStore((state) => state);

  return (
    <div className="border p-4">
      <h3>{product.title}</h3>

      <p>{product.description}</p>

      <p>{product.rating}</p>

      <button onClick={() => cart.addToCart(product)}>Add to cart</button>
    </div>
  );
};

export default ProductCard;
