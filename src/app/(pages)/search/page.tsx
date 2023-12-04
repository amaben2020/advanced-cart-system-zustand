"use client";
import { useSearchParams } from "next/navigation";

const SearchResults = () => {
  const location = useSearchParams();
  const SEARCH_QUERY = "product";

  return <div>SearchResults {location?.get(SEARCH_QUERY)}</div>;
};

export default SearchResults;
