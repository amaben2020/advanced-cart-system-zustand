"use client";

import ProductCard from "@/components/product-card";
import { useCartStore } from "@/store/useCartStore";
import { useProductsStore } from "@/store/useProductsStore";
import { Inter } from "@next/font/google";
import { useEffect } from "react";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { products, loading, error, fetchProducts } = useProductsStore(
    (state) => state,
  );

  const cart = useCartStore((state) => state);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className={styles.main}>
      Home
      <div>
        <h2>Products</h2>
        {loading && <div>loading....</div>}
        {error && <div className="text-red-700">ERROR....</div>}
        <p>Cart Store</p> {JSON.stringify(cart.cart)}
        <div className="flex gap-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
