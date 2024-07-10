import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ProductImage } from "~/models/product";

// interface ProductImage {
//   image: string;
// }

interface ProductImagesCarouselProps {
  images: ProductImage[];
}

const ProductImagesCarousel: React.FC<ProductImagesCarouselProps> = ({
  images,
}) => {
  return (
    <div className="w-full">
      <Carousel
        showThumbs={false}
        autoPlay
        interval={5000}
        transitionTime={800}
        infiniteLoop
        showStatus={false}
        emulateTouch
        className="relative"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex h-[400px] w-full items-center justify-center bg-gray-200"
          >
            <img
              src={image.image}
              alt={`Product image ${index + 1}`}
              className="h-full w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/images/placeholder.png";
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductImagesCarousel;
