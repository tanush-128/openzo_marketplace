
import { Product } from "~/models/product";
import StorePageDynamic from "./pageElements";

import { Store } from "~/models/store";
import { Metadata } from "next";



// import { useEffect, useState } from "react";

interface CategorizedProducts {
  [category: string]: Product[];
}

export type { CategorizedProducts };

export async function generateStaticParams() {
  var stores = await Store.getStoresWithPincode("123456");
  return stores.map((store) => ({ id: store.id }));

}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  var storeId = params.id;

  var store: Store = await Store.fetchStore(storeId);
  // var products: Product[] = await Product.fetchMany(storeId);

  return {
    title: store.name,
    description: `${store.name} ${store.subCategory} ${store.description}`,

    openGraph: {
      images: [
        {
          url: store.image,
          width: 800,
          height: 600,
          alt: store.name,
        },
      ],
    }
  }
}

export default async function StorePage({
  params,
}: {
  params: { id: string };
}) {
  var storeId = params.id;
  var products: Product[] = await Product.fetchMany(storeId);
  var store = await Store.fetchStore(storeId);
  var productsObj = products.map((product) => product.toJson());
  var metaContent = store.name + " " + store.subCategory + " " + store.description;
  return (
    //meta description
    <div >
      <meta name="description" content={metaContent} />
      <StorePageDynamic storeID={storeId} productsObj={productsObj} />
    </div>

  );
}




