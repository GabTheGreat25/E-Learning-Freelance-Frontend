import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { FacebookImg, GoogleImg } from "@assets";
import { MyCarousel } from "@components";
import { PasswordVisibility } from "@utils";
import { registerValidation } from "@validators";
import { locationActions } from "@hooks";

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isPasswordVisible, togglePasswordVisibility } = PasswordVisibility();
  const [isChecked, setIsChecked] = useState(true);
  const [termsError, setTermsError] = useState("");

  const form = useSelector((state) => state.location.formData);

  const formik = useFormik({
    initialValues: {
      firstname: form.firstname || "",
      lastname: form.lastname || "",
      email: form.email || "",
      password: form.password || "",
    },
    validationSchema: registerValidation,
    onSubmit: (values) => {
      if (!isChecked) {
        setTermsError("You must agree to the terms and conditions.");
        return;
      }
      setTermsError("");
      dispatch(locationActions.updateFormData(values));
      navigate("/registerProfile");
    },
  });

  return (
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-2 bg-dark-default text-light-default">
      <MyCarousel />
      <div className="relative w-full h-screen py-32 overflow-y-auto scrollbar-thin">
        <div
          className="absolute top-0 left-0 p-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="grid grid-cols-[40%_60%] items-center justify-center">
            <FaChevronLeft size={20} />
            <p className="text-lg font-semibold text-light-secondary">Back</p>
          </div>
        </div>

        <div className="absolute top-0 right-0 flex p-8 mt-2 text-sm">
          <div className="grid grid-rows-2">
            <p className="text-lg font-medium text-end text-light-secondary">
              STEP 01/03
            </p>
            <h3 className="text-lg font-medium">Personal Info.</h3>
          </div>
        </div>

        <div className="px-6 2xl:px-36 xl:px-28 lg:px-20 md:px-10">
          <h1 className="mb-1 text-4xl font-semibold">Register</h1>
          <p className="mb-2 text-lg">Your details are required.</p>
          <hr className="mb-8" />

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block mb-2 text-lg font-medium"
              >
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstname"
                placeholder="Enter your first name"
                className={`text-lg w-full p-4 border rounded-md ${
                  formik.errors.firstname && formik.touched.firstname
                    ? "border-error-default"
                    : "border-light-secondary"
                } text-light-default capitalize placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
              />
              {formik.errors.firstname && formik.touched.firstname && (
                <p className="mt-2 text-lg text-error-default">
                  {formik.errors.firstname}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="block mb-2 text-lg font-medium"
              >
                Last Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="Enter your last name"
                className={`text-lg w-full p-4 border rounded-md ${
                  formik.errors.lastname && formik.touched.lastname
                    ? "border-error-default"
                    : "border-light-secondary"
                } text-light-default capitalize placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
              />
              {formik.errors.lastname && formik.touched.lastname && (
                <p className="mt-2 text-lg text-error-default">
                  {formik.errors.lastname}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-lg font-medium">
                Email address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className={`text-lg w-full p-4 border rounded-md ${
                  formik.errors.email && formik.touched.email
                    ? "border-error-default"
                    : "border-light-secondary"
                } text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="mt-2 text-lg text-error-default">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium"
              >
                Create password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter password"
                  className={`text-lg w-full p-4 border rounded-md ${
                    formik.errors.password && formik.touched.password
                      ? "border-error-default"
                      : "border-light-secondary"
                  } text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
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
                <p className="mt-2 text-lg text-error-default">
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
              <span className="ml-4 text-lg text-light-default">
                I agree to the
                <a href="/terms" className="ml-1 underline">
                  terms & conditions
                </a>
              </span>
            </label>
            {termsError && (
              <p className="mt-2 text-lg text-error-default">{termsError}</p>
            )}
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

          <div className="grid w-full xl:grid-cols-[35%_65%] grid-cols-[25%_75%] py-4 mb-4 rounded-lg shadow-lg bg-light-default text-dark-default cursor-pointer">
            <div className="grid items-center justify-center">
              <img src={GoogleImg} alt="GoogleImg" className="w-6 h-6 mr-2" />
            </div>
            <div className="grid items-start justify-start">
              <button className="text-lg font-semibold">
                Register with Google
              </button>
            </div>
          </div>

          <div className="grid w-full xl:grid-cols-[35%_65%] grid-cols-[25%_75%] py-4 mb-4 rounded-lg shadow-lg bg-light-default text-dark-default cursor-pointer">
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
