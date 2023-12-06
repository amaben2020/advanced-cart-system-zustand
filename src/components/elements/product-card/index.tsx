"use client";
import { useCartStore } from "@/store/useCartStore";
import { TProduct } from "@/store/useProductsStore";
import { truncate } from "@/utils/truncate";
import Image from "next/image";

const ProductCard = ({ product }: { product: TProduct }) => {
  const cart = useCartStore((state) => state);

  const currentProductQty = cart.cart.find(
    (item) => item?.id === product?.id,
  )?.quantity;

  return (
    <div className="relative flex flex-col gap-2 card">
      <div className="absolute z-20 px-2 py-1 text-white bg-green-700 rounded-xl -left-1 -top-5">
        {product?.category}
      </div>
      {Number(currentProductQty) > 0 && (
        <>
          <span className="absolute inline-flex w-6 h-6 text-black bg-green-700 rounded-full opacity-75 animate-ping -top-2 -right-3"></span>
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
          priority
        />
      </div>

      <h3 className="font-bold capitalize h-[60px]">{product.title}</h3>

      <p className="h-[60px]"> {truncate(product.description, 46)}</p>

      {/* TODO: use stars here for rating*/}
      <p>{product.rating}</p>
      <p className="font-bold">₦{product.price.toFixed(2)}</p>

      <button
        className="w-full p-3 font-bold text-white bg-green-700 rounded-md"
        onClick={() => cart.addToCart(product)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
