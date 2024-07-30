"use client";
import React, { useEffect, useState } from "react";

import { Product, SizeVariant, ColorVariant } from "~/models/product";
import ProductPageSkeleton from "../components/ProductPageSkeleton";
import ProductImagesCarousel from "../components/ProductImagesCarousel";
import SimilarProducts from "../components/SimilarProducts";
import MoreBySameSeller from "../components/MoreBySameSeller";
import useSalesStore from "~/providers/salesStore";
import GlobalSearchBar from "~/components/search/globalSearchBar";
import { useRouter } from "next/navigation";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeVariant | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const productId = params.id;
  const router = useRouter();
  const { isInCart, updateSaleOrderItems, getSaleByStoreId } = useSalesStore();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const fetchedProduct = await Product.fetchOne(productId);
        setProduct(fetchedProduct);
        setSelectedSize(fetchedProduct.size_variants[0] || null);
        setSelectedColor(fetchedProduct.color_variants[0] || null);
      } catch (error) {
        setError("Failed to fetch product details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-red-500">Product not found.</div>;
  }

  return (
    <div className="mx-auto min-h-screen max-w-lg bg-gray-50">
      <div className="sticky top-0 z-30 mx-auto flex max-w-7xl justify-center bg-white px-3 py-2 md:px-4 lg:px-8">
        <GlobalSearchBar />
      </div>

      <div className="lg:p-4">
        <div className="mb-4 bg-white p-4">
          <ProductImagesCarousel images={product.images} />
        </div>

        <div className="mb-4 bg-white p-4">
          <h1 className="mb-2 text-xl font-semibold">
            {product.name.toUpperCase()}
          </h1>
          <p className="mb-4 text-lg">{product.description}</p>
          {product.mrp !== product.discount_price ? (
            <div className="mb-2 flex items-center">
              <div className="mr-2 font-semibold text-green-500">
                {(
                  ((product.mrp - product.discount_price) / product.mrp) *
                  100
                ).toFixed(0)}
                % OFF
              </div>
              <div className="mr-2 text-gray-500 line-through">
                ₹{product.mrp}
              </div>
              <div className="text-xl font-semibold">
                ₹{product.discount_price}
              </div>
            </div>
          ) : (
            <div className="text-xl font-semibold">₹{product.mrp}</div>
          )}
        </div>

        {product.size_variants.length > 0 && (
          <div className="mb-4 bg-white p-4">
            <h2 className="mb-2 text-xl font-bold">Size:</h2>
            <div className="flex space-x-2">
              {product.size_variants.map((size) => (
                <button
                  key={size.size}
                  className={`rounded border p-2 ${selectedSize === size ? "bg-primary text-white" : "bg-white text-black"}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.color_variants.length > 0 && (
          <div className="mb-4 bg-white p-4">
            <h2 className="mb-2 text-xl font-bold">Color:</h2>
            <div className="flex space-x-2">
              {product.color_variants.map((color) => (
                <button
                  key={color.color}
                  className={`rounded border p-2 ${selectedColor === color ? "bg-primary text-white" : "bg-white text-black"}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color.color}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto  max-w-lg bg-white px-4">
          {isInCart(product.id) ? (
            <button
              className="w-full  bg-primary p-4 text-white"
              onClick={() => {
                router.push(`/cart/${getSaleByStoreId(product.store_id)!.id}`);
              }}
            >
              View Cart
            </button>
          ) : (
            <button
              className="w-full  bg-primary p-4 text-white"
              onClick={() =>
                updateSaleOrderItems(product, selectedSize, selectedColor, 1)
              }
            >
              Add to Cart
            </button>
          )}
        </div>

        <SimilarProducts product={product} />
        <MoreBySameSeller product={product} />
      </div>
    </div>
  );
};

export default ProductPage;
