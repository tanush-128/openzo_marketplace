"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { ColorVariant, Product, SizeVariant } from "~/models/product";
import useSalesStore from "~/providers/salesStore";
interface ProductCardProps {
  product: Product;
  addable?: boolean;
  _quantity?: number;
  sendMessageToFlutterChannel?: (message: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  addable = true,
  _quantity = 0,
  sendMessageToFlutterChannel,
}) => {
  // const addable = true;
  // const [quantity, setQuantity] = useState(0);
  // const quantity = 0;
  const [selectedSize, setSelectedSize] = useState<SizeVariant | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  let { cart, updateSaleOrderItems } = useSalesStore((state) => ({
    // onlineOrders: state.onlineOrders,
    cart: state.getSaleByStoreId(product.store_id),
    updateSaleOrderItems: state.updateSaleOrderItems,
  }));

  // let orderItem = cart?.orderItems.find(item => item.product_id === product.id);
  // let quantity = orderItem?.quantity || 0;
  const [quantity, setQuantity] = useState(0);

  // Update quantity and selected size/color based on cart prop
  product = Product.fromJson(product);

  useEffect(() => {
    setQuantity(_quantity);
    if (cart !== null) {
      const orderItem = cart.order_items.find(
        (item) => item.product_id === product.id,
      );
      if (orderItem) {
        setQuantity(orderItem.quantity);
        setSelectedSize(
          product.size_variants.find(
            (variant) => variant.id === orderItem.size_variant_id,
          ) || null,
        );
        setSelectedColor(
          product.color_variants.find(
            (variant) => variant.id === orderItem.color_variant_id,
          ) || null,
        );
      }
    }
  }, [cart?.order_items.find((item) => item.product_id === product.id)]);

  // Function to handle adding or updating quantity
  const handleUpdateQuantity = (quantityChange: number) => {
    updateSaleOrderItems(
      product,
      selectedSize,
      selectedColor,
      quantityChange,
    ).then(() => {
      // setQuantity((prevQuantity) => prevQuantity + quantityChange);
      const cartId = useSalesStore
        .getState()
        .getSaleByStoreId(product.store_id)?.id;
      sendMessageToFlutterChannel?.(cartId || "");
    });
  };

  return (
    <div className="mx-1   border-[1.5px] border-gray-100 bg-white  p-4 shadow-sm">
      <div className=" w-full   rounded-lg">
        <div className="flex items-start justify-between">
          <div className=" flex-col items-start justify-start">
            {product.type === "food" && (
              <img
                src={
                  product.veg_type === "Veg"
                    ? "/assets/icons/veg.png"
                    : "/assets/icons/non-veg.png"
                }
                className="mr-1 h-5 w-5"
              />
            )}
            <h2 className="mt-2 text-left text-lg font-semibold">
              {product.name}
            </h2>
            {product.mrp !== product.discount_price ? (
              <div className="mt-1 flex items-center">
                <span className="text-base font-semibold text-primary">{`₹ ${product.discount_price}`}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">{`₹ ${product.mrp}`}</span>
                <span className="ml-2 text-sm font-semibold text-primary">{`- ${(100 - (product.discount_price / product.mrp) * 100).toFixed(0)}%`}</span>
              </div>
            ) : (
              <div className="flex">
                <span className="text-primary-500 text-left text-lg font-semibold">{`₹ ${product.mrp}`}</span>
              </div>
            )}
            {product.description.length > 2 && (
              <p className="mt-1 text-left text-sm text-gray-600">
                {product.description}
              </p>
            )}
            {addable ? (
              <div className="mt-2 flex">
                {quantity ?? 0 > 0 ? (
                  <div className="mt-1 flex items-center rounded-lg border border-primary bg-[#ff85a0] bg-opacity-10 px-1 py-[2px] text-base font-semibold text-primary">
                    <button
                      className=" px-2 pr-3 text-lg text-primary"
                      onClick={() => handleUpdateQuantity(-1)}
                    >
                      -
                    </button>
                    <span className="  font-semibold text-black">
                      {quantity ?? 0}
                    </span>
                    <button
                      className=" px-2   pl-3 text-lg text-primary"
                      onClick={() => handleUpdateQuantity(1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-1 rounded-lg border border-primary bg-[#ff85a0] bg-opacity-10 px-5 py-[4px] text-base font-semibold text-primary"
                    onClick={() => handleUpdateQuantity(1)}
                  >
                    ADD
                  </button>
                )}
              </div>
            ) : (
              <p className="mt-1 text-sm text-gray-600">{`Quantity: ${quantity}`}</p>
            )}
          </div>
          {product.images.length > 0 && (
            <img
              src={product.images[0]!.image}
              className="  max-w-[33%] rounded-lg border-2 border-gray-200 object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

//  <Drawer>
//    <DrawerTrigger className="w-full"></DrawerTrigger>
//    <DrawerContent>
//      <DrawerHeader>
//        <DrawerTitle>{product.name}</DrawerTitle>
//        <DrawerDescription>{product.description}</DrawerDescription>
//      </DrawerHeader>
//      <Carousel
//        className=" w-full"
//        plugins={[]}
//        opts={{
//          loop: true,
//          // align: "center",
//          direction: "ltr",

//          // active:
//        }}
//      >
//        <CarouselContent>
//          {product.images?.map((image, index) => (
//            <CarouselItem key={index}>
//              <Image
//                src={image.image}
//                alt={product.name}
//                width={200}
//                height={200}
//                className="mx-auto rounded-lg"
//              />
//            </CarouselItem>
//          ))}
//        </CarouselContent>
//        <CarouselPrevious />
//        <CarouselNext />
//      </Carousel>

//      <DrawerFooter>
//        {/* <h3 className="text-lg font-semibold">{product.name}</h3> */}

//        <div className="mx-auto">
//          {product.discount_price !== product.mrp ? (
//            <>
//              <span className="mr-2 font-semibold ">
//                ₹ {product.discount_price}
//              </span>
//              <span className="text-gray-500 line-through">₹ {product.mrp}</span>
//            </>
//          ) : (
//            <span>₹ {product.mrp}</span>
//          )}
//        </div>
//        <DrawerClose>
//          <Button variant="outline">Cancel</Button>
//        </DrawerClose>
//      </DrawerFooter>
//    </DrawerContent>
//  </Drawer>;
