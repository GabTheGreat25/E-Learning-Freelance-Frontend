import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { CalendarImg, LockImg } from "@assets";
import { MyCarousel } from "@components";
import { SelectStyles, Toast } from "@utils";
import { registerProfileValidation } from "@validators";
import { TOAST } from "@constants";
import { hooks } from "@api";
import { locationActions, profileActions } from "@hooks";

export function RegisterProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerUser, { isLoading }] = hooks.useRegisterUserMutation();

  const profileForm = useSelector((state) => state.profile.formData);

  const form = useSelector((state) => state.location.formData);

  const [isFocused, setIsFocused] = useState(false);
  const [startDate, setStartDate] = useState(
    profileForm.birthDate ? new Date(profileForm.birthDate) : null,
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    profileForm.country || null,
  );
  const [selectedProvince, setSelectedProvince] = useState(
    profileForm.province || null,
  );
  const [selectedCity, setSelectedCity] = useState(profileForm.city || null);
  const [customProvince, setCustomProvince] = useState(
    profileForm?.province?.label || "",
  );
  const [customCity, setCustomCity] = useState(profileForm?.city?.label || "");
  const [countryOptions, setCountryOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const countries = Country.getAllCountries();
    const options = countries.map((country) => ({
      label: country.name,
      value: country.isoCode,
    }));
    setCountryOptions(options);
  }, []);

  useEffect(() => {
    const provinces = selectedCountry
      ? State.getStatesOfCountry(selectedCountry.value).map((province) => ({
          label: province.name,
          value: province.isoCode,
        }))
      : [];

    setProvinceOptions(provinces);

    if (
      provinces.length === 0 ||
      (selectedProvince &&
        !provinces.find((prov) => prov.value === selectedProvince.value))
    ) {
      setSelectedProvince(null);
      setSelectedCity(null);
      formik.setFieldValue("province", null);
      formik.setFieldValue("city", null);
    } else {
      setCustomProvince("");
      setCustomCity("");
    }
  }, [selectedCountry, selectedProvince]);

  useEffect(() => {
    const cities = selectedProvince
      ? City.getCitiesOfState(
          selectedCountry.value,
          selectedProvince.value,
        ).map((city) => ({
          label: city.name,
          value: city.name,
        }))
      : [];

    setCityOptions(cities);

    if (cities.length === 0) {
      setSelectedCity(null);
      formik.setFieldValue("city", null);
    } else {
      setCustomCity("");
    }
  }, [selectedProvince, selectedCountry]);

  const formik = useFormik({
    initialValues: {
      mobileNumber: profileForm.mobileNumber || "",
      birthDate: profileForm.birthDate || "",
      address: profileForm.address || "",
      country: profileForm.country || null,
      province: profileForm.province || "",
      city: profileForm.city || "",
      gender: profileForm.gender || null,
      role: "admin",
    },
    validationSchema: registerProfileValidation,
    onSubmit: (values) => {
      const formData = {
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        password: form.password,
        mobileNumber: values.mobileNumber,
        birthDate: new Date(
          new Date(values.birthDate).setDate(
            new Date(values.birthDate).getDate() + 1,
          ),
        ).toISOString(),
        address: values.address,
        country: values.country.label,
        province: values.province ? values.province.label : customProvince,
        city: values.city ? values.city.label : customCity,
        gender: values.gender.value,
        role: values.role,
      };

      registerUser(formData)
        .unwrap()
        .then((res) => {
          if (res.success) {
            Toast(TOAST.SUCCESS, res.message);
            navigate("/verification");
            dispatch(locationActions.clearFormData());
            dispatch(profileActions.clearProfileData(formData));
          } else {
            Toast(
              TOAST.ERROR,
              res.error?.data?.message ||
                "Registration failed. Please try again.",
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
          <div className="relative w-full h-screen py-32 overflow-y-auto scrollbar-thin">
            <div className="absolute top-0 left-0 p-8 cursor-pointer">
              <div
                onClick={() => {
                  const formikValues = {
                    ...formik.values,
                    birthDate: formik.values.birthDate
                      ? new Date(formik.values.birthDate).toISOString()
                      : null,
                  };
                  dispatch(profileActions.updateProfileData(formikValues));
                  navigate("/register");
                }}
                className="grid grid-cols-[50%_50%] items-end justify-center"
              >
                <FaChevronLeft size={30} />
                <p className="relative text-2xl font-semibold top-[.1rem] text-light-secondary">
                  Back
                </p>
              </div>
            </div>

            <div className="absolute top-0 right-0 flex p-8 mt-2 text-sm">
              <div className="grid grid-rows-2">
                <p className="text-base font-medium text-start text-light-secondary">
                  STEP 02/03
                </p>
                <h3 className="text-lg font-medium text-end">Address</h3>
              </div>
            </div>

            <div className="px-6 2xl:px-36 xl:px-28 lg:px-20 md:px-10">
              <h1 className="mb-1 text-4xl font-semibold">
                Complete Your Profile!
              </h1>
              <p className="mb-2 text-base">
                For the purpose of industry regulation, your details are
                required.
              </p>
              <hr className="mb-8" />

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="mobileNumber"
                    className="block mb-2 text-base font-medium"
                  >
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <PhoneInput
                    international
                    limitMaxLength
                    focusInputOnCountrySelection
                    defaultCountry="PH"
                    countryCallingCodeEditable={false}
                    value={formik.values.mobileNumber}
                    onChange={(value) =>
                      formik.setFieldValue("mobileNumber", value)
                    }
                    className={`w-full p-4 border rounded-md ${
                      formik.errors.mobileNumber && formik.touched.mobileNumber
                        ? "border-error-default"
                        : "border-light-secondary"
                    } text-light-default placeholder-light-secondary`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{
                      boxShadow: isFocused ? "0 0 0 1.75px #216BA5" : "none",
                    }}
                  />
                  {formik.errors.mobileNumber &&
                    formik.touched.mobileNumber && (
                      <p className="mt-2 text-lg font-semibold text-error-default">
                        {formik.errors.mobileNumber}
                      </p>
                    )}
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="birthDate"
                    className="block mb-2 text-base font-medium"
                  >
                    Birth Date <span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="birthDate"
                      value={startDate ? startDate.toLocaleDateString() : ""}
                      readOnly
                      className={`w-full p-4 border ${
                        formik.errors.birthDate && formik.touched.birthDate
                          ? "border-error-default"
                          : "border-light-secondary"
                      } rounded-md text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                      placeholder="Select Birthday"
                      onClick={() => setShowDatePicker((prev) => !prev)}
                    />
                    <img
                      src={CalendarImg}
                      alt="CalendarImg"
                      className="absolute cursor-pointer right-4 text-light-secondary"
                      onClick={() => setShowDatePicker((prev) => !prev)}
                    />
                  </div>
                  {showDatePicker && (
                    <div className="absolute z-10 mt-2">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          formik.setFieldValue("birthDate", date);
                          setShowDatePicker(false);
                        }}
                        inline
                        showYearDropdown
                        scrollableYearDropdown={false}
                        dropdownMode="select"
                        dateFormat="MM/dd/yyyy"
                      />
                    </div>
                  )}
                  {formik.errors.birthDate && formik.touched.birthDate && (
                    <p className="mt-2 text-lg font-semibold text-error-default">
                      {formik.errors.birthDate}
                    </p>
                  )}
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-base font-medium"
                  >
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <Select
                    options={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                    ]}
                    value={formik.values.gender}
                    onChange={(option) =>
                      formik.setFieldValue("gender", option)
                    }
                    className={`w-full p-[.65rem] border rounded-md ${
                      formik.errors.gender && formik.touched.gender
                        ? "border-error-default"
                        : "border-light-secondary"
                    } focus:border-info-secondary focus:outline-none`}
                    placeholder="Select your gender"
                    styles={SelectStyles()}
                  />

                  {formik.errors.gender && formik.touched.gender && (
                    <p className="mt-2 text-lg font-semibold text-error-default">
                      {formik.errors.gender}
                    </p>
                  )}
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="country"
                    className="block mb-2 text-base font-medium"
                  >
                    Country <span className="text-red-600">*</span>
                  </label>
                  <Select
                    options={countryOptions}
                    value={formik.values.country}
                    onChange={(option) => {
                      setSelectedCountry(option);
                      formik.setFieldValue("country", option || null);
                    }}
                    className={`w-full p-[.65rem] border rounded-md ${
                      formik.errors.country && formik.touched.country
                        ? "border-error-default"
                        : "border-light-secondary"
                    } focus:border-info-secondary focus:outline-none`}
                    placeholder="Select a country"
                    styles={SelectStyles()}
                  />
                  {formik.errors.country && formik.touched.country && (
                    <p className="mt-2 text-lg font-semibold text-error-default">
                      {formik.errors.country}
                    </p>
                  )}
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="province"
                    className="block mb-2 text-base font-medium"
                  >
                    Province <span className="text-red-600">*</span>
                  </label>
                  {provinceOptions.length > 0 ? (
                    <Select
                      options={provinceOptions}
                      value={selectedProvince}
                      onChange={(option) => {
                        setSelectedProvince(option);
                        formik.setFieldValue("province", option || "");
                      }}
                      className={`w-full p-[.65rem] border rounded-md ${
                        formik.errors.province && formik.touched.province
                          ? "border-error-default"
                          : "border-light-secondary"
                      } focus:border-info-secondary focus:outline-none`}
                      placeholder="Select a province"
                      styles={SelectStyles()}
                      isDisabled={!selectedCountry}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Enter your province"
                      value={customProvince}
                      onChange={(e) => {
                        const customValue = e.target.value;
                        setCustomProvince(customValue);
                        formik.setFieldValue("province", customValue);
                      }}
                      className={`w-full p-4 ${
                        formik.errors.province && formik.touched.province
                          ? "border-error-default"
                          : "border-light-secondary"
                      } capitalize border rounded-md text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                    />
                  )}
                  {formik.errors.province && formik.touched.province && (
                    <p className="mt-2 text-lg font-semibold text-error-default">
                      {formik.errors.province}
                    </p>
                  )}
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-base font-medium"
                  >
                    City <span className="text-red-600">*</span>
                  </label>
                  {cityOptions.length > 0 ? (
                    <Select
                      options={cityOptions}
                      value={selectedCity}
                      onChange={(option) => {
                        setSelectedCity(option);
                        formik.setFieldValue("city", option || "");
                      }}
                      className={`w-full p-[.65rem] border rounded-md ${
                        formik.errors.city && formik.touched.city
                          ? "border-error-default"
                          : "border-light-secondary"
                      } focus:border-info-secondary focus:outline-none`}
                      placeholder="Select a city"
                      styles={SelectStyles()}
                      isDisabled={!selectedProvince}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Enter your city"
                      value={customCity}
                      onChange={(e) => {
                        const customValue = e.target.value;
                        setCustomCity(customValue);
                        formik.setFieldValue("city", customValue);
                      }}
                      className={`w-full p-4 ${
                        formik.errors.city && formik.touched.city
                          ? "border-error-default"
                          : "border-light-secondary"
                      } capitalize border rounded-md text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                    />
                  )}
                  {formik.errors.city && formik.touched.city && (
                    <p className="mt-2 text-lg font-semibold text-error-default">
                      {formik.errors.city}
                    </p>
                  )}
                </div>

                <div className="relative mb-8">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-base font-medium"
                  >
                    Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    className={`w-full p-4 border rounded-md ${
                      formik.errors.address && formik.touched.address
                        ? "border-error-default"
                        : "border-light-secondary"
                    } text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                  />
                  {formik.errors.address && formik.touched.address && (
                    <p className="mt-2 text-lg font-semibold text-error-default">
                      {formik.errors.address}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 my-3 text-lg rounded-md bg-dark-secondary text-light-default"
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
        </>
      )}
    </section>
  );
}
