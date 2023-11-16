"use client";
import { useCartStore } from "@/store/useCartStore";
import { TProduct } from "@/store/useProductsStore";

const ProductCard = ({ product }: { product: TProduct }) => {
  const cart = useCartStore((state) => state);

  return (
    <div className="card">
      <h3>{product.title}</h3>

      <p>{product.description}</p>

      <p>{product.rating}</p>

      <button
        className="w-full bg-green-700 text-white font-bold rounded-md p-3 my-6"
        onClick={() => cart.addToCart(product)}
      >
        Add to cart
      </button>
      {/* <button
        onClick={() => cart.removeFromCart(product)}
        style={{
          background: "red",
          color: "white",
          padding: 20,
          margin: 10,
        }}
      >
        Delete from cart
      </button> */}
    </div>
  );
};

export default ProductCard;
