import { useEffect, useState } from "react";

const useMatchMedia = (minWidth: number) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    window
      .matchMedia(`(min-width: ${minWidth}px)`)
      .addEventListener("change", ({ matches }) => {
        setIsTablet(matches);
      });

    return () =>
      window
        .matchMedia(`(min-width: ${minWidth}px)`)
        .removeEventListener("change", ({ matches }) => {
          setIsTablet(matches);
        });
  }, [isTablet, minWidth]);

  return isTablet;
};

export default useMatchMedia;
