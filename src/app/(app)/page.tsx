import AdSpace from "~/widgets/adCarousel";
import Separator from "~/widgets/separator";
import { StoresList } from "../storesList";
import Image from "next/image";
import GlobalSearchBar from "~/components/search/globalSearchBar";
import CategoryGrid from "./mainCategories";
import { Poppins } from "next/font/google";
import Logo from "public/assets/icons/Openzo User App final.png";
import Link from "next/link";

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
        <div className="w-full bg-white p-2 px-4 shadow-md">
          <GlobalSearchBar />
        </div>
      </div>

      <AdSpace />
      {/* <MainCategories />
       */}
      <div className="h-4" />
      <Separator title="Explore" />
      <div className="h-4" />
      <CategoryGrid />
      <div className="h-4" />
      <Separator title="Services you might like" />
      <div className="h-4" />

      <Banners />
      <div className="h-2" />
      {/* <StoreCategories /> */}
      {/* <div className="h-4" /> */}

      {/* <Separator title="Featured Stores" /> */}
      <div className="h-2" />

      <StoresList />
    </div>
  );
}

//  SingleChildScrollView(
//                   scrollDirection: Axis.horizontal,
//                   child: Row(
//                     children: [
//                       _buildBanner(
//                           '/food-delivery', "Food Delivery.GS", context),
//                       _buildBanner('/grocery-delivery', "Grocery Delivery.GS",
//                           context),
//                       _buildBanner(
//                           '/home-services', "Home Services.GS", context),
//                       _buildBanner('/campus-only', "MIT.GS", context),
//                       _buildBanner('/stores', "Shop.GS", context),
//                     ],
//                   ),
//                 ),

// { title: "Food delivery", link: "/category/Food" },
// { title: "Service stores", link: "/category/Services" },
// { title: "Stores", link: "/category/Stores" },
// { title: "Grocery delivery", link: "/category/Grocery delivery" },
// { title: "Services", link: "/category/Home Services" },
// // MainCategoryTile(title: 'MIT Campus only', route: '/campus-only'),
// {
//   title: "MIT Campus only",
//   link: "/category/MIT Campus only",
// },

const Banners = () => {
  return (
    <div className="no-scrollbar flex overflow-x-auto">
      {/* <Banner route="/food-delivery" image="Food Delivery.GS" />
      <Banner route="/grocery-delivery" image="Grocery Delivery.GS" />
      <Banner route="/home-services" image="Home Services.GS" />
      <Banner route="/campus-only" image="MIT.GS" />
      <Banner route="/stores" image="Shop.GS" /> */}

      <Banner route="/category/Food" image="Food Delivery.GS" />
      <Banner route="/category/Grocery delivery" image="Grocery Delivery.GS" />
      <Banner route="/category/Home Services" image="Home Services.GS" />
      <Banner route="/category/MIT Campus only" image="MIT.GS" />
      <Banner route="/category/Stores" image="Shop.GS" />
    </div>
  );
};

const Banner = ({ route, image }: { route: string; image: string }) => {
  return (
    <Link href={route} className="mx-2 my-2   min-w-[200px]">
      <Image
        src={"/assets/images/Graphic Slides/" + image + ".png"}
        alt="banner"
        height={200}
        width={200}
        // layout="fill"
        objectFit="cover"
      />
    </Link>
  );
};

// export default MainCategoryTile;
