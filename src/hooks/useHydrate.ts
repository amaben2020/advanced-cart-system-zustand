import { useEffect, useState } from "react";

const useHydrate = (store: any, callback: any): any => {
  const [state, setState] = useState(null);

  const hydratedState = store(callback);

  useEffect(() => {
    setState(hydratedState);
  }, [hydratedState]);
  return { state };
};

export default useHydrate;

// this indicates that the state sent by the server does not match the state rendered on the client.

// To quickly fix this error, we can follow these steps:
// For all components that use a persisted state in the localStorage, it is necessary to create a local state with useState.

// Use useEffect to set the local state with the store data. This way, the local state will be updated when mounting the component, avoiding inconsistencies.

// Use the local state of the created cart to render the items instead of directly using the state of the cart in the store.

//Hydration 101
// Hydration errors occur when the server-rendered HTML content and the client-side JavaScript do not match. In a Next.js application, this typically happens when the rendered HTML on the server side does not match what the client-side JavaScript expects.
