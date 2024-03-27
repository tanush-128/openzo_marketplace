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

export default function HomePage() {
  return (
    <div>
      <div className="bg-primary  z-50 p-2 text-white">
        <h1 className="text-center text-xl font-bold">Openzo</h1>
      </div>
      <div className="bg-primary sticky top-0 z-50  py-2 ">
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
