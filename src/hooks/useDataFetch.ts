// without react query, using only fetch and useReducer
import { TProduct } from "@/store/useProductsStore";
import { Reducer, useCallback, useEffect, useReducer } from "react";
type TState = {
  data: { products: TProduct[] };
  isLoading: boolean;
  error: string;
};
const useDataFetch = (path: string) => {
  enum DataFetchActions {
    LOADING = "LOADING",
    ERROR = "ERROR",
    SUCCESS = "SUCCESS",
  }

  const INITIAL_STATE = {
    data: { products: [] },
    isLoading: false,
    error: "",
  };

  type TAction =
    | { type: "LOADING" }
    | { type: "ERROR"; payload: string }
    | { type: "SUCCESS"; payload: TProduct[] };

  const dataReducer = (state: TState, action: TAction) => {
    switch (action.type) {
      case DataFetchActions.LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case DataFetchActions.ERROR:
        return {
          error: action?.payload,
          isLoading: false,
          data: { products: [] },
        };
      case DataFetchActions.SUCCESS:
        return {
          isLoading: false,
          error: "",
          data: { products: action.payload },
        };

      default:
        throw Error("Unknown action");
    }
  };
  const [state, dispatch] = useReducer<Reducer<TState, TAction>>(
    dataReducer,
    INITIAL_STATE,
  );

  const getData = useCallback(async () => {
    try {
      dispatch({ type: "LOADING" });
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/get-products${path}`,
        {
          method: "GET",
        },
      );

      const response = await data.json();

      dispatch({ type: "SUCCESS", payload: response });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        dispatch({ type: "ERROR", payload: error.message });
      }
    }
  }, [path]);

  useEffect(() => {
    getData();
    return () => {};
  }, [getData]);

  return { state };
};

export default useDataFetch;
