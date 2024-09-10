import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import { LockImg } from "@assets";
import { MyCarousel } from "@components";
import { verificationValidation } from "@validators";
import { Toast } from "@utils";
import { TOAST } from "@constants";
import { hooks } from "@api";
import { locationActions } from "@hooks";

const RESEND_TIMEOUT = 300;

export function Verification() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.location.formData);

  const [verifyOTP, { isLoading }] = hooks.useVerifyOTPMutation();
  const [resendOTP, { isLoading: isResending }] = hooks.useResendOTPMutation();
  const [countdown, setCountdown] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  let countdownInterval;

  const startCountdown = (remainingTime) => {
    setTimerStarted(true);
    setCountdown(remainingTime || RESEND_TIMEOUT);
    countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          localStorage.removeItem("resendOTPTime");
          setTimerStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = () => {
    if (formData.email) {
      resendOTP({ email: formData.email })
        .unwrap()
        .then((res) => {
          if (res.success) {
            Toast(TOAST.SUCCESS, "OTP has been resent to your email.");
            const expiryTime = Math.floor(Date.now() / 1000) + RESEND_TIMEOUT;
            localStorage.setItem("resendOTPTime", expiryTime);
            startCountdown(RESEND_TIMEOUT);
          } else {
            Toast(
              TOAST.ERROR,
              res.error?.data?.message ||
                "Failed to resend OTP. Please try again.",
            );
          }
        })
        .catch((error) => {
          console.error("Resend OTP error:", error);
          Toast(
            TOAST.ERROR,
            error?.data?.message ||
              "An unexpected error occurred. Please try again.",
          );
        });
    } else {
      Toast(TOAST.ERROR, "No email found. Please try again.");
    }
  };

  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const timeNow = Math.floor(Date.now() / 1000);
    const storedExpiryTime = localStorage.getItem("resendOTPTime");

    if (location.state && location.state.fromStep2) {
      if (storedExpiryTime) {
        const remainingTime = storedExpiryTime - timeNow;
        if (remainingTime > 0) {
          startCountdown(remainingTime);
        }
      } else {
        startCountdown();
      }
    }

    return () => clearInterval(countdownInterval);
  }, [location.state]);

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
            localStorage.removeItem("resendOTPTime");
          } else {
            Toast(
              TOAST.ERROR,
              res.error?.data?.message || "OTP is wrong. Please try again.",
            );
          }
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
      <MyCarousel />
      {isLoading || isResending ? (
        <div className="loader">
          <FadeLoader color="#FAF7F7" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="relative w-full h-screen py-32 overflow-y-auto scrollbar-thin">
            <div className="absolute top-0 right-0 flex p-8 mt-2 text-sm">
              <div className="grid grid-rows-2">
                <p className="text-[15px] font-medium text-end text-light-secondary">
                  STEP 03/03
                </p>
                <h3 className="text-[15px] font-medium">OTP Verification</h3>
              </div>
            </div>

            <div className="px-6 2xl:px-36 xl:px-28 lg:px-20 md:px-10">
              <h1 className="mb-1 text-[30px] font-semibold">
                Email Verification
              </h1>
              <p className="mb-2 text-[15px]">
                We sent a verification to your email. Please see the OTP and
                enter it below.
              </p>
              <hr className="mb-8" />

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-[15px] font-medium"
                  >
                    OTP <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="otp"
                    placeholder="Enter Your OTP"
                    className={`text-[15px] w-full p-4 border rounded-md ${
                      formik.errors.otp && formik.touched.otp
                        ? "border-error-default"
                        : "border-light-secondary"
                    } text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.otp}
                  />
                  {formik.errors.otp && formik.touched.otp && (
                    <p className="mt-2 text-[15px] text-error-default">
                      {formik.errors.otp}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-center pb-6">
                  <button
                    type="button"
                    className="text-[15px] underline text-light-secondary"
                    onClick={handleResendOTP}
                    disabled={countdown > 0 || isResending}
                  >
                    {countdown > 0
                      ? `Resend OTP (${formatCountdown()})`
                      : "Resend OTP"}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 my-6 text-[15px] rounded-md bg-dark-secondary text-light-default"
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
          </div>
        </>
      )}
    </section>
  );
}
