"use client";
import { useSearchParams } from "next/navigation";

const SearchResults = () => {
  const location = useSearchParams();
  const SEARCH_QUERY = "product";

  // const url = new URL("https://example.com?foo=1&bar=2");
  // const params = new URLSearchParams(url.search);
  // console.log("url", url.search);
  // console.log("params", params.get("foo"));

  return <div>SearchResults {location?.get(SEARCH_QUERY)}</div>;
};

export default SearchResults;
