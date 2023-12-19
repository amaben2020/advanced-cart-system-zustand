export const extractSearchParams = (
  reqUrl: string,
  query: {
    category: string;
    product: string;
    sortBy: string;
    direction: string;
  },
) => {
  type TKeys = keyof typeof query;
  // filtration and search logic
  const url = new URL(reqUrl);
  const searchParams = new URLSearchParams(url.search);

  let result: Record<any, any> = {};

  for (let key in query) {
    result[key as TKeys] = searchParams.get(query[key as TKeys]);
  }

  return result;
};
