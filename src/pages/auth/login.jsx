import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { AuthImg, CoverImg, FacebookImg, GoogleImg } from "@assets";
import { PasswordVisibility, Toast } from "@utils";
import { loginValidation } from "@validators";
import { hooks } from "@api";
import { TOAST } from "@constants";

export function Login() {
  const navigate = useNavigate();
  const { isPasswordVisible, togglePasswordVisibility } = PasswordVisibility();
  const [loginUser, { isLoading }] = hooks.useLoginUserMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      loginUser(values)
        .unwrap()
        .then((res) => {
          if (res.success) {
            Toast(TOAST.SUCCESS, "Login successful!");
            navigate("/dashboard");
          } else {
            Toast(
              TOAST.ERROR,
              res.error?.data?.message ||
                "Something went wrong. Please try again.",
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
      <div className="flex items-center justify-center p-6 lg:p-10 xl:p-32">
        {isLoading ? (
          <div className="loader">
            <FadeLoader color="#FAF7F7" loading={true} size={50} />
          </div>
        ) : (
          <>
            <div className="w-full max-w-lg">
              <h1 className="mb-1 text-4xl font-semibold">Login</h1>
              <p className="mb-2 text-lg">Sign in to get started</p>
              <hr className="mb-8" />

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-base font-medium"
                  >
                    Email address <span className="text-error-default">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
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

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-base font-medium"
                  >
                    Password <span className="text-error-default">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
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

                <div className="flex items-center justify-start pb-6">
                  <button
                    onClick={() => navigate("/forgotPassword")}
                    className="underline text-light-secondary"
                  >
                    Forgot Password
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mb-6 text-lg rounded-md bg-dark-secondary text-light-default"
                  disabled={isLoading}
                >
                  Login
                </button>
              </form>

              <div className="grid items-center justify-center grid-cols-[40%_20%_40%] mb-6 text-sm text-center">
                <hr />
                <span className="text-light-secondary">Or</span>
                <hr />
              </div>

              <div className="grid w-full grid-cols-[40%_60%] py-4 mb-4 rounded-lg shadow-lg bg-light-default text-dark-default cursor-pointer">
                <div className="grid items-center justify-center">
                  <img
                    src={GoogleImg}
                    alt="GoogleImg"
                    className="w-6 h-6 mr-2"
                  />
                </div>
                <div className="grid items-start justify-start">
                  <button className="text-lg font-semibold">
                    Login with Google
                  </button>
                </div>
              </div>
              <div className="grid w-full grid-cols-[40%_60%] py-4 mb-4 rounded-lg shadow-lg bg-light-default text-dark-default cursor-pointer">
                <div className="grid items-center justify-center">
                  <img
                    src={FacebookImg}
                    alt="FacebookImg"
                    className="w-6 h-6 mr-2"
                  />
                </div>
                <div className="grid items-start justify-start">
                  <button className="text-lg font-semibold">
                    Login with Facebook
                  </button>
                </div>
              </div>
              <hr className="mt-8" />
              <button
                onClick={() => navigate("/register")}
                className="w-full py-3 mt-6 text-lg rounded-md cursor-pointer bg-dark-secondary text-light-default"
              >
                Register
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
