import { MetadataRoute } from "next";
import { Store } from "~/models/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
  var stores = await Store.getStoresWithPincode("576104");
  const storeEntries: MetadataRoute.Sitemap = stores.map((store) => ({
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/store/${store.id}`,
    lastModified: new Date(),
  }));
  return [
    {
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/`,
      lastModified: new Date(),
    },
    ...storeEntries,
  ];
}
