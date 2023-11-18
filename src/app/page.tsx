"use client";

import ProductCard from "@/components/product-card";
import { useProductsStore } from "@/store/useProductsStore";

import DrawerComponent from "@/components/drawer/Drawer";
import ApiError from "@/components/elements/error/ApiError";
import PageLayout from "@/components/layout/PageLayout";
import LoadingCard from "@/components/product-card/loading-card/loading-card";
import useToggle from "@/hooks/useToggle";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { products, loading, error, fetchProducts } = useProductsStore(
    (state) => state,
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const { toggleDrawer, isOpen } = useToggle();

  const session = useSession();
  console.log(session);
  return (
    <PageLayout toggleDrawer={toggleDrawer}>
      <div>
        <div></div>
        <h1 className="my-5">Products</h1>
        {error && <ApiError />}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {loading
            ? Array.from([1, 2, 3, 4, 5, 6, 7, 8], (_, i) => (
                <LoadingCard key={i} />
              ))
            : products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        <DrawerComponent toggleDrawer={toggleDrawer} isOpen={isOpen} />
      </div>
      {/* <button>Load More Button Here</button> */}
    </PageLayout>
  );
}
