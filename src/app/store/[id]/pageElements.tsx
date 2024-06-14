"use client";
import { SalesProvider } from "~/providers/salesContext"
import SearchBar from "../search"
import StoreInfo from "../storeInfo"
import { Products } from "../products"


const StorePageDynamic = ({ storeID, productsObj }: { storeID: string, productsObj: any }) => {
    return <SalesProvider>
        <div className="sticky top-0 bg-primary px-3 py-1 z-50">
            <SearchBar productsObj={productsObj} />
        </div>

        <StoreInfo storeId={storeID} />

        <Products productsObj={productsObj} />
    </SalesProvider>
}

export default StorePageDynamic