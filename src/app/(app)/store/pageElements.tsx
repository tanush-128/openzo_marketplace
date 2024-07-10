"use client";
// import { SalesProvider } from "~/providers/salesContext"
import SearchBar from "./search";
import StoreInfo from "./storeInfo";
import { Products } from "./products";
import { Poppins } from "next/font/google";
import useSalesStore from "~/providers/salesStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import GlobalConsts, { StoreType } from "~/constants/constants";
import { Store } from "~/models/store";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const StorePageDynamic = ({
  storeID,
  productsObj,
}: {
  storeID: string;
  productsObj: any;
}) => {
  const cart = useSalesStore((state) => state.getSaleByStoreId(storeID));
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [storeType, setStoreType] = useState<StoreType>(StoreType.Store);
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const storeData = await Store.fetchStore(storeID);
        setStore(storeData);
        setStoreType(
          GlobalConsts.categories.find(
            (category) => category.name === storeData.category,
          )?.type || StoreType.Store,
        );
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [storeID]);

  return (
    <div>
      <div className="sticky top-0 z-50  bg-white px-3 py-1">
        <SearchBar productsObj={productsObj} />
      </div>

      <StoreInfo store={store} storeType={storeType} />

      <>
        <StickyAppBar>
          <Toolbar className="">
            <Tabs
              value={value.toString()}
              onValueChange={(newValue) => handleChange(Number(newValue))}
              className="w-full bg-white"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="0">Products</TabsTrigger>
                <TabsTrigger value="1">Reviews</TabsTrigger>
                <TabsTrigger value="2">Posts</TabsTrigger>
              </TabsList>
            </Tabs>
          </Toolbar>
        </StickyAppBar>
        <div className="p-0">
          <Tabs
            value={value.toString()}
            onValueChange={(newValue) => handleChange(Number(newValue))}
          >
            <TabsContent value="0">
              <Products productsObj={productsObj} storeType={storeType} />
            </TabsContent>
            <TabsContent value="1">
              <ReviewsList storeId={storeID} store={store} />
            </TabsContent>
            <TabsContent value="2">Posts Content</TabsContent>
          </Tabs>
        </div>
      </>

      {cart?.total_amount && (
        <div className="fixed bottom-0 z-50 w-full max-w-lg bg-white p-2">
          <div className="flex justify-between">
            <div>
              <p className="text-sm">Total: ₹{cart.total_amount}</p>
              <p className="text-xs">Items: {cart.order_items.length}</p>
            </div>
            <Link
              href={`/cart/${cart.id}`}
              className="flex items-center rounded-lg bg-primary px-4 py-1 text-white"
            >
              <span>View Cart</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="ml-2 h-5 w-5"
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
      )}
    </div>
  );
};

export default StorePageDynamic;

// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@shadcn/ui';
import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/system";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ReviewsList from "~/components/ratings/ReviewsList";

const StickyAppBar = styled(AppBar)({
  position: "sticky",
  top: 55,
  zIndex: 1000,
  boxShadow: "none",
  borderBottom: "1px solid #e0e0e0",
  backgroundColor: "white",
});
