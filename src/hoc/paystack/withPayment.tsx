// TODO: extract to payment module
// https://www.npmjs.com/package/react-paystack

import { useCallback } from "react";
import { usePaystackPayment } from "react-paystack";

const withPaystack = (Component: any) => {
  return (email: string, totalAmount: number) => {
    // you can call this function anything
    const onSuccess = useCallback((reference: any) => {
      // Implementation for whatever you want to do with reference and after success call. i.e toast, post to airtable etc
      console.log(reference);
    }, []);

    // you can call this function anything
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log("closed");
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
          initializePayment(onSuccess, onClose);
        }}
      />
      //   <button
      //   onClick={() => {
      //     initializePayment(onSuccess, onClose);
      //   }}
      // >
      //     Pay
      // </button>
    );
  };
};

export default withPaystack;
