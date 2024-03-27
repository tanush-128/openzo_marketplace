"use client";
import { Product } from "~/models/product";
import { Store, StoreData, StoreType } from "~/models/store";
import AdSpace from "~/widgets/adCarousel";
import ProductCard from "~/widgets/productCard";
import StoreCard from "~/widgets/storeCard";
import { StoresList } from "./storesList";
import Separator from "~/widgets/separator";
import StoreCategories from "./categories";
import MainCategories from "./mainCategories";
import SearchBar from "./search";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <div className="z-50  bg-primary p-2 text-white">
        <div className="ml-2 mt-2 flex items-center gap-4">
          <Image
            alt="logo"
            src="/assets/images/logo.png"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <h1 className="text-left  text-3xl font-bold">Openzo</h1>
        </div>
      </div>
      <div className="sticky top-0 z-50 bg-primary  py-2 ">
        <SearchBar />
      </div>
      <AdSpace />
      <MainCategories />
      <div className="h-4" />

      <Separator title="Explore" />
      <div className="h-2" />
      <StoreCategories />
      <div className="h-4" />

      <Separator title="Featured Stores" />
      <div className="h-2" />

      <StoresList />
    </div>
  );
}
