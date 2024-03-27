// import { Car } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { Ad } from "~/models/ad";

const AdSpace = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await Ad.fetchMany("123456");
        setAds(response);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching ads.");
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (ads.length === 0) {
    return <div>No ads found</div>;
  }

  return (
    // <AliceCarousel
    //   autoPlay
    //   autoPlayInterval={5000}
    //   mouseTracking
    //   infinite
    //   disableDotsControls
    // >
    //   {ads.map((ad, index) => (
    //     <div key={index} className="h-60  rounded-lg shadow-lg">
    //       <img
    //         src={ad.image}
    //         alt={ad.name}
    //         className="h-full w-full rounded-lg object-cover p-4 shadow-lg"
    //       />
    //       <p className="mt-4 text-center text-lg">{ad.name}</p>
    //     </div>
    //   ))}
    // </AliceCarousel>
    <Carousel>
      <CarouselContent>
        {ads.map((ad, index) => (
          <CarouselItem key={index}>
            <div key={index} className="m-4 h-60 rounded-lg border shadow-lg ">
              <img
                src={ad.image}
                alt={ad.name}
                className="h-full w-full rounded-lg object-cover shadow-inner"
              />
              <p className="mt-4 text-center text-lg">{ad.name}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default AdSpace;
