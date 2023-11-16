import React from "react";

const useToggle = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => setIsOpen((prevState) => !prevState);

  return { isOpen, toggleDrawer };
};

export default useToggle;
