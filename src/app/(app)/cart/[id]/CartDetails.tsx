// app/cart/[id]/CartDetails.tsx
// import { Sale } from '~/models/sale';

import Sale from "~/models/sale";

interface CartDetailsProps {
  cart: Sale;
}

const CartDetails = ({ cart }: CartDetailsProps) => {
  const deliveryCharge = 40;
  const totalAmount = cart.total_amount + deliveryCharge;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Price Details</h2>
      <div className="flex justify-between mb-2">
        <span>Total MRP</span>
        <span>₹{cart.total_amount}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivery Charge</span>
        <span>₹{deliveryCharge}</span>
      </div>
      <div className="border-t border-gray-300 my-2"></div>
      <div className="flex justify-between font-bold">
        <span>Total Amount</span>
        <span>₹{totalAmount}</span>
      </div>
    </div>
  );
};

export default CartDetails;
