"use client";

import ProductCard from "@/components/product-card";
import { useCartStore } from "@/store/useCartStore";
import { useProductsStore } from "@/store/useProductsStore";

import DrawerComponent from "@/components/drawer/Drawer";
import PageLayout from "@/components/layout/PageLayout";
import { useEffect } from "react";

export default function Home() {
  const { products, loading, error, fetchProducts } = useProductsStore(
    (state) => state,
  );

  const cart = useCartStore((state) => state);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <PageLayout>
      <div>
        <h2>Products</h2>
        {loading && <div>loading....</div>}
        {error && <div className="text-red-700">ERROR....</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <DrawerComponent />
      </div>
    </PageLayout>
  );
}
