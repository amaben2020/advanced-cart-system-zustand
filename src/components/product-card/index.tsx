"use client";
import { useCartStore } from "@/store/useCartStore";
import { TProduct } from "@/store/useProductsStore";
import { truncate } from "@/utils/truncate";
import Image from "next/image";

const ProductCard = ({ product }: { product: TProduct }) => {
  const cart = useCartStore((state) => state);

  return (
    <div className="card flex flex-col gap-4">
      <div className="relative h-[200px]">
        <Image
          src={product.images[0]}
          alt=""
          fill
          className="absolute top-0 w-full rounded-md"
        />
      </div>

      <h3 className="font-bold">{product.title}</h3>

      <p>{truncate(product.description, 45)}</p>

      {/* TODO: use stars here */}
      <p>{product.rating}</p>
      <p className="font-bold">${product.price.toFixed(2)}</p>

      <button
        className="w-full bg-green-700 text-white font-bold rounded-md p-3 mt-6"
        onClick={() => cart.addToCart(product)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
