// app/cart/[id]/OrderStatus.tsx
// import { Sale } from '~/models/sale';

import Sale from "~/models/sale";

interface OrderStatusProps {
  cart: Sale;
}

const OrderStatus = ({ cart }: OrderStatusProps) => {
  const statuses = [
    "Order has been received by the store",
    "Order has been accepted",
    "Order is out for delivery",
    "Order has been delivered",
  ];

  const currentStatusIndex = (() => {
    switch (cart.status) {
      case 'placed':
        return 1;
      case 'accepted':
        return 2;
      case 'out_for_delivery':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  })();

  return (
    <div className="p-4 bg-white rounded-lg shadow mb-4">
      <h2 className="text-lg font-bold mb-4">Order Status</h2>
      <div className="space-y-2">
        {statuses.map((status, index) => (
          <div key={index} className="flex items-center">
            <span className={`mr-2 ${index < currentStatusIndex ? 'text-green-500' : 'text-gray-400'}`}>
              {index < currentStatusIndex ? '✓' : '○'}
            </span>
            <span>{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
