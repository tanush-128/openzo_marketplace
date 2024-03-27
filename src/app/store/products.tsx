"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Product } from "~/models/product";
import ProductCard from "~/widgets/productCard";
import SearchBar from "./search";
import { CategorizedProducts } from "./[id]/page";


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
  categorizedProducts,
}: {
  categorizedProducts: CategorizedProducts;
}) {


  return (
    <div className="bg-white px-4">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        // defaultValue={Object.keys(categorizedProducts).map(
        //   (category, index) => `category-${index}`,
        // )}
        defaultValue="category-0"
      >
        {Object.keys(categorizedProducts).map((category, index) => (
          <AccordionItem key={index} value={`category-${index}`}>
            <AccordionTrigger>{category}</AccordionTrigger>
            <AccordionContent>
              {categorizedProducts[category]?.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
       
      </Accordion>
    </div>
  );
}
