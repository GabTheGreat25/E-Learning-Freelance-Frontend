import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CalendarImg, LockImg } from "@assets";
import { FaChevronLeft } from "react-icons/fa";
import { AuthImg, CoverImg } from "@assets";
import { SelectStyles } from "@utils";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { registerProfileValidation } from "@validators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

export function RegisterProfile() {
  const navigate = useNavigate();

  const [isFocused, setIsFocused] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);

  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);

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
    setSelectedProvince(null);
    setCityOptions([]);
    formik.setFieldValue("province", null);
    formik.setFieldValue("city", null);
  }, [selectedCountry]);

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
    formik.setFieldValue(
      "city",
      cities.length === 0 ? null : formik.values.city,
    );
  }, [selectedProvince, selectedCountry]);

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      birthdate: "",
      address: "",
      country: null,
      province: null,
      city: null,
    },
    validationSchema: registerProfileValidation,
    onSubmit: (values) => {
      console.log("Form data:", values);
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <section className="grid min-h-full grid-cols-1 md:grid-cols-2 bg-dark-default text-light-default">
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
        <div className="absolute top-0 left-0 p-8 cursor-pointer">
          <div
            onClick={() => navigate("/register")}
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

        <div className="w-full max-w-lg mt-20 xl:mt-8 lg:mt-16">
          <h1 className="mb-1 text-4xl font-semibold">
            Complete Your Profile!
          </h1>
          <p className="mb-2 text-base">
            For the purpose of industry regulation, your details are required.
          </p>
          <hr className="mb-8" />

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block mb-2 text-base font-medium"
              >
                Phone Number
              </label>
              <PhoneInput
                international
                limitMaxLength
                focusInputOnCountrySelection
                defaultCountry="PH"
                countryCallingCodeEditable={false}
                value={formik.values.phoneNumber}
                onChange={(value) => formik.setFieldValue("phoneNumber", value)}
                className={`w-full p-4 border rounded-md ${
                  formik.errors.phoneNumber && formik.touched.phoneNumber
                    ? "border-error-default"
                    : "border-light-secondary"
                } text-light-default placeholder-light-secondary`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                  boxShadow: isFocused ? "0 0 0 1px white" : "none",
                }}
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
                <p className="pt-2 text-error-default">
                  {formik.errors.phoneNumber}
                </p>
              ) : null}
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="birthdate"
                className="block mb-2 text-base font-medium"
              >
                Birthdate
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="birthdate"
                  name="birthdate"
                  value={startDate ? startDate.toLocaleDateString() : ""}
                  readOnly
                  className={`w-full p-4 border ${
                    formik.errors.birthdate && formik.touched.birthdate
                      ? "border-error-default"
                      : "border-light-secondary"
                  } rounded-md text-light-default placeholder-light-secondary`}
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
              {showDatePicker ? (
                <div className="absolute z-10 mt-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      formik.setFieldValue("birthdate", date);
                      setShowDatePicker(false);
                    }}
                    inline
                  />
                </div>
              ) : null}
              {formik.errors.birthdate && formik.touched.birthdate ? (
                <p className="pt-2 text-error-default">
                  {formik.errors.birthdate}
                </p>
              ) : null}
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="address"
                className="block mb-2 text-base font-medium"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                placeholder="Enter your address"
                value={formik.values.address}
                onChange={(e) =>
                  formik.setFieldValue("address", e.target.value)
                }
                className={`w-full p-4 border rounded-md ${
                  formik.errors.address && formik.touched.address
                    ? "border-error-default"
                    : "border-light-secondary"
                } text-light-default placeholder-light-secondary`}
              />
              {formik.errors.address && formik.touched.address ? (
                <p className="pt-2 text-error-default">
                  {formik.errors.address}
                </p>
              ) : null}
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="country"
                className="block mb-2 text-base font-medium"
              >
                Country
              </label>
              <Select
                options={countryOptions}
                value={formik.values.country}
                onChange={(option) => {
                  setSelectedCountry(option);
                  formik.setFieldValue("country", option || null);
                  option && State.getStatesOfCountry(option.value).length === 0
                    ? (setSelectedProvince(null),
                      setCityOptions([]),
                      formik.setFieldValue("province", null),
                      formik.setFieldValue("city", null))
                    : (setSelectedProvince(null),
                      formik.setFieldValue("province", null),
                      formik.setFieldValue("city", null));
                }}
                className={`w-full p-[.65rem] border rounded-md ${
                  formik.errors.country && formik.touched.country
                    ? "border-error-default"
                    : "border-light-secondary"
                }`}
                placeholder="Select a country"
                styles={SelectStyles()}
              />
              {formik.errors.country && formik.touched.country ? (
                <p className="pt-2 text-error-default">
                  {formik.errors.country}
                </p>
              ) : null}
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="province"
                className="block mb-2 text-base font-medium"
              >
                Province
              </label>
              <Select
                options={provinceOptions}
                value={formik.values.province}
                onChange={(option) => {
                  setSelectedProvince(option);
                  formik.setFieldValue("province", option || null);
                }}
                className={`w-full p-[.65rem] border rounded-md ${
                  formik.errors.province && formik.touched.province
                    ? "border-error-default"
                    : "border-light-secondary"
                }`}
                placeholder="Select a province"
                styles={SelectStyles()}
                isDisabled={!selectedCountry}
              />
              {formik.errors.province && formik.touched.province ? (
                <p className="pt-2 text-error-default">
                  {formik.errors.province}
                </p>
              ) : null}
            </div>

            <div className="relative mb-8">
              <label
                htmlFor="city"
                className="block mb-2 text-base font-medium"
              >
                City
              </label>
              <Select
                options={cityOptions}
                value={formik.values.city}
                onChange={(option) => {
                  formik.setFieldValue("city", option || null);
                }}
                className={`w-full p-[.65rem] border rounded-md ${
                  formik.errors.city && formik.touched.city
                    ? "border-error-default"
                    : "border-light-secondary"
                }`}
                placeholder="Select a city"
                styles={SelectStyles()}
                isDisabled={!selectedProvince}
              />
              {formik.errors.city && formik.touched.city ? (
                <p className="pt-2 text-error-default">{formik.errors.city}</p>
              ) : null}
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
            <h1 className="relative text-sm bottom-1 text-light-tertiary">
              Your Info is safely secured
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
