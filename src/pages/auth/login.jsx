import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { FacebookImg, GoogleImg } from "@assets";
import { MyCarousel } from "@components";
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
            localStorage.setItem("activeSidebarItem", "home");
            Toast(TOAST.SUCCESS, "Login successful!");
            navigate("/dashboard");
          } else
            Toast(
              TOAST.ERROR,
              res.error?.data?.message ||
                "Something went wrong. Please try again.",
            );
        })
        .catch((error) => {
          const errorMessage =
            error?.data?.message ||
            "An unexpected error occurred. Please try again.";

          if (errorMessage.toLowerCase().includes("not verified")) {
            Toast(TOAST.ERROR, errorMessage);
            navigate("/verification");
          } else Toast(TOAST.ERROR, errorMessage);
        });
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-2 bg-dark-default text-light-default">
      <MyCarousel />
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FAF7F7" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="w-full h-screen py-24 overflow-y-auto scrollbar-thin">
            <div className="px-6 2xl:px-36 xl:px-28 lg:px-20 md:px-10">
              <h1 className="mb-1 text-[30px] font-semibold">Login</h1>
              <p className="mb-2 text-[15px]">Sign in to get started</p>
              <hr className="mb-8" />

              <form onSubmit={formik.handleSubmit} className="">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-[15px] font-medium"
                  >
                    Email address <span className="text-error-default">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className={`text-[15px] w-full p-4 border rounded-md ${
                      formik.errors.email && formik.touched.email
                        ? "border-error-default"
                        : "border-light-secondary"
                    } text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="mt-2 text-[15px] text-error-default">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-[15px] font-medium"
                  >
                    Password <span className="text-error-default">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      placeholder="Enter password"
                      className={`text-[15px] w-full p-4 border rounded-md ${
                        formik.errors.password && formik.touched.password
                          ? "border-error-default"
                          : "border-light-secondary"
                      } text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                      onChange={formik.handleChange}
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
                    <p className="mt-2 text-[15px] text-error-default">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-start pb-6">
                  <button
                    type="button"
                    onClick={() => navigate("/forgotPassword")}
                    className="text-[15px] underline text-light-secondary"
                  >
                    Forgot Password
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mb-6 text-[15px] rounded-md bg-dark-secondary text-light-default"
                  disabled={isLoading}
                >
                  Login
                </button>
              </form>

              <div className="grid items-center justify-center grid-cols-[40%_20%_40%] mb-6 text-sm text-center">
                <hr />
                <span className="text-light-secondary text-[15px]">Or</span>
                <hr />
              </div>

              <div className="grid w-full xl:grid-cols-[40%_60%] grid-cols-[30%_70%] py-4 mb-4 rounded-lg shadow-lg bg-light-default text-dark-default cursor-pointer">
                <div className="grid items-center justify-center">
                  <img
                    src={GoogleImg}
                    alt="Google Image"
                    className="w-6 h-6 mr-2"
                  />
                </div>
                <div className="grid items-start justify-start">
                  <button className="text-[15px]">Login with Google</button>
                </div>
              </div>
              <div className="grid w-full xl:grid-cols-[40%_60%] grid-cols-[30%_70%] py-4 mb-4 rounded-lg shadow-lg bg-light-default text-dark-default cursor-pointer">
                <div className="grid items-center justify-center">
                  <img
                    src={FacebookImg}
                    alt="Facebook Image"
                    className="w-6 h-6 mr-2"
                  />
                </div>
                <div className="grid items-start justify-start">
                  <button className="text-[15px]">Login with Facebook</button>
                </div>
              </div>
              <hr className="mt-8" />
              <button
                onClick={() => navigate("/register")}
                className="w-full py-3 mt-6 text-[15px] rounded-md cursor-pointer bg-dark-secondary text-light-default"
              >
                Register
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
