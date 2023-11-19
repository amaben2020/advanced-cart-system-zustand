"use client";

import ProductCard from "@/components/product-card";
import { useProductsStore } from "@/store/useProductsStore";

import DrawerComponent from "@/components/drawer/Drawer";
import ApiError from "@/components/elements/error/ApiError";
import PageLayout from "@/components/layout/PageLayout";
import LoadingCard from "@/components/product-card/loading-card/loading-card";
import useLoadMore from "@/hooks/useLoadMore";
import useToggle from "@/hooks/useToggle";
import { useEffect } from "react";

export default function Home() {
  const { products, loading, error, count, fetchProducts } = useProductsStore(
    (state) => state,
  );

  const SKIP = 8;
  const { incrementLoadMore, loadMoreLimit } = useLoadMore(SKIP);

  useEffect(() => {
    fetchProducts({
      skip: SKIP,
      limit: loadMoreLimit,
    });
  }, [fetchProducts, loadMoreLimit]);

  const { toggleDrawer, isOpen } = useToggle();

  if (error) {
    return (
      <div className="my-20">
        <ApiError />
      </div>
    );
  }

  return (
    <PageLayout toggleDrawer={toggleDrawer}>
      <div>
        <div></div>
        <h1 className="my-5">Products</h1>

        <div className="grid grid-cols-5">
          <div className="col-span-5 mb-10 md:col-span-1">
            Advanced Filtration Here
          </div>
          <div className="grid grid-cols-1 col-span-5 gap-3 md:col-span-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {loading
              ? Array.from([1, 2, 3, 4, 5, 6, 7, 8], (_, i) => (
                  <LoadingCard key={i} />
                ))
              : products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}

            <div className="flex justify-center mx-auto my-10 text-center">
              <button
                className="flex items-center gap-2 p-4 text-xl text-center text-white bg-green-700 rounded-lg hover:bg-green-800 disabled:bg-gray-700 disabled:cursor-not-allowed"
                onClick={incrementLoadMore}
                disabled={loadMoreLimit >= count!}
              >
                Load More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <DrawerComponent toggleDrawer={toggleDrawer} isOpen={isOpen} />
      </div>
      {/* <button>Load More Button Here</button> */}
    </PageLayout>
  );
}
