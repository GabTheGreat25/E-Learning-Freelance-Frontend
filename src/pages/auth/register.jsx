import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaChevronLeft } from "react-icons/fa";
import { AuthImg, CoverImg, FacebookImg, GoogleImg } from "@assets";
import { PasswordVisibility } from "@utils";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerValidation } from "@validators";

export function Register() {
  const navigate = useNavigate();
  const { isPasswordVisible, togglePasswordVisibility } = PasswordVisibility();
  const [isChecked, setIsChecked] = useState(true);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    // validationSchema: registerValidation,
    onSubmit: (values) => {
      console.log("Form values:", values);
      navigate("/registerProfile");
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

      <div className="relative flex items-center justify-center p-6 lg:p-10 xl:p-32">
        <div
          className="absolute top-0 left-0 p-8 cursor-pointer"
          onClick={() => navigate("/")}
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
              STEP 01/03
            </p>
            <h3 className="text-lg font-medium">Personal Info.</h3>
          </div>
        </div>

        <div className="w-full max-w-lg mt-20 xl:mt-8 lg:mt-16">
          <h1 className="mb-1 text-4xl font-semibold">Register</h1>
          <p className="mb-2 text-lg">Your details are required.</p>
          <hr className="mb-8" />

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block mb-2 text-base font-medium"
              >
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstname"
                placeholder="Enter Your Firstname"
                className={`w-full p-4 border rounded-md ${formik.errors.firstname && formik.touched.firstname ? "border-error-default" : "border-light-secondary"} text-light-default placeholder-light-secondary`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
              />
              {formik.errors.firstname && formik.touched.firstname && (
                <p className="pt-2 text-error-default">
                  {formik.errors.firstname}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="block mb-2 text-base font-medium"
              >
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="Enter Your Lastname"
                className={`w-full p-4 border rounded-md ${formik.errors.lastname && formik.touched.lastname ? "border-error-default" : "border-light-secondary"} text-light-default placeholder-light-secondary`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
              />
              {formik.errors.lastname && formik.touched.lastname && (
                <p className="pt-2 text-error-default">
                  {formik.errors.lastname}
                </p>
              )}
            </div>

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
                placeholder="Enter your email address"
                className={`w-full p-4 border rounded-md ${formik.errors.email && formik.touched.email ? "border-error-default" : "border-light-secondary"} text-light-default placeholder-light-secondary`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="pt-2 text-error-default">{formik.errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-base font-medium"
              >
                Create password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter password"
                  className={`w-full p-4 border rounded-md ${formik.errors.password && formik.touched.password ? "border-error-default" : "border-light-secondary"} text-light-default placeholder-light-secondary`}
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

            <label
              htmlFor="terms"
              className="relative flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-5 h-5 rounded-sm appearance-none cursor-pointer bg-light-default peer checked:bg-info-default checked:border-transparent checked:ring-2 checked:ring-info-default checked:ring-offset-2 checked:ring-offset-light-default"
              />
              <span className="ml-4 text-light-default">
                I agree to the
                <a href="/terms" className="ml-1 underline">
                  terms & conditions
                </a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 my-6 text-lg rounded-md bg-dark-secondary text-light-default"
            >
              Register Account
            </button>
          </form>

          <div className="grid items-center justify-center grid-cols-[40%_20%_40%] mb-6 text-sm text-center">
            <hr />
            <span className="text-light-secondary">Or</span>
            <hr />
          </div>

          <div className="grid w-full grid-cols-[35%_65%] py-4 mb-4 rounded-lg shadow-lg bg-light-default text-dark-default cursor-pointer">
            <div className="grid items-center justify-center">
              <img src={GoogleImg} alt="GoogleImg" className="w-6 h-6 mr-2" />
            </div>
            <div className="grid items-start justify-start">
              <button className="text-lg font-semibold">
                Register with Google
              </button>
            </div>
          </div>

          <div className="grid w-full grid-cols-[35%_65%] py-4 mb-4 rounded-lg shadow-lg bg-light-default text-dark-default cursor-pointer">
            <div className="grid items-center justify-center">
              <img
                src={FacebookImg}
                alt="FacebookImg"
                className="w-6 h-6 mr-2"
              />
            </div>
            <div className="grid items-start justify-start">
              <button className="text-lg font-semibold">
                Register with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
