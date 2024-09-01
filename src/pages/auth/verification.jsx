import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import { AuthImg, CoverImg, LockImg } from "@assets";
import { verificationValidation } from "@validators";
import { Toast } from "@utils";
import { TOAST } from "@constants";
import { hooks } from "@api";
import { locationActions } from "@hooks";

export function Verification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.location.formData);

  const [verifyOTP, { isLoading }] = hooks.useVerifyOTPMutation();
  const [resendOTP, { isLoading: isResending }] = hooks.useResendOTPMutation();

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: verificationValidation,
    onSubmit: (values) => {
      verifyOTP({ otpCode: values.otp })
        .unwrap()
        .then((res) => {
          if (res.success) {
            Toast(TOAST.SUCCESS, res.message);
            navigate("/verified");
            dispatch(locationActions.clearEmailForm());
          } else
            Toast(
              TOAST.ERROR,
              res.error?.data?.message || "OTP is wrong. Please try again.",
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

  const handleResendOTP = () => {
    if (formData.email) {
      resendOTP({ email: formData.email })
        .unwrap()
        .then((res) => {
          if (res.success) {
            Toast(TOAST.SUCCESS, "OTP has been resent to your email.");
          } else
            Toast(
              TOAST.ERROR,
              res.error?.data?.message ||
                "Failed to resend OTP. Please try again.",
            );
        })
        .catch((error) => {
          console.error("Resend OTP error:", error);
          Toast(
            TOAST.ERROR,
            error?.data?.message ||
              "An unexpected error occurred while resending OTP. Please try again.",
          );
        });
    } else Toast(TOAST.ERROR, "No email found. Please try again.");
  };

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
        {isLoading || isResending ? (
          <div className="loader">
            <FadeLoader color="#FAF7F7" loading={true} size={50} />
          </div>
        ) : (
          <>
            <div className="absolute top-0 right-0 flex p-8 mt-2 text-sm">
              <div className="grid grid-rows-2">
                <p className="text-base font-medium text-end text-light-secondary">
                  STEP 03/03
                </p>
                <h3 className="text-lg font-medium">OTP Verification</h3>
              </div>
            </div>

            <div className="w-full max-w-lg xl:mt-8 mt-28">
              <h1 className="mb-1 text-4xl font-semibold">OTP Verification</h1>
              <p className="mb-2 text-lg">
                Enter the OTP sent to your registered contact.
              </p>
              <hr className="mb-8" />

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-base font-medium"
                  >
                    OTP <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="otp"
                    placeholder="Enter Your OTP"
                    className={`w-full p-4 border rounded-md ${
                      formik.errors.otp && formik.touched.otp
                        ? "border-error-default"
                        : "border-light-secondary"
                    } text-light-default placeholder-light-secondary`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.otp}
                  />
                  {formik.errors.otp && formik.touched.otp && (
                    <p className="pt-2 text-error-default">
                      {formik.errors.otp}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-center pb-6">
                  <button
                    type="button"
                    className="underline text-light-secondary"
                    onClick={handleResendOTP}
                    disabled={isResending}
                  >
                    Resend OTP
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 my-6 text-lg rounded-md bg-dark-secondary text-light-default"
                >
                  Verify OTP
                </button>
              </form>

              <div className="flex items-end justify-center gap-x-3">
                <img src={LockImg} alt="LockImg" />
                <h1 className="text-sm text-light-tertiary">
                  Your Info is safely secured
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
