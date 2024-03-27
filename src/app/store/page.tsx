import { Products } from "./products";
import StoreInfo from "./storeDesc";

export default function StorePage() {
  return (
    <div>
      <h1>Store Page</h1>
      <StoreInfo storeId={1} />
      <Products storeId={1} />
    </div>
  );
}
