import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AuthImg, CoverImg, LockImg, VerifiedImg } from "@assets";
import { useNavigate } from "react-router-dom";

export function Verified() {
  const navigate = useNavigate();

  return (
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-2 bg-dark-default text-light-default">
      <div
        className="hidden w-full h-full bg-center bg-cover md:block"
        style={{ backgroundImage: `url(${AuthImg})` }}
      >
        <div className="relative flex items-center justify-center min-h-full xl:p-12 lg:p-7 md:p-6 rounded-3xl">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            interval={3000}
          >
            <div>
              <img
                src={CoverImg}
                alt="CoverImg 1"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div>
              <img
                src={CoverImg}
                alt="CoverImg 2"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </Carousel>
        </div>
      </div>

      <div className="relative flex items-center justify-center p-6 lg:p-10 xl:p-32">
        <div className="w-full max-w-lg mt-20 xl:mt-8 lg:mt-16">
          <h1 className="mb-1 text-3xl font-semibold lg:text-4xl">
            Successfully Created Your Account
          </h1>
          <p className="mb-2 text-lg">Click the button to continue</p>

          <div className="flex items-center justify-center">
            <img src={VerifiedImg} alt="VerifiedImg" className="pt-12 pb-16" />
          </div>

          <button
            type="submit"
            onClick={() => navigate("/")}
            className="w-full py-3 mb-6 text-lg rounded-md bg-dark-secondary text-light-default"
          >
            Continue
          </button>

          <div className="flex items-end justify-center gap-x-3">
            <img src={LockImg} alt="LockImg" />
            <h1 className="text-sm text-light-tertiary">
              Your Info is safely secured
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
