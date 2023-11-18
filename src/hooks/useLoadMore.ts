import { TProduct } from "@/store/useProductsStore";
import { useCallback, useState } from "react";

// docs: use loadMore for clientside manipulation
const useLoadMore = (numberOfItemsToDisplay: number) => {
  const [loadMoreLimit, setLoadMoreLimit] = useState(numberOfItemsToDisplay);

  const loadMore = useCallback((array: TProduct[], limit: number) => {
    const limitProduct = array.slice(0, limit);
    return limitProduct;
  }, []);

  const incrementLoadMore = () =>
    setLoadMoreLimit((p) => p + numberOfItemsToDisplay);
  return { loadMoreLimit, loadMore, incrementLoadMore };
};

export default useLoadMore;
