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

export function Products({ storeId }: { storeId: number }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categorizedProducts, setCategorizedProducts] =
    useState<CategorizedProducts>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Product.fetchByStore(storeId);

        setProducts(response);
        setCategorizedProducts(categorizeProducts(response));
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white px-4">
      <SearchBar products={products} />
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
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
      </Accordion>
    </div>
  );
}
