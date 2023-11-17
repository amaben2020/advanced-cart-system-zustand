"use client";
import { useCartStore } from "@/store/useCartStore";
import { TProduct } from "@/store/useProductsStore";
import { truncate } from "@/utils/truncate";
import Image from "next/image";

const ProductCard = ({ product }: { product: TProduct }) => {
  const cart = useCartStore((state) => state);

  const currentProductQty = cart.cart.find(
    (item) => item.id === product.id,
  )?.quantity;

  return (
    <div className="card flex flex-col gap-4 relative">
      {Number(currentProductQty) > 0 && (
        <>
          <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-green-700 opacity-75 -top-2 -right-2 text-black"></span>
          <p className="absolute -top-2 -right-1 text-[20px]">
            {" "}
            {currentProductQty}
          </p>
        </>
      )}
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
