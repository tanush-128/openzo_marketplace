
// "use client";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "~/components/ui/accordion";
// import { Product } from "~/models/product";
// import ProductCard from "~/widgets/productCard";
// import { CategorizedProducts } from "./[storeId]/page";
// import VerticalProductCard from "~/components/product/verticalProduct";
// import ServiceCard from "~/components/product/ServiceCard";





// function categorizeProducts(products: Product[]): CategorizedProducts {
//   const categories: CategorizedProducts = {};

//   for (const product of products) {
//     if (categories[product.category]) {
//       categories[product.category]?.push(product);
//     } else {
//       categories[product.category] = [product];
//     }
//   }

//   return categories;
// }

// export function Products({
//   productsObj,
// }: {
//   productsObj: any;
// }) {

//   var products: Product[] = productsObj.map((product: any) => Product.fromJson(product));

//   const categorizedProducts = categorizeProducts(products);

//   // console.log('cart', cart);
//   return (
//     <div className="bg-white px-4">
//       <Accordion
//         type="single"
//         collapsible
//         className="w-full"

//         defaultValue="category-0"
//       >
//         {Object.keys(categorizedProducts).map((category, index) => (
//           <AccordionItem key={index} value={`category-${index}`}>
//             <AccordionTrigger>{category}</AccordionTrigger>
//             <AccordionContent>
//               {categorizedProducts[category]?.map((product, index) => (
//                 // <ProductCard key={index} product={product} />
//                 // <VerticalProductCard key={index} product={product} />
//                 <ServiceCard key={index} product={product} />
//               ))}
//             </AccordionContent>
//           </AccordionItem>
//         ))}

//       </Accordion>
//     </div>
//   );
// }


"use client";

import ServiceCard from "~/components/product/ServiceCard";
import VerticalProductCard from "~/components/product/verticalProduct";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Product} from "~/models/product";
import ProductCard from "~/components/product/productCard";
// import ProductCard from "~/components/product/ProductCard";
// import VerticalProductCard from "~/components/product/VerticalProductCard";
// import ServiceCard from "~/components/product/ServiceCard";
// import FilterBar from "~/components/product/FilterBar";

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
}: {
  productsObj: any;
  storeType: string;
}) {
  const products: Product[] = productsObj.map((product: any) =>
    // productFromJson(product)
    Product.fromJson(product)
  );

  const categorizedProducts = categorizeProducts(products);

  const buildContent = (categoryKey: string) => {
    const products = categorizedProducts[categoryKey] ?? [];
    if (storeType === 'food') {
      return (
        <div className="flex flex-col space-y-2">
          {products?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      );
    } else if (storeType === 'service') {
      return (
        <div className="flex flex-col space-y-2">
          {products.map((product, index) => (
            <ServiceCard key={index} product={product} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-2 gap-1">
          {products.map((product, index) => (
            <VerticalProductCard key={index} product={product} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-50 p-0">
      {/* <FilterBar /> */}
      <Accordion type="multiple" defaultValue={
          Object.keys(categorizedProducts).map((category, index) => `category-${index}`)
      } className="w-full" >
        {Object.keys(categorizedProducts).map((category, index) => (
          <AccordionItem key={index} value={`category-${index}`}  >
            <AccordionTrigger className="px-2">{category}</AccordionTrigger>
            <AccordionContent >
              {buildContent(category)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
