// without react query, using only fetch and useReducer
import { TProduct } from "@/store/useProductsStore";
import { Reducer, useCallback, useEffect, useReducer } from "react";
type TState<T> = {
  data: T;
  isLoading: boolean;
  error: string;
};

// path is any url after the endpoint
const useDataFetch = <T>(path: string) => {
  enum DataFetchActions {
    LOADING = "LOADING",
    ERROR = "ERROR",
    SUCCESS = "SUCCESS",
  }

  const INITIAL_STATE = {
    data: [],
    isLoading: false,
    error: "",
  };

  type TAction =
    | { type: "LOADING" }
    | { type: "ERROR"; payload: string }
    | { type: "SUCCESS"; payload: TProduct[] };

  const dataReducer = (state: TState<T>, action: TAction) => {
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
          data: [],
        };
      case DataFetchActions.SUCCESS:
        return {
          isLoading: false,
          error: "",
          data: action.payload,
        };

      default:
        throw Error("Unknown action");
    }
  };
  const [state, dispatch] = useReducer<Reducer<TState<any>, TAction>>(
    dataReducer,
    INITIAL_STATE,
  );

  const getData = useCallback(async () => {
    try {
      dispatch({ type: "LOADING" });
      const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api${path}`, {
        method: "GET",
      });

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
