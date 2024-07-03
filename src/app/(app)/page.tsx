import AdSpace from "~/widgets/adCarousel";
import Separator from "~/widgets/separator";
import { StoresList } from "../storesList";
import Image from "next/image";
import GlobalSearchBar from "~/components/search/globalSearchBar";
import CategoryGrid from "./mainCategories";
import { Poppins } from "next/font/google";
import Logo from "public/assets/icons/Openzo User App final.png";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function HomePage() {
  return (
    <div className={poppins.className}>
      <div className="z-50  bg-primary p-2 text-white">
        <div className="ml-2 mt-2 flex items-center gap-4">
          <Image
            alt="logo"
            src={Logo}
            width={50}
            height={50}
            className="rounded-lg"
          />
          <h1 className="text-left  text-3xl font-bold ">Openzo</h1>
        </div>
      </div>
      <div className="sticky top-0 z-50  ">
        {/* <SearchBar /> */}
        <div className="p-2">
          <GlobalSearchBar />
        </div>
      </div>

      <AdSpace />
      {/* <MainCategories />
       */}
      <Separator title="Explore" />
      <CategoryGrid />
      <div className="h-4" />

      <div className="h-2" />
      {/* <StoreCategories /> */}
      <div className="h-4" />

      <Separator title="Featured Stores" />
      <div className="h-2" />

      <StoresList />
    </div>
  );
}

// export default MainCategoryTile;
