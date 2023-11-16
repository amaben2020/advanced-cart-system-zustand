import { CartIcon } from "@/assets/svgs/Cart";

const IconComponent = ({ name }: { name: "cart"; className?: string }) => {
  if (process.env.NODE_ENV === "development") {
    if (!name.length) console.log("Insert an icon name");
  }
  const ICON = {
    cart: <CartIcon name="cart" />,
  };
  return ICON[name];
};

export default IconComponent;
