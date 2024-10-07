import { Product } from "~/models/product";
import StorePageDynamic from "../pageElements";
import { Store } from "~/models/store";
import { Metadata } from "next";
import GlobalConsts, { StoreType } from "~/constants/constants";
import "~/styles/globals.css";
import Script from "next/script";
import { cookies } from "next/headers";

interface CategorizedProducts {
  [category: string]: Product[];
}

export type { CategorizedProducts };

export async function generateStaticParams() {
  var stores = await Store.getStoresWithPincode("576104");
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
    title: `${store.name} - ${store.sub_category} in Manipal`,
    description: `${store.name} Manipal, 576107, 576104, ${store.sub_category} - ${store.category} 

    ${store.description} 
        ${
          GlobalConsts.categories.find(
            (category) => category.name === store.category,
          )?.metaDescription
        } near me, in Manipal
    `,

    keywords:
      GlobalConsts.categories
        .find((category) => category.name === store.category)
        ?.metaTags.join(",") + " Manipal",

    openGraph: {
      images: [
        {
          url: store.image,
          width: 800,
          height: 600,
          alt: store.name,
        },
      ],
    },
  };
}

export default async function StorePage({
  params,
}: {
  params: { storeId: string };
}) {
  var storeId = params.storeId;
  var store: Store = await Store.fetchStore(storeId);

  var products: Product[] = await Product.fetchMany(storeId);

  var productsObj = products.map((product) => product.toJson());
  var storeObj = store.toJson();
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  console.log(allCookies);
  const userId = cookieStore.get("userId")?.value;
  const token = cookieStore.get("token")?.value;
  console.log(userId);
  return (
    <html>
      <head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: store.name,
              description: store.description,
              image: store.image,
              geo: {
                "@type": "GeoCoordinates",
                latitude: 13.35129,
                longitude: 74.79271,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: store.rating,
                reviewCount: store.review_count,
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: store.address,
                addressLocality: "Manipal",
                postalCode: "576107",
                addressRegion: "KA",
                addressCountry: "IN",
              },
              telephone: store.phone,
              url: `https://openzo.com/store/${store.id}`,
            }),
          }}
        />
      </head>
      <body className="mx-auto max-w-lg">
        <div>
          <StorePageDynamic
            storeID={storeId}
            storeObj={storeObj}
            productsObj={productsObj}
            userID={userId}
            token={token}
            storeType={
              GlobalConsts.categories.find(
                (category) => category.name === store.category,
              )?.type || StoreType.Store
            }
          />
        </div>
      </body>
    </html>
  );
}
