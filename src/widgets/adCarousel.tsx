// import { Car } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { Ad } from "~/models/ad";

async function fetchAds() {
  const response = await Ad.fetchMany("123456");
  return response;
  //   setAds(response);
  //   setLoading(false);
  // } catch (error) {
  //   setError("An error occurred while fetching ads.");
  //   setLoading(false);
}



const AdSpace = async () => {
  // const ads = await fetchAds();
const ads:Ad[] = []
  //   fetchAds();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // if (ads.length === 0) {
  //   return <div>No ads found</div>;
  // }

  return (
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
