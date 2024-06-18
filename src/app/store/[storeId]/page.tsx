
import { Product } from "~/models/product";
import StorePageDynamic from "../pageElements";
import { Store } from "~/models/store";
import { Metadata } from "next";


interface CategorizedProducts {
  [category: string]: Product[];
}

export type { CategorizedProducts };

export async function generateStaticParams() {
  var stores = await Store.getStoresWithPincode("123456");
  return stores.map((store) => ({ storeId: store.id }));

}

export async function generateMetadata({
  params,
}: {
  params: { storeId: string };
}): Promise<Metadata> {
  var storeId = params.storeId;

  var store: Store = await Store.fetchStore(storeId);

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
  params: { storeId: string };
}) {
  var storeId = params.storeId;
  var products: Product[] = await Product.fetchMany(storeId);

  var productsObj = products.map((product) => product.toJson());

  return (

    <div >
          <StorePageDynamic storeID={storeId} productsObj={productsObj} />

    </div>

  );
}




