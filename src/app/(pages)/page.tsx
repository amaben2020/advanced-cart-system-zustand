"use client";
import ApiError from "@/components/elements/error/ApiError";
import ProductCard from "@/components/elements/product-card";
import LoadingCard from "@/components/elements/product-card/loading-card/loading-card";
import Search from "@/components/elements/search";
import Sidebar from "@/components/elements/sidebar";
import PageLayout from "@/components/layout/PageLayout";
import DrawerComponent from "@/components/module/drawer/Drawer";
import useLoadMore from "@/hooks/useLoadMore";
import useToggle from "@/hooks/useToggle";
import { useProductsStore } from "@/store/useProductsStore";
import { CATEGORY } from "@/utils/data/category";
import { renderUniqueArrayItems } from "@/utils/renderUniqueItems";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
const SKIP = 8;
export default function Home() {
  const { toggleDrawer, isOpen } = useToggle();
  const { incrementLoadMore, loadMoreLimit } = useLoadMore(SKIP);

  const [searchData, setSearchData] = useState("");
  const { products, loading, error, count, fetchProducts } = useProductsStore(
    (state) => state,
  );

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const router = useRouter();

  const filterByCategory = (category: string) => {
    if (selectedCategory.includes(category)) {
      const updatedCategory = selectedCategory.filter((c) => c !== category);
      setSelectedCategory(updatedCategory);
    } else {
      setSelectedCategory((p) => [...p, category]);
    }
  };

  const productBrands = products.map((product) => product.brand);

  useEffect(() => {
    fetchProducts({
      category: selectedCategory,
    });
  }, [selectedCategory, fetchProducts, loadMoreLimit]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      router.push(`/search?product=${searchData}`);
    }
  };

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
        {JSON.stringify(selectedCategory)}
        <h1 className="my-5">Products</h1>
        <Search
          handleChange={handleSearch}
          value={searchData}
          handleKeyDown={handleKeyDown}
        />
        <div className="grid grid-cols-5 gap-x-5">
          <div className="col-span-5 mb-10 md:col-span-1">
            <Sidebar
              categories={CATEGORY}
              brands={renderUniqueArrayItems(productBrands)}
              handleCategoryFilter={filterByCategory}
              selectedCategory={selectedCategory}
            />
          </div>

          <div className="grid grid-cols-1 col-span-5 gap-3 md:col-span-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {loading
              ? Array.from([1, 2, 3, 4, 5, 6, 7, 8], (_, i) => (
                  <LoadingCard key={i} />
                ))
              : products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}

            {/* TODO: Refactor with mongoose */}
            {/* <div className="flex justify-center mx-auto my-10 text-center">
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
            </div> */}
          </div>
        </div>
        <DrawerComponent toggleDrawer={toggleDrawer} isOpen={isOpen} />
      </div>
      {/* <button>Load More Button Here</button> */}
    </PageLayout>
  );
}
