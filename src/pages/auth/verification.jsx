import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaChevronLeft } from "react-icons/fa";
import { AuthImg, CoverImg, LockImg } from "@assets";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { verificationValidation } from "@validators";

export function Verification() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    // validationSchema: verificationValidation,
    onSubmit: (values) => {
      console.log("Form values:", values);
      navigate("/verified");
    },
  });

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

      <div className="relative flex items-start justify-center p-6 lg:p-10 xl:p-32">
        <div
          className="absolute top-0 left-0 p-8 cursor-pointer"
          onClick={() => navigate("/registerProfile")}
        >
          <div className="grid grid-cols-[50%_50%] items-end justify-center">
            <FaChevronLeft size={30} />
            <p className="relative text-2xl font-semibold top-[.1rem] text-light-secondary">
              Back
            </p>
          </div>
        </div>

        <div className="absolute top-0 right-0 flex p-8 mt-2 text-sm">
          <div className="grid grid-rows-2">
            <p className="text-base font-medium text-end text-light-secondary">
              STEP 03/03
            </p>
            <h3 className="text-lg font-medium">Email Verification</h3>
          </div>
        </div>

        <div className="w-full max-w-lg mt-20 xl:mt-8 lg:mt-16">
          <h1 className="mb-1 text-4xl font-semibold">Email Verification</h1>
          <p className="mb-2 text-lg">
            We sent a verification to your email. Please see the OTP and enter
            it below.
          </p>
          <hr className="mb-8" />

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="otp" className="block mb-2 text-base font-medium">
                OTP <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter Your Otp"
                className={`w-full p-4 border rounded-md ${formik.errors.otp && formik.touched.otp ? "border-error-default" : "border-light-secondary"} text-light-default placeholder-light-secondary`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.otp}
              />
              {formik.errors.otp && formik.touched.otp && (
                <p className="pt-2 text-error-default">{formik.errors.otp}</p>
              )}
            </div>

            <div className="flex items-center justify-center pb-8">
              <a href="#" className="underline text-light-secondary">
                Resend OTP
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 my-6 text-lg rounded-md bg-dark-secondary text-light-default"
            >
              Save & Continue
            </button>
          </form>

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
