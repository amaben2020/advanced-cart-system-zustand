import { useState } from "react";

const useTogglePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [icon, setIcon] = useState<"eye-open" | "eye-closed">("eye-open");

  const handleToggle = () => {
    setShowPassword((p) => !p);

    if (showPassword) {
      setIcon("eye-open");
    } else {
      setIcon("eye-closed");
    }
  };

  return {
    handleToggle,
    icon,
    showPassword,
  };
};

export default useTogglePasswordVisibility;
