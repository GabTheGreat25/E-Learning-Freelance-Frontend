import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { contentTabs, SelectStyles, Toast } from "@utils";
import { Navbar, Footer, TabNavigation } from "@components";
import { UploadImg, CalendarImg } from "@assets";
import { TOAST } from "@constants";

export function AddCourses() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Courses");
  const [banner, setBanner] = useState(null);
  const [bannerFileName, setBannerFileName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailFileName, setThumbnailFileName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dropdownRef = useRef(null);
  const [conditions, setConditions] = useState([]);
  const [isConditionDropdownVisible, setConditionDropdownVisible] =
    useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setConditionDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleDateChange = (date) => {
    setStartDate(date);
    setShowDatePicker(false);
  };

  const truncateText = (text, charLimit) => {
    if (text.length > charLimit) {
      return `${text.slice(0, charLimit)}...`;
    }
    return text;
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setBanner(reader.result);
          setBannerFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    } else {
      Toast(TOAST.ERROR, "Only image files are supported for the banner.");
    }
  };

  const handleBannerFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBanner(reader.result);
        setBannerFileName(file.name);
      };
      reader.readAsDataURL(file);
    } else {
      Toast(TOAST.ERROR, "Please upload a valid image file for the banner.");
    }
  };

  const handleBannerDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleBannerFileSelect(files[0]);
    }
  };

  const handleBannerDragOver = (e) => {
    e.preventDefault();
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setThumbnail(reader.result);
          setThumbnailFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    } else {
      Toast(TOAST.ERROR, "Only image files are supported for the thumbnail.");
    }
  };

  const handleThumbnailFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
        setThumbnailFileName(file.name);
      };
      reader.readAsDataURL(file);
    } else {
      Toast(TOAST.ERROR, "Please upload a valid image file for the thumbnail.");
    }
  };

  const handleThumbnailDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleThumbnailFileSelect(files[0]);
    }
  };

  const handleThumbnailDragOver = (e) => {
    e.preventDefault();
  };

  const conditionOptions = [
    {
      label: "Required Months Subscribed",
      value: "requiredMonthsSubscribed",
    },
    { label: "Required Finished Course", value: "requiredFinishedCourse" },
  ];

  const handleConditionSelect = (option) => {
    let dynamicOptions;

    if (option.value === "requiredMonthsSubscribed") {
      dynamicOptions = [
        { label: "1 Month", value: "1_month" },
        { label: "3 Months", value: "3_months" },
        { label: "6 Months", value: "6_months" },
      ];
    } else if (option.value === "requiredFinishedCourse") {
      dynamicOptions = [
        { label: "Intro to Programming", value: "intro_programming" },
        { label: "Advanced JavaScript", value: "advanced_javascript" },
        { label: "Web Development", value: "web_development" },
      ];
    }

    setConditions([
      ...conditions,
      {
        ...option,
        selectedValue: dynamicOptions[0],
        options: dynamicOptions,
      },
    ]);
    setConditionDropdownVisible(false);
  };

  const handleSelectChange = (index, selectedOption) => {
    const updatedConditions = [...conditions];
    updatedConditions[index].selectedValue = selectedOption;
    setConditions(updatedConditions);
  };

  const handleDeleteCondition = (index) => {
    const updatedConditions = conditions.filter((_, i) => i !== index);
    setConditions(updatedConditions);
  };

  return (
    <>
      <Navbar title="Content" />
      <section className="h-screen px-16 pt-12 pb-32 overflow-y-auto scrollbar-thin text-light-default">
        {/* Content */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={contentTabs}
        />
        {/* Breadcrumbs */}
        <div className="flex items-center justify-start mt-4 mb-5 gap-x-3">
          <button
            onClick={() => navigate(-1)}
            className="text-lg underline text-light-default"
          >
            Courses
          </button>
          <span className="text-2xl"> &#8250; </span>
          <span className="text-lg underline text-light-default">
            Add new courses
          </span>
        </div>
        {/* Form Title */}
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-3xl">New Course</h1>
          <button
            onClick={() => navigate("/dashboard/courses/view")}
            className="py-1 border rounded-full px- md:text-base md:px-12"
          >
            <span className="text-lg">Save</span>
          </button>
        </div>
        {/* Form */}
        <div className="rounded-xl bg-dark-secondary" ref={dropdownRef}>
          <form className="px-10 py-6">
            <div className="grid grid-cols-[60%_40%] items-start justify-center gap-x-10 px-6">
              <div className="w-full">
                <div className="relative mb-8">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-xl font-medium"
                  >
                    Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter title"
                    className={`w-full p-4 border rounded-md text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none bg-transparent`}
                  />
                </div>
                <div className="relative mb-6">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-xl font-medium"
                  >
                    Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows="6"
                    placeholder="Enter description"
                    className={`w-full p-4 border rounded-md text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none bg-transparent resize-none`}
                  />
                </div>
                <div className="relative mb-8">
                  <label
                    htmlFor="link"
                    className="block mb-2 text-xl font-medium"
                  >
                    Link <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="link"
                    type="text"
                    placeholder="Enter link"
                    className={`w-full p-4 border rounded-md text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none bg-transparent`}
                  />
                </div>
                <div className="flex gap-x-6">
                  <div className="relative w-full mb-4">
                    <label
                      htmlFor="visibility"
                      className="block mb-2 text-xl font-medium"
                    >
                      Visibility <span className="text-red-600">*</span>
                    </label>
                    <Select
                      options={[
                        { label: "Published", value: "Published" },
                        { label: "Unpublished", value: "Unpublished" },
                      ]}
                      className={`w-full p-[.65rem] border rounded-md focus:border-info-secondary focus:outline-none`}
                      placeholder="Select visibility"
                      styles={SelectStyles()}
                    />
                  </div>
                  <div className="relative w-full mb-4">
                    <label
                      htmlFor="birthDate"
                      className="block mb-2 text-xl font-medium"
                    >
                      Birth Date <span className="text-red-600">*</span>
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        id="birthDate"
                        value={startDate ? startDate.toLocaleDateString() : ""}
                        readOnly
                        className={`w-full p-[1.1rem] border rounded-md focus:border-info-secondary focus:outline-none bg-transparent text-light-secondary placeholder-light-secondary`}
                        placeholder="Date of Publishing"
                        onClick={() => setShowDatePicker((prev) => !prev)}
                      />
                      <img
                        src={CalendarImg}
                        alt="Calendar"
                        className="absolute cursor-pointer right-4 text-light-secondary"
                        onClick={() => setShowDatePicker((prev) => !prev)}
                      />
                    </div>
                    {showDatePicker && (
                      <div className="absolute z-10 mt-2">
                        <DatePicker
                          selected={startDate}
                          onChange={handleDateChange}
                          inline
                          showYearDropdown
                          scrollableYearDropdown={false}
                          dropdownMode="select"
                          dateFormat="MM/dd/yyyy"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative">
                  {/* Button to toggle dropdown */}
                  <div className="flex items-end justify-between">
                    <h1 className="text-xl">Conditions</h1>
                    <div className="px-8 py-[.1rem] border border-light-default rounded-full">
                      <button
                        type="button"
                        onClick={() => {
                          setConditionDropdownVisible(
                            !isConditionDropdownVisible,
                          );
                        }}
                        className="flex items-center text-lg"
                      >
                        Add Condition
                      </button>
                    </div>
                  </div>

                  {/* Immediately show conditions as buttons */}
                  {isConditionDropdownVisible && (
                    <div className="absolute right-0 z-50 py-2 mt-2 border rounded-lg bg-dark-tertiary">
                      {conditionOptions.map((option, index, array) => (
                        <div key={option.value}>
                          <button
                            className={`block w-full p-2 pl-5 pr-20 text-start ${
                              conditions.some(
                                (condition) => condition.value === option.value,
                              )
                                ? "text-light-secondary cursor-not-allowed"
                                : "text-light-default"
                            }`}
                            onClick={() =>
                              !conditions.some(
                                (condition) => condition.value === option.value,
                              ) && handleConditionSelect(option)
                            }
                            disabled={conditions.some(
                              (condition) => condition.value === option.value,
                            )}
                          >
                            {option.label}
                          </button>
                          {index < array.length - 1 && (
                            <hr className="my-2 border-t border-light-secondary" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Display selected conditions */}
                  <div>
                    {conditions.length === 0 ? (
                      <p className="pt-10 text-lg text-center text-light-secondary">
                        No conditions
                      </p>
                    ) : (
                      <ul className="pt-4 cursor-pointer">
                        {conditions.map((condition, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-[47%_47%_6%] py-[.4rem]"
                          >
                            <div className="flex items-center justify-start w-full py-1 pl-4 border rounded-tl-lg rounded-bl-lg bg-dark-default">
                              <li>{condition.label}</li>
                            </div>
                            <div className="w-full py-1 pl-4 pr-2 border bg-dark-default">
                              <Select
                                options={condition.options}
                                value={condition.selectedValue}
                                onChange={(selectedOption) =>
                                  handleSelectChange(index, selectedOption)
                                }
                                placeholder="Select value"
                                styles={SelectStyles()}
                              />
                            </div>
                            <div className="flex items-center justify-center w-full py-1 border rounded-tr-lg rounded-br-lg bg-dark-default">
                              <HiOutlineTrash
                                className="text-2xl cursor-pointer text-light-secondary"
                                onClick={() => handleDeleteCondition(index)}
                              />
                            </div>
                          </div>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid gap-y-8">
                {/* Banner Section */}
                <div className="w-full">
                  <h1 className="pb-3 text-sm xs:text-xl text-light-default">
                    Banner
                  </h1>
                  <div
                    className={`flex items-center justify-center w-full p-6 border-[.125rem] border-dashed cursor-pointer rounded-xl bg-dark-default focus:border-info-secondary focus:outline-none`}
                    onDragOver={handleBannerDragOver}
                    onDrop={handleBannerDrop}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerChange}
                      className="hidden"
                      id="upload-banner"
                    />
                    <label htmlFor="upload-banner">
                      <div className="flex flex-col items-center justify-center cursor-pointer">
                        <img
                          src={UploadImg}
                          alt="UploadImg"
                          className="w-12 h-12 xs:h-16 xs:w-16 md:h-fit md:w-fit"
                        />
                        <h1 className="pt-3 pb-1 text-xs text-center md:text-base text-light-default">
                          Banner Photo
                        </h1>
                        <p className="text-xs text-center md:text-base text-light-secondary">
                          {bannerFileName
                            ? truncateText(bannerFileName, 20)
                            : "jpg, jpeg, png files"}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                {/* Thumbnail Section */}
                <div className="w-full">
                  <h1 className="pb-3 text-sm xs:text-xl text-light-default">
                    Thumbnail
                  </h1>
                  <div
                    className={`flex items-center justify-center w-full p-6 border-[.125rem] border-dashed cursor-pointer rounded-xl bg-dark-default focus:border-info-secondary focus:outline-none`}
                    onDragOver={handleThumbnailDragOver}
                    onDrop={handleThumbnailDrop}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                      id="upload-thumbnail"
                    />
                    <label htmlFor="upload-thumbnail">
                      <div className="flex flex-col items-center justify-center cursor-pointer">
                        <img
                          src={UploadImg}
                          alt="UploadImg"
                          className="w-12 h-12 xs:h-16 xs:w-16 md:h-fit md:w-fit"
                        />
                        <h1 className="pt-3 pb-1 text-xs text-center md:text-base text-light-default">
                          Thumbnail Photo
                        </h1>
                        <p className="text-xs text-center md:text-base text-light-secondary">
                          {thumbnailFileName
                            ? truncateText(thumbnailFileName, 20)
                            : "jpg, jpeg, png files"}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </section>
    </>
  );
}
