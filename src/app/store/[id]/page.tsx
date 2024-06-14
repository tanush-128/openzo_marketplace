import StoreInfo from "../storeInfo";
import { Products } from "../products";
import SearchBar from "../search";
import { Product } from "~/models/product";
import { SalesProvider } from "~/providers/salesContext";
import StorePageDynamic from "./pageElements";

// import { useEffect, useState } from "react";

interface CategorizedProducts {
  [category: string]: Product[];
}

export type { CategorizedProducts };


export default async function StorePage({
  params,
}: {
  params: { id: string };
}) {
  var storeId = params.id;
  var products: Product[] = await Product.fetchMany(storeId);

  var productsObj = products.map((product) => product.toJson());

  return (

    <div>
      <StorePageDynamic storeID={storeId} productsObj={productsObj} />
    </div>

  );
}




