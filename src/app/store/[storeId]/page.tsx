import { Product } from "~/models/product";
import StorePageDynamic from "../pageElements";
import { Store } from "~/models/store";
import { Metadata } from "next";
import GlobalConsts from "~/constants/constants";
import "~/styles/globals.css";
import Script from "next/script";

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
          <StorePageDynamic storeID={storeId} productsObj={productsObj} />
        </div>
      </body>
    </html>
  );
}
