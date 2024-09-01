import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { AuthImg, CoverImg } from "@assets";
import { Toast, PasswordVisibility } from "@utils";
import { resetPasswordValidation } from "@validators";
import { TOAST } from "@constants";
import { hooks } from "@api";

export function ResetPassword() {
  const navigate = useNavigate();

  const {
    isPasswordVisible,
    togglePasswordVisibility,
    isConfirmPasswordVisible,
    toggleConfirmPasswordVisibility,
  } = PasswordVisibility();

  const [resetPassword, { isLoading }] = hooks.useResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidation,
    onSubmit: (values) => {
      resetPassword({
        otpCode: values.otp,
        password: values.password,
        confirmPassword: values.confirmPassword,
      })
        .unwrap()
        .then((res) => {
          if (res.success) {
            Toast(TOAST.SUCCESS, res.message);
            navigate("/");
          } else
            Toast(
              TOAST.ERROR,
              res.error?.data?.message ||
                "Failed to reset password. Please try again.",
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
        {isLoading ? (
          <div className="loader">
            <FadeLoader color="#FAF7F7" loading={true} size={50} />
          </div>
        ) : (
          <>
            <div className="absolute top-0 left-0 p-8 cursor-pointer">
              <div
                onClick={() => navigate("/forgotPassword")}
                className="grid grid-cols-[50%_50%] items-end justify-center"
              >
                <FaChevronLeft size={30} />
                <p className="relative text-2xl font-semibold top-[.1rem] text-light-secondary">
                  Back
                </p>
              </div>
            </div>

            <div className="w-full max-w-lg xl:mt-8 mt-28">
              <h1 className="mb-1 text-4xl font-semibold">Reset Password</h1>
              <p className="mb-2 text-lg">Enter your OTP and new password</p>
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
                    name="otp"
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

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-base font-medium"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      className={`w-full p-4 border rounded-md ${
                        formik.errors.password && formik.touched.password
                          ? "border-error-default"
                          : "border-light-secondary"
                      } text-light-default placeholder-light-secondary`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute transform -translate-y-1/2 right-8 top-1/2 text-light-secondary"
                    >
                      {isPasswordVisible ? "Hide" : "Show"}
                    </button>
                  </div>
                  {formik.errors.password && formik.touched.password && (
                    <p className="mt-2 text-error-default">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-base font-medium"
                  >
                    Confirm Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm New Password"
                      className={`w-full p-4 border rounded-md ${
                        formik.errors.confirmPassword &&
                        formik.touched.confirmPassword
                          ? "border-error-default"
                          : "border-light-secondary"
                      } text-light-default placeholder-light-secondary`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute transform -translate-y-1/2 right-8 top-1/2 text-light-secondary"
                    >
                      {isConfirmPasswordVisible ? "Hide" : "Show"}
                    </button>
                  </div>
                  {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword && (
                      <p className="mt-2 text-error-default">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 my-6 text-lg rounded-md bg-dark-secondary text-light-default"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
