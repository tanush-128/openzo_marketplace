// // app/cart/[id]/OrderStatus.tsx
// // import { Sale } from '~/models/sale';

// import Sale from "~/models/sale";

// interface OrderStatusProps {
//   cart: Sale;
// }

// const OrderStatus = ({ cart }: OrderStatusProps) => {
//   const statuses = [
//     "Order has been received by the store",
//     "Order has been accepted",
//     "Order is out for delivery",
//     "Order has been delivered",
//   ];

//   const currentStatusIndex = (() => {
//     switch (cart.status) {
//       case 'placed':
//         return 1;
//       case 'accepted':
//         return 2;
//       case 'out_for_delivery':
//         return 3;
//       case 'delivered':
//         return 4;
//       default:
//         return 0;
//     }
//   })();

//   return (
//     <div className="p-4 bg-white rounded-lg shadow mb-4">
//       <h2 className="text-lg font-bold mb-4">Order Status</h2>
//       <div className="space-y-2">
//         {statuses.map((status, index) => (
//           <div key={index} className="flex items-center">
//             <span className={`mr-2 ${index < currentStatusIndex ? 'text-green-500' : 'text-gray-400'}`}>
//               {index < currentStatusIndex ? '✓' : '○'}
//             </span>
//             <span>{status}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderStatus;

import { FC } from "react";

import { format } from "date-fns";
import Sale from "~/models/sale";

interface OrderStatusProps {
  cart: Sale;
}

const statuses = [
  "Order has been received by the store",
  "Order has been accepted",
  "Order is out for delivery",
  "Order has been delivered",
];

const OrderStatus: FC<OrderStatusProps> = ({ cart }) => {
  const currentStatusIndex = statuses.findIndex(
    (status) =>
      (cart.status === "placed" && status === statuses[0]) ||
      (cart.status === "accepted" && status === statuses[1]) ||
      (cart.status === "out_for_delivery" && status === statuses[2]) ||
      (cart.status === "delivered" && status === statuses[3]),
  );

  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow">
      <h2 className="mb-2 text-lg font-semibold">Order Status</h2>
      <div className="space-y-2">
        {statuses.map((status, index) => (
          <div key={index} className="flex items-center justify-between">
            <span
              className={`${index <= currentStatusIndex ? "text-green-600" : "text-gray-400"}`}
            >
              {status}
            </span>
            <span>
              {index <= currentStatusIndex ? (
                <svg
                  className="h-5 w-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414L9 14.414l-3.707-3.707a1 1 0 00-1.414 1.414l4.5 4.5a1 1 0 001.414 0l8-8a1 1 0 00-1.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 00-2 0v3H6a1 1 0 000 2h3v3a1 1 0 002 0v-3h3a1 1 0 000-2h-3V7z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="my-2 border-t border-gray-200"></div>
      <div className="text-gray-700">
        <div className="flex items-center">
          <span className="mr-2 font-semibold">Order ID:</span>
          <span>{cart.id.split("-")[0]}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 font-semibold">Time:</span>
          <span>
            {format(new Date(cart.orderTime ?? ""), "dd MMM, hh:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
