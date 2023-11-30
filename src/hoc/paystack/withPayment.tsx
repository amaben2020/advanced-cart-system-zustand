import useHydrate from "@/hooks/useHydrate";
import { useCartStore } from "@/store/useCartStore";
import { TStore } from "@/store/useProductsStore";
import { usePaystackPayment } from "react-paystack";

const withPaystack = (Component: any) => {
  // eslint-disable-next-line react/display-name
  return (email: string, totalAmount: number) => {
    const { state: cartState } = useHydrate(
      useCartStore,
      (state: TStore) => state,
    );

    // you can call this function anything
    const onSuccess = (reference: Record<string, string>) => {
      // Implementation for whatever you want to do with reference and after success call. i.e toast, post to airtable etc
      console.log("REFERENCE", reference);
      if (reference.message === "Approved") {
        cartState?.clearCart();
      }
    };

    // you can call this function anything
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log("closed with email sent");
    };

    const config = {
      reference: new Date().getTime().toString(),
      email,
      amount: totalAmount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200; Sum the cart items and multiply by 100
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    };
    const initializePayment = usePaystackPayment(config);

    return (
      <Component
        onClick={() => {
          initializePayment(onSuccess as () => void, onClose);
        }}
      />
    );
  };
};

export default withPaystack;
