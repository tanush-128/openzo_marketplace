"use client";

import { useEffect, useRef } from "react";
import ServiceCard from "~/components/product/ServiceCard";
import ProductCard from "~/components/product/productCard";
import VerticalProductCard from "~/components/product/verticalProduct";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Product } from "~/models/product";
import "~/styles/globals.css";
import { useCategoryContext } from "./CategoryContext";
import CategoryMenu from "./CategoryMenu";

interface CategorizedProducts {
  [category: string]: Product[];
}

function categorizeProducts(products: Product[]): CategorizedProducts {
  const categories: CategorizedProducts = {};

  for (const product of products) {
    if (categories[product.category]) {
      categories[product.category]?.push(product);
    } else {
      categories[product.category] = [product];
    }
  }

  return categories;
}

export function Products({
  productsObj,
  storeType,
  sendMessageToFlutterChannel,
}: {
  productsObj: any;
  storeType: string;
  sendMessageToFlutterChannel: (message: string) => void;
}) {
  const products: Product[] = [];
  const categoryKeys: { [key: string]: React.RefObject<HTMLDivElement> } = {};

  const { setCategories, setCategoryKeys } = useCategoryContext();

  for (const obj of productsObj) {
    const product = Product.fromJson(obj);
    if (product.type !== "post") products.push(product);
  }

  const categorizedProducts = categorizeProducts(products);

  useEffect(() => {
    setCategories(categorizedProducts);
    setCategoryKeys(categoryKeys);
  }, []);

  const buildContent = (categoryKey: string) => {
    const products = categorizedProducts[categoryKey] ?? [];
    if (storeType === "food") {
      return (
        <div className="flex flex-col space-y-0">
          {products?.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              sendMessageToFlutterChannel={sendMessageToFlutterChannel}
            />
          ))}
        </div>
      );
    } else if (storeType === "service") {
      return (
        <div className="flex flex-col space-y-2">
          {products.map((product, index) => (
            <ServiceCard key={index} product={product} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-2 gap-0.5">
          {products.map((product, index) => (
            <VerticalProductCard key={index} product={product} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="relative bg-gray-100 p-0 text-black">
      {/* Sticky FilterBar */}


      {/* Accordion Content */}
      <div className="relative">
        <Accordion
          type="multiple"
          defaultValue={Object.keys(categorizedProducts).map(
            (category, index) => `category-${index}`,
          )}
          className="w-full"
        >
          {Object.keys(categorizedProducts).map((category, index) => {
            categoryKeys[category] = useRef<HTMLDivElement>(null);

            return (
              <AccordionItem
                ref={categoryKeys[category]}
                key={index}
                value={`category-${index}`}
              >
                <AccordionTrigger className="bg-white px-4 text-xl font-extrabold">
                  {category}
                </AccordionTrigger>
                <AccordionContent>{buildContent(category)}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
