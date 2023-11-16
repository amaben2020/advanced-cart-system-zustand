import { CartIcon } from "@/assets/svgs/Cart";

const IconComponent = ({ name }: { name: "cart"; className?: string }) => {
  if (!name.length) {
    throw new Error("Insert a name to the Icon component");
  }
  const ICON = {
    cart: <CartIcon name="cart" />,
  };
  return ICON[name];
};

export default IconComponent;
