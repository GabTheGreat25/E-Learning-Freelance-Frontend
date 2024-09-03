import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { AuthImg, CoverImg } from "@assets";
import { forgotPasswordValidation } from "@validators";
import { Toast } from "@utils";
import { TOAST } from "@constants";
import { hooks } from "@api";

export function ForgotPassword() {
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = hooks.useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidation,
    onSubmit: (values) => {
      forgotPassword({ email: values.email })
        .unwrap()
        .then((res) => {
          if (res.success) {
            Toast(TOAST.SUCCESS, res.message);
            navigate("/sendResetLink");
          } else
            Toast(
              TOAST.ERROR,
              res.error?.data?.message || "Email not found. Please try again.",
            );
        })
        .catch((error) => {
          console.error("API error:", error);
          Toast(
            TOAST.ERROR,
            error?.data?.message ||
              "An unexpected error occurred. Please try again.",
          );
        });
    },
  });

  return (
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-2 bg-dark-default text-light-default">
      <div
        className="hidden w-full h-full bg-center bg-cover md:block"
        style={{ backgroundImage: `url(${AuthImg})` }}
      >
        <div
          className="items-center justify-center hidden w-full h-screen p-8 bg-center bg-cover md:flex"
          style={{ backgroundImage: `url(${AuthImg})` }}
        >
          <div className="flex items-center justify-center w-full h-full p-0 xl:p-8 2xl:p-28">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showArrows={false}
              showIndicators={true}
              interval={3000}
            >
              <div>
                <img
                  src={CoverImg}
                  alt="Cover Image 1"
                  className="object-cover min-h-full rounded-3xl"
                />
              </div>
              <div>
                <img
                  src={CoverImg}
                  alt="Cover Image 2"
                  className="object-cover min-h-full rounded-3xl"
                />
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FAF7F7" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="relative w-full h-screen py-32 overflow-y-auto scrollbar-thin">
            <div className="absolute top-0 left-0 p-8 cursor-pointer">
              <div
                onClick={() => navigate("/")}
                className="grid grid-cols-[50%_50%] items-end justify-center"
              >
                <FaChevronLeft size={30} />
                <p className="relative text-2xl font-semibold top-[.1rem] text-light-secondary">
                  Back
                </p>
              </div>
            </div>

            <div className="px-6 2xl:px-36 xl:px-28 lg:px-20 md:px-10">
              <h1 className="mb-1 text-4xl font-semibold">Forgot Password</h1>
              <p className="mb-2 text-lg">Enter your email to continue</p>
              <hr className="mb-8" />

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-base font-medium"
                  >
                    Email address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className={`w-full p-4 border rounded-md ${
                      formik.errors.email && formik.touched.email
                        ? "border-error-default"
                        : "border-light-secondary"
                    } text-light-default placeholder-light-secondary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="pt-2 text-error-default">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 my-6 text-lg rounded-md bg-dark-secondary text-light-default"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
