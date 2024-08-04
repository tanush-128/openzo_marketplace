"use client";
// import { SalesProvider } from "~/providers/salesContext"
import { NavBar, Space } from "antd-mobile";
import { SearchOutline } from "antd-mobile-icons";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import GlobalConsts, { StoreType } from "~/constants/constants";
import { Store } from "~/models/store";
import useSalesStore from "~/providers/salesStore";

import { Products } from "./products";
import StoreInfo from "./storeInfo";
import { Swiper, Tabs } from "antd-mobile";
import { useRef } from "react";

import { SwiperRef } from "antd-mobile/es/components/swiper";
import { useRouter } from "next/navigation";
import ReviewsList from "~/components/ratings/ReviewsList";
import SearchBar from "./search";
import CategoryMenuButton, { CategoryMenu } from "./CategoryMenu";

import { CategoryProvider } from "./CategoryContext";

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
  const router = useRouter();

  const [showSearch, setShowSearch] = useState(false);

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
        console.log(storeType);
        if (storeType === StoreType.Food) {
          // tabItems[0]?.title == "Menu";
          setTabItems([
            { key: "products", title: "Menu" },
            { key: "reviews", title: "Reviews" },
            { key: "posts", title: "Posts" },
          ]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [storeID]);

  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ "--gap": "16px" }}>
        <div onClick={() => setShowSearch(true)}>
          <SearchOutline />
        </div>
        {/* <MoreOutline /> */}
        {/* <Location */}
      </Space>
    </div>
  );

  const back = () => router.back();

  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  var _tabItems = [
    { key: "products", title: "Products" },
    { key: "reviews", title: "Reviews" },
    { key: "posts", title: "Posts" },
  ];
  const [tabItems, setTabItems] = useState(_tabItems);
  const scrollToTop = () => {
    if (containerRef.current && activeIndex === 1) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    console.log(storeType);
    if (storeType === StoreType.Food) {
      setTabItems([
        { key: "products", title: "Menu" },
        { key: "reviews", title: "Reviews" },
        { key: "posts", title: "Posts" },
      ]);
    }
  }, [storeType]);

  return (
    <CategoryProvider>
      <div className="max-w-xl">
        <div className="sticky top-0 z-50  bg-white  py-1">
          <Suspense fallback={<div>... loading</div>}>
            {!showSearch && (
              <NavBar
                right={right}
                back={false}
                backIcon={false}
                // onBack={back}
                className="text-left font-semibold"
                left={<div className="flex text-lg">{store?.name}</div>}
              >
                {/* <div className="flex">{store?.name}</div> */}
              </NavBar>
            )}
          </Suspense>
          {showSearch && (
            <SearchBar
              productsObj={productsObj}
              onClose={() => setShowSearch(false)}
            />
          )}
        </div>

        <StoreInfo store={store} storeType={storeType} />
        <Suspense fallback={<div>Loading...</div>}>
          <div ref={containerRef}>
            <div className="sticky top-12 z-20 bg-white">
              <Tabs
                style={{
                  "--active-line-color": "#CD113B",
                  "--active-title-color": "#CD113B",
                }}
                activeKey={tabItems[activeIndex]?.key}
                onChange={(key) => {
                  const index = tabItems.findIndex((item) => item.key === key);
                  setActiveIndex(index);
                  swiperRef.current?.swipeTo(index);
                }}
              >
                {tabItems.map((item) => (
                  <Tabs.Tab
                    title={item.title}
                    key={item.key}
                    className={"text-sm "}
                  />
                ))}
              </Tabs>
            </div>
            <Swiper
              direction="horizontal"
              loop
              indicator={() => null}
              ref={swiperRef}
              defaultIndex={activeIndex}
              onIndexChange={(index) => {
                setActiveIndex(index);
                console.log(index);
                scrollToTop();
                if (index === 1) {
                  // Assuming 1 is the index for Reviews tab
                }
              }}
            >
              <Swiper.Item>
                {activeIndex === 0 && (
                  <Products productsObj={productsObj} storeType={storeType} />
                )}
              </Swiper.Item>
              <Swiper.Item>
                <ReviewsList
                  storeId={storeID}
                  store={store}
                  onScrollToTop={scrollToTop}
                />
              </Swiper.Item>
              <Swiper.Item>
                <div>蚂蚁</div>
              </Swiper.Item>
            </Swiper>
          </div>
        </Suspense>
        {cart?.total_amount && (
          <div className="fixed bottom-0 z-50 w-full max-w-lg bg-white p-2">
            <div className="flex justify-between">
              <div>
                <p className="text-sm">Total: ₹{cart.total_amount}</p>
                <p className="text-xs">
                  Items:{" "}
                  {cart.order_items.filter((item) => item.quantity > 0).length}
                </p>
              </div>
              <button
                className="flex items-center rounded-lg bg-primary px-4 py-1 text-white"
                onClick={() => {
                  console.log(cart.id);
                  // router.push(`/cartxgdf`);
                  router.replace(`/cart/${cart.id}`);
                }}
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
              </button>
            </div>
          </div>
        )}
        <CategoryMenu />
        <CategoryMenuButton />
      </div>
    </CategoryProvider>
  );
};

export default StorePageDynamic;
