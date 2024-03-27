"use client";

import StoreInfo from "../storeDesc";
import { Products } from "../products";

export default function StorePage({ params }: { params: { id: number } }) {
  var storeId = params.id;
  return (
    <div>
      <StoreInfo storeId={storeId} />
      <Products storeId={storeId} />
    </div>
  );
}
