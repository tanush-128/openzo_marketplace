"use client";
// import { SalesProvider } from "~/providers/salesContext"
import SearchBar from "./search"
import StoreInfo from "./storeInfo"
import { Products } from "./products"
import { Poppins } from "next/font/google";
import useSalesStore from "~/providers/salesStore";
import Link from "next/link";

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});


const StorePageDynamic = ({ storeID, productsObj }: { storeID: string, productsObj: any }) => {
    const cart =  useSalesStore((state) => state.getSaleByStoreId(storeID));
    return  <div>
           <div className="sticky top-0  px-3 py-1 z-50">
            <SearchBar productsObj={productsObj} />
           </div>

        <StoreInfo storeId={storeID} />

        <Products productsObj={productsObj} />
        {
            cart?.total_amount && <div className="fixed bottom-0 w-full max-w-lg bg-white p-2 z-50">
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm">Total: ₹{cart.total_amount}</p>
                        <p className="text-xs">Items: {cart.order_items.length}</p>
                    </div>
                    <Link 
                    href= {`/cart/${cart.id}`}
                    className="bg-primary text-white px-4 py-1 rounded-lg flex items-center">
                        <span>View Cart</span>
                    
                    <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 12H6.75m10.5 0l-3-3m3 3l-3 3"
                />
              </svg>
                    </Link>
                </div>
            </div>
        }
     </div>
   
}

export default StorePageDynamic