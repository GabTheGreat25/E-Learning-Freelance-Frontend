import React, { useRef, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FadeLoader } from "react-spinners";
import { AuthImg } from "@assets";
import { hooks } from "@api";

export function MyCarousel() {
  const isFocused = useRef(true);

  const { data, isLoading, refetch } = hooks.useGetCarouselQuery();

  useEffect(() => {
    const handleFocus = () => {
      isFocused.current = true;
      refetch();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refetch]);

  return (
    <div
      className="items-center justify-center hidden w-full h-screen p-8 bg-center bg-cover md:flex"
      style={{ backgroundImage: `url(${AuthImg})` }}
    >
      <div className="flex items-center justify-center w-full h-full lg:p-12 2xl:p-28">
        <div className="overflow-hidden rounded-3xl">
          {isLoading ? (
            <div className="loader">
              <FadeLoader color="#FAF7F7" loading={true} size={50} />
            </div>
          ) : (
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showArrows={false}
              showIndicators={true}
              interval={3000}
              transitionTime={750}
              axis="horizontal"
            >
              {data?.carousels[0]?.images.map((image) => (
                <div className="h-full" key={image._id}>
                  <img
                    src={image.url}
                    alt={`Carousel Image ${image._id}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
}
