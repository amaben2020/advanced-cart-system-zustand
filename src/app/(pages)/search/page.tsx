//@ts-nocheck
"use client";
import ProductCard from "@/components/elements/product-card";
import LoadingCard from "@/components/elements/product-card/loading-card/loading-card";
import PageLayout from "@/components/layout/PageLayout";
import useDataFetch from "@/hooks/useDataFetch";
import { TProduct } from "@/store/useProductsStore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SearchResults = () => {
  const location = useSearchParams();
  const SEARCH_QUERY = "product";

  const searchedItem = location?.get(SEARCH_QUERY)?.split(" ").join("+");

  const { state } = useDataFetch(`?product=${searchedItem}`);

  return (
    <PageLayout>
      <div className="flex justify-between gap-x-6">
        <h1 className="mb-10"> Search Results</h1>

        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </Link>
      </div>

      <div className="col-span-4">
        <div className="grid grid-cols-1 col-span-5 gap-3 md:col-span-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          <div className="grid grid-cols-1 col-span-5 gap-3 md:col-span-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 md:gap-6">
            {state.isLoading
              ? Array.from([1, 2, 3, 4, 5, 6, 7, 8], (_, i) => (
                  <LoadingCard key={i} />
                ))
              : state.data.products?.products?.length > 0 &&
                state.data?.products?.products?.map((product: TProduct) => (
                  <ProductCard key={product._id} product={product} />
                ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SearchResults;
