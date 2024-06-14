"use client";
import { useEffect, useState } from 'react';
import { useSales } from '~/providers/salesContext';
import Image from "next/image";

// import Autoplay from "embla-carousel-autoplay";
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
import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { ColorVariant, Product, SizeVariant } from '~/models/product';
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // const [quantity, setQuantity] = useState(0);
  // const quantity = 0;
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState<SizeVariant | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | undefined>(undefined);
  const { onlineOrders, placedOrders, unplacedOrders, deliveredOrders, fetching, getOrders, updateOrderStatus, addSale, updateSale, updateSaleOrderItems, isInCart } = useSales();

  // Update quantity and selected size/color based on cart prop
  product = Product.fromJson(product);
  console.log('product', product.type?.toString());

  useEffect(() => {
    if (onlineOrders.length > 0) {
      const cart = onlineOrders.find(order => order.storeId === product.store_id);
      if (cart !== undefined) {
        const orderItem = cart.orderItems.find(item => item.product_id === product.id);
        if (orderItem) {
          setQuantity(orderItem.quantity);
          setSelectedSize(product.size_variants.find(variant => variant.id === orderItem.size_variant_id));
          setSelectedColor(product.colorVariants.find(variant => variant.id === orderItem.color_variant_id));
        }
      }
    }
  }
    , [onlineOrders, product]);

  // Function to handle adding or updating quantity
  const handleUpdateQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);
    updateSaleOrderItems(product, selectedSize, selectedColor, newQuantity);
    // Implement your logic to update sale order items
  };

  // Function to handle size change
  const handleSizeChange = (value: SizeVariant | undefined) => {
    setSelectedSize(value);
    updateSaleOrderItems(product, selectedSize, selectedColor, quantity);

  };

  // Function to handle color change
  const handleColorChange = (value: ColorVariant | undefined) => {
    setSelectedColor(value);
    updateSaleOrderItems(product, selectedSize, selectedColor, quantity);
  };

  const addable = true;

  return (
    <div className='bg-white shadow-sm p-2 mb-2'>

    <Drawer>
      <DrawerTrigger className='w-full' >
       

        <div className=" rounded-lg   w-full">
          <div className="flex justify-between items-start">
            <div className="flex-1 flex-col justify-start justify-items-start" >
              {product.type === 'food' && (
                <img src={product.veg_type === 'Veg' ? '/assets/icons/veg.png' : '/assets/icons/non-veg.png'} className="w-5 h-5 mr-1" />
              )}
              <h2 className="text-lg font-semibold mt-2 text-left">{product.name}</h2>
              {product.mrp !== product.discount_price ? (
                <div className="flex items-center mt-1">
                  <span className="text-primary text-base font-semibold">{`₹ ${product.discount_price}`}</span>
                  <span className="text-gray-500 text-sm line-through ml-2">{`₹ ${product.mrp}`}</span>
                  <span className="text-primary text-sm font-semibold ml-2">{`- ${(100 - (product.discount_price / product.mrp) * 100).toFixed(0)}%`}</span>
                </div>
              ) : (
                <div className='flex'>
                  <span className="text-primary-500 text-lg font-semibold text-left">{`₹ ${product.mrp}`}</span>

                </div>
              )}
              <p className="text-gray-600 text-sm mt-1 text-left">{product.description}</p>
            
            </div>
            {product.images.length > 0 && (
              <img src={
                product.images[0]!.image
                
              } className="w-20 h-20 rounded-lg border-2 border-gray-200 object-contain" />
            )}
          </div>
        </div>
          

      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{product.name}</DrawerTitle>
          <DrawerDescription>{product.description}</DrawerDescription>
        </DrawerHeader>
        <Carousel
          className=" w-full"
          plugins={[]}
          opts={{
            loop: true,
            // align: "center",
            direction: "ltr",
            
            // active:
          }}
          >
          <CarouselContent>
            {product.images?.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="mx-auto rounded-lg"
                  />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <DrawerFooter>
          {/* <h3 className="text-lg font-semibold">{product.name}</h3> */}

          <div className="mx-auto">
            {product.discount_price !== product.mrp ? (
              <>
                <span className="mr-2 font-semibold ">
                  ₹ {product.discount_price}
                </span>
                <span className="text-gray-500 line-through">
                  ₹ {product.mrp}
                </span>
              </>
            ) : (
              <span>₹ {product.mrp}</span>
            )}
          </div>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
      {addable ? (
        <div className="">
          {quantity > 0 ? (
            <div className="flex items-center">
              <button className="px-2 py-1 border border-primary text-primary rounded-lg" onClick={() => handleUpdateQuantity(quantity - 1)}>-</button>
              <span className="px-3 py-1 bg-primary text-white font-semibold mx-1 rounded-lg">{quantity}</span>
              <button className="px-2 py-1 border border-primary text-primary rounded-lg" onClick={() => handleUpdateQuantity(quantity + 1)}>+</button>
            </div>
          ) : (
            <button className="px-4 py-2 bg-primary text-white font-semibold rounded-lg mt-1" onClick={() => handleUpdateQuantity(1)}>ADD</button>
          )}
        </div>
      ) : (
        <p className="text-gray-600 text-sm mt-1">{`Quantity: ${quantity}`}</p>
      )}
            </div>
  );
};

export default ProductCard;




// / Adjust path based on your project structure


// import { Product, SizeVariant, ColorVariant } from '~/models/product';
// interface ProductCardProps {
//   product: Product;
//   // cart?: SaleData;
//   addable?: boolean;
// }

// const _ProductCard: React.FC<ProductCardProps> = ({ product, addable = true }) => {

//   return (
   
//   );
// };

// export default ProductCard;
