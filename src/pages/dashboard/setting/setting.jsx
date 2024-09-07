import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import { SelectStyles, PasswordVisibility, Toast } from "@utils";
import { Navbar, Footer } from "@components";
import { CalendarImg, UploadImg } from "@assets";
import { updateProfileValidation, updatePasswordValidation } from "@validators";
import { hooks } from "@api";
import { TOAST } from "@constants";

export function Setting() {
  const [isFocused, setIsFocused] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const { isPasswordVisible, togglePasswordVisibility } = PasswordVisibility();
  const [avatar, setAvatar] = useState(null);

  const user = useSelector((state) => state.auth.user);

  const { data, refetch } = hooks.useGetProfileQuery(user._id);

  const [updateProfile, { isLoading }] = hooks.useUpdateProfileMutation();

  const [updatePassword, { isLoading: isUpdatingPassword }] =
    hooks.useUpdatePasswordMutation();

  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      birthDate: "",
      address: "",
      country: null,
      province: "",
      city: "",
      firstname: "",
      lastname: "",
      email: "",
      gender: null,
      bio: "",
      avatar: null,
    },
    validationSchema: updateProfileValidation,
    onSubmit: (values) => {
      const formData = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        mobileNumber: values.mobileNumber,
        birthDate: new Date(
          new Date(values.birthDate).setDate(
            new Date(values.birthDate).getDate() + 1,
          ),
        ).toISOString(),
        address: values.address,
        country: values.country.label,
        province: values.province
          ? values.province.label || values.province
          : "",
        city: values.city ? values.city.label || values.city : "",
        gender: values.gender.value,
        bio: values.bio,
      };

      if (avatar && avatar.startsWith("data:image/")) formData.avatar = avatar;

      updateProfile(formData)
        .unwrap()
        .then((res) => {
          if (res.success) {
            Toast(TOAST.SUCCESS, "Profile updated successfully.");
            refetch();
          } else Toast(TOAST.ERROR, res.error || "Failed to update profile.");
        })
        .catch((error) => {
          Toast(
            TOAST.ERROR,
            error.message || "An error occurred during profile update.",
          );
        });
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  const formikPassword = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: updatePasswordValidation,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const res = await updatePassword({
          password: values.password,
        }).unwrap();
        if (res.success) {
          Toast(TOAST.SUCCESS, "Password updated successfully.");
          resetForm();
        } else Toast(TOAST.ERROR, res.message || "Failed to update password.");
      } catch (error) {
        Toast(
          TOAST.ERROR,
          error.message || "An error occurred during password update.",
        );
      } finally {
        setSubmitting(false);
      }
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  useEffect(() => {
    const countries = Country.getAllCountries();
    const options = countries.map((country) => ({
      label: country.name,
      value: country.isoCode,
    }));
    setCountryOptions(options);
  }, []);

  useEffect(() => {
    if (data?.user) {
      formik.setFieldValue("firstname", data.user.firstname || "");
      formik.setFieldValue("lastname", data.user.lastname || "");
      formik.setFieldValue("email", data.user.email || "");
      formik.setFieldValue("address", data.user.address || "");
      formik.setFieldValue("mobileNumber", data.user.mobileNumber || "");
      formik.setFieldValue("bio", data.user.bio || "");
      formik.setFieldValue("password", data.user.password || "");

      if (data.user.avatar && data.user.avatar.url) {
        const avatarUrl = data.user.avatar.url;
        setAvatar(avatarUrl);
        formik.setFieldValue("avatar", avatarUrl);
      } else {
        setAvatar(null);
        formik.setFieldValue("avatar", null);
      }

      if (data.user.country) {
        const selectedCountry = countryOptions.find(
          (option) => option.label === data.user.country,
        );
        setSelectedCountry(selectedCountry);
        formik.setFieldValue("country", selectedCountry || null);
      }

      if (data.user.gender) {
        const genderOption = {
          label: data.user.gender,
          value: data.user.gender,
        };
        formik.setFieldValue("gender", genderOption);
      }

      if (data.user.birthDate) {
        const birthDate = new Date(data.user.birthDate);
        birthDate.setDate(birthDate.getDate() - 1);
        setStartDate(birthDate);
        formik.setFieldValue("birthDate", birthDate);
      }
    }
  }, [data, countryOptions]);

  useEffect(() => {
    if (selectedCountry) {
      const provinces = State.getStatesOfCountry(selectedCountry.value).map(
        (province) => ({
          label: province.name,
          value: province.isoCode,
        }),
      );

      if (provinces.length > 0) {
        setProvinceOptions(provinces);

        if (data?.user?.province) {
          const defaultProvince = provinces.find(
            (option) => option.label === data.user.province,
          );

          if (defaultProvince) {
            setSelectedProvince(defaultProvince);
            formik.setFieldValue("province", defaultProvince);
          } else {
            formik.setFieldValue("province", data.user.province);
          }

          const cities = City.getCitiesOfState(
            selectedCountry.value,
            defaultProvince ? defaultProvince.value : "",
          ).map((city) => ({
            label: city.name,
            value: city.name,
          }));

          if (cities.length > 0) {
            setCityOptions(cities);

            if (data?.user?.city) {
              const defaultCity = cities.find(
                (city) => city.label === data.user.city,
              );

              if (defaultCity) {
                formik.setFieldValue("city", defaultCity);
              } else {
                formik.setFieldValue("city", data.user.city);
              }
            }
          }
        }
      } else {
        setProvinceOptions([]);
        setCityOptions([]);
        formik.setFieldValue("province", data?.user?.province || "");
        formik.setFieldValue("city", data?.user?.city || "");
      }
    } else {
      setProvinceOptions([]);
      setCityOptions([]);
      formik.setFieldValue("province", "");
      formik.setFieldValue("city", "");
    }
  }, [selectedCountry, data]);

  useEffect(() => {
    if (selectedProvince) {
      const cities = City.getCitiesOfState(
        selectedCountry.value,
        selectedProvince.value,
      ).map((city) => ({
        label: city.name,
        value: city.name,
      }));

      if (cities.length > 0) {
        setCityOptions(cities);

        if (data?.user?.city) {
          const defaultCity = cities.find(
            (city) => city.label === data.user.city,
          );

          if (defaultCity) {
            formik.setFieldValue("city", defaultCity);
          } else {
            formik.setFieldValue("city", data.user.city);
          }
        }
      }
    }
  }, [selectedProvince, selectedCountry, data]);

  const handleAvatarChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        formik.setFieldValue("avatar", reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        formik.setFieldValue("avatar", reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      Toast(TOAST.ERROR, "Please upload a valid image file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  useEffect(() => {
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  return (
    <>
      {isLoading || isUpdatingPassword ? (
        <div className="loader">
          <FadeLoader color="#FAF7F7" loading={true} size={50} />
        </div>
      ) : (
        <>
          <Navbar title="Settings" />
          <section className="h-screen px-10 pt-12 pb-32 overflow-y-auto scrollbar-thin 2xl:px-28 xl:px-24 lg:px-12">
            <div className="flex items-center justify-between pb-3 pr-6 text-light-default">
              <div className="text-sm font-semibold xs:text-lg md:text-2xl">
                General info
              </div>
              <button
                type="button"
                className="px-4 py-1 border rounded-full xs:px-6 md:px-10 border-light-default"
                onClick={formik.handleSubmit}
              >
                Save
              </button>
            </div>
            <hr className="pb-6 border-light-shadow" />

            <form onSubmit={formik.handleSubmit}>
              <div className="flex items-end justify-between pb-8">
                <div>
                  <h1 className="pb-3 text-sm font-semibold xs:text-xl text-light-default">
                    Profile Photo
                  </h1>
                  <div
                    className={`flex flex-col items-center justify-center p-8 cursor-pointer rounded-xl  w-fit relative ${
                      formik.values.avatar
                        ? ""
                        : "border-[.125rem] border-dashed border-light-secondary bg-dark-default"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                      id="upload-photo"
                    />
                    <label htmlFor="upload-photo">
                      {formik.values.avatar ? (
                        <div className="relative">
                          <img
                            src={formik.values.avatar}
                            alt="Profile Preview"
                            className="object-cover rounded-full xl:w-[12rem] xl:h-[12rem] w-[10rem] h-[10rem]"
                          />
                          <button
                            type="button"
                            className="absolute bottom-0 right-0 p-1 rounded-full bg-dark-secondary"
                            onClick={() =>
                              document.getElementById("upload-photo").click()
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center cursor-pointer">
                          <img
                            src={UploadImg}
                            alt="UploadImg"
                            className="w-12 h-12 xs:h-16 xs:w-16 md:h-fit md:w-fit"
                          />
                          <h1 className="pt-3 pb-1 text-xs text-center md:text-base text-light-default">
                            Upload a Profile Photo
                          </h1>
                          <p className="text-xs text-center md:text-base text-light-secondary">
                            jpg, jpeg, png files
                          </p>
                        </div>
                      )}
                    </label>
                  </div>

                  {formik.errors.avatar && formik.touched.avatar && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.avatar}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center 2xl:gap-x-16 xl:gap-x-12 lg:gap-x-10 md:gap-x-8 gap-x-7">
                <div className="w-full mb-4">
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-xs font-medium md:text-base text-light-default"
                  >
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    placeholder="Enter your Firstname"
                    className={`w-full p-4 text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none ${
                      formik.errors.firstname && formik.touched.firstname
                        ? "border-error-default"
                        : "border-light-secondary"
                    }`}
                    value={formik.values.firstname || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.firstname && formik.touched.firstname && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.firstname}
                    </p>
                  )}
                </div>
                <div className="w-[46%] mb-4 md:w-full">
                  <label
                    htmlFor="mobileNumber"
                    className="block mb-2 text-xs font-medium md:text-base text-light-default"
                  >
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <PhoneInput
                    international
                    limitMaxLength
                    focusInputOnCountrySelection
                    defaultCountry="PH"
                    countryCallingCodeEditable={false}
                    className={`text-[.65rem] md:text-base w-full p-4 border rounded-md text-light-default placeholder-light-secondary ${
                      formik.errors.mobileNumber && formik.touched.mobileNumber
                        ? "border-error-default"
                        : "border-light-secondary"
                    }`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    value={formik.values.mobileNumber}
                    onChange={(value) =>
                      formik.setFieldValue("mobileNumber", value)
                    }
                    style={{
                      boxShadow: isFocused ? "0 0 0 1.75px #216BA5" : "none",
                    }}
                  />
                  {formik.errors.mobileNumber &&
                    formik.touched.mobileNumber && (
                      <p className="mt-2 text-lg text-error-default">
                        {formik.errors.mobileNumber}
                      </p>
                    )}
                </div>
              </div>

              <div className="flex items-center justify-center 2xl:gap-x-16 xl:gap-x-12 lg:gap-x-10 md:gap-x-8 gap-x-7">
                <div className="w-full mb-4">
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-xs font-medium md:text-base text-light-default"
                  >
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    placeholder="Enter your Lastname"
                    className={`w-full p-4 text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none ${
                      formik.errors.lastname && formik.touched.lastname
                        ? "border-error-default"
                        : "border-light-secondary"
                    }`}
                    value={formik.values.lastname || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.lastname && formik.touched.lastname && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.lastname}
                    </p>
                  )}
                </div>

                <div className="relative w-full mb-4">
                  <label
                    htmlFor="birthDate"
                    className="block mb-2 text-xs font-medium md:text-base text-light-default"
                  >
                    Birth Date <span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      id="birthDate"
                      name="birthDate"
                      value={startDate ? startDate.toLocaleDateString() : ""}
                      readOnly
                      className={`text-[.65rem] md:text-base w-full p-4 border rounded-md text-light-default placeholder-light-secondary bg-transparent focus:border-info-secondary focus:outline-none ${
                        formik.errors.birthDate && formik.touched.birthDate
                          ? "border-error-default"
                          : "border-light-secondary"
                      }`}
                      placeholder="Select Birthday"
                      onClick={() => setShowDatePicker((prev) => !prev)}
                    />
                    <img
                      src={CalendarImg}
                      alt="CalendarImg"
                      className="absolute hidden cursor-pointer right-4 text-light-secondary xxs:block"
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
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.birthDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center 2xl:gap-x-16 xl:gap-x-12 lg:gap-x-10 md:gap-x-8 gap-x-7">
                <div className="w-full mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-xs font-medium md:text-base text-light-default"
                  >
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter your Email"
                    className={`w-full p-4 text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-light-secondary focus:outline-none ${
                      formik.errors.email && formik.touched.email
                        ? "border-error-default"
                        : "border-light-secondary"
                    }`}
                    value={formik.values.email || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    readOnly
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="w-full mb-4">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-xs font-medium md:text-base text-light-default"
                  >
                    Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter your Address"
                    className={`w-full p-4 text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none ${
                      formik.errors.address && formik.touched.address
                        ? "border-error-default"
                        : "border-light-secondary"
                    }`}
                    value={formik.values.address || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.address && formik.touched.address && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.address}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center 2xl:gap-x-16 xl:gap-x-12 lg:gap-x-10 md:gap-x-8 gap-x-7">
                <div className="relative w-full mb-4">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-xs font-medium md:text-base text-light-default"
                  >
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <Select
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                    value={formik.values.gender}
                    onChange={(option) =>
                      formik.setFieldValue("gender", option)
                    }
                    className={`w-full p-[.65rem] text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none ${
                      formik.errors.gender && formik.touched.gender
                        ? "border-error-default"
                        : "border-light-secondary"
                    }`}
                    placeholder="Select gender"
                    styles={SelectStyles()}
                  />
                  {formik.errors.gender && formik.touched.gender && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.gender}
                    </p>
                  )}
                </div>

                <div className="w-full mb-4">
                  <label
                    htmlFor="bio"
                    className="block mb-2 text-xs font-medium md:text-base text-light-default"
                  >
                    Bio <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="bio"
                    placeholder="Enter your Bio"
                    className={`w-full p-4 text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none ${
                      formik.errors.bio && formik.touched.bio
                        ? "border-error-default"
                        : "border-light-secondary"
                    }`}
                    value={formik.values.bio || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.bio && formik.touched.bio && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center 2xl:gap-x-16 xl:gap-x-12 lg:gap-x-10 md:gap-x-8 gap-x-7">
                <div className="relative w-full mb-4">
                  <label
                    htmlFor="country"
                    className="block mb-2 text-base font-medium text-light-default"
                  >
                    Country <span className="text-red-600">*</span>
                  </label>
                  <Select
                    options={countryOptions}
                    value={formik.values.country || null}
                    onChange={(option) => {
                      setSelectedCountry(option);
                      formik.setFieldValue("country", option || null);
                      setSelectedProvince(null);
                      setProvinceOptions([]);
                      setCityOptions([]);
                      formik.setFieldValue("province", null);
                      formik.setFieldValue("city", null);
                    }}
                    className={`w-full p-[.65rem] text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none ${
                      formik.errors.country && formik.touched.country
                        ? "border-error-default"
                        : "border-light-secondary"
                    }`}
                    placeholder="Select country"
                    styles={SelectStyles()}
                  />
                  {formik.errors.country && formik.touched.country && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.country}
                    </p>
                  )}
                </div>

                <div className="relative w-full mb-4">
                  <label
                    htmlFor="province"
                    className="block mb-2 text-base font-medium text-light-default"
                  >
                    Province <span className="text-red-600">*</span>
                  </label>
                  {provinceOptions.length > 0 ? (
                    <Select
                      options={provinceOptions}
                      value={formik.values.province || null}
                      onChange={(option) => {
                        setSelectedProvince(option);
                        formik.setFieldValue("province", option || null);
                        setCityOptions([]);
                        formik.setFieldValue("city", null);
                      }}
                      className={`w-full p-[.65rem] text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none ${
                        formik.errors.province && formik.touched.province
                          ? "border-error-default"
                          : "border-light-secondary"
                      }`}
                      placeholder="Select province"
                      styles={SelectStyles()}
                      isDisabled={!selectedCountry}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Enter your province"
                      value={formik.values.province || ""}
                      onChange={(e) =>
                        formik.setFieldValue("province", e.target.value)
                      }
                      className={`capitalize w-full p-4 text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none ${
                        formik.errors.province && formik.touched.province
                          ? "border-error-default"
                          : "border-light-secondary"
                      }`}
                    />
                  )}
                  {formik.errors.province && formik.touched.province && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.province}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center 2xl:gap-x-16 xl:gap-x-12 lg:gap-x-10 md:gap-x-8 gap-x-7">
                <div className="relative w-full mb-4">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-base font-medium text-light-default"
                  >
                    City <span className="text-red-600">*</span>
                  </label>
                  {cityOptions.length > 0 ? (
                    <Select
                      options={cityOptions}
                      value={formik.values.city || null}
                      onChange={(option) =>
                        formik.setFieldValue("city", option || null)
                      }
                      className={`w-full p-[.65rem] text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none ${
                        formik.errors.city && formik.touched.city
                          ? "border-error-default"
                          : "border-light-secondary"
                      }`}
                      placeholder="Select city"
                      styles={SelectStyles()}
                      isDisabled={!selectedProvince}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Enter your city"
                      value={formik.values.city || ""}
                      onChange={(e) =>
                        formik.setFieldValue("city", e.target.value)
                      }
                      className={`capitalize w-full p-4 text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none ${
                        formik.errors.city && formik.touched.city
                          ? "border-error-default"
                          : "border-light-secondary"
                      }`}
                    />
                  )}
                  {formik.errors.city && formik.touched.city && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.city}
                    </p>
                  )}
                </div>

                <div className="w-full mb-4">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-base font-medium text-light-default"
                  >
                    Password <span className="text-error-default">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      placeholder="Enter password"
                      className={`w-full p-4 text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none ${
                        formikPassword.errors.password &&
                        formikPassword.touched.password
                          ? "border-error-default"
                          : "border-light-secondary"
                      }`}
                      value={formikPassword.values.password || ""}
                      onChange={formikPassword.handleChange}
                      onBlur={(e) => {
                        if (
                          !e.relatedTarget ||
                          e.relatedTarget.id !== "resetButton"
                        ) {
                          formikPassword.setFieldTouched("password", false);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="md:text-base text-[.65rem] absolute transform -translate-y-1/2 md:right-20  right-12 top-1/2 text-light-secondary"
                    >
                      {isPasswordVisible ? "Hide" : "Show"}
                    </button>
                    <button
                      type="button"
                      onClick={formikPassword.handleSubmit}
                      className="md:text-base text-[.65rem] absolute transform -translate-y-1/2 md:right-6 right-3 top-1/2 text-light-secondary"
                    >
                      Reset
                    </button>
                  </div>
                  {formikPassword.errors.password &&
                    formikPassword.touched.password && (
                      <p className="mt-2 text-lg text-error-default">
                        {formikPassword.errors.password}
                      </p>
                    )}
                </div>
              </div>
            </form>
            <Footer />
          </section>
        </>
      )}
    </>
  );
}
