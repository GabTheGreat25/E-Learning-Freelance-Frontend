import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { contentTabs, SelectStyles } from "@utils";
import { Navbar, Footer, TabNavigation } from "@components";
import { CalendarImg, VideoImg } from "@assets";

const videoData = [
  {
    id: 1,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
  },
  {
    id: 2,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
  },
  {
    id: 3,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
  },
  {
    id: 4,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
  },
  {
    id: 5,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
  },
  {
    id: 6,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
  },
];

export function AddCourses() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Courses");
  const [startDate, setStartDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dropdownRef = useRef(null);
  const [conditions, setConditions] = useState([]);
  const [isConditionDropdownVisible, setConditionDropdownVisible] =
    useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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

  const toggleCheckbox = (videoId) => {
    setSelectedVideos((prevSelected) =>
      prevSelected.includes(videoId)
        ? prevSelected.filter((id) => id !== videoId)
        : [...prevSelected, videoId],
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(videoData.map((video) => video.id));
    }
    setSelectAll(!selectAll);
  };

  const isVideoSelected = (videoId) => selectedVideos.includes(videoId);

  const truncateText = (text, charLimit) => {
    if (text.length > charLimit) {
      return `${text.slice(0, charLimit)}...`;
    }
    return text;
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
          <form className="px-10 py-6 xl:px-12">
            <div className="grid items-start justify-center xl:grid-cols-[55%_45%] gap-x-10">
              <div className="w-full pb-6 xl:pb-0">
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
                <div className="relative pt-2">
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
                      <p className="pt-10 pb-5 text-lg text-center text-light-secondary">
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
              <div className="grid">
                <div className="w-full h-full rounded-lg text-light-default">
                  <h1 className="pb-2 text-xl">Videos</h1>

                  {/* Header Section */}
                  <div className="flex items-center justify-between px-6 py-3 bg-black rounded-tl-xl rounded-tr-xl">
                    <div className="flex items-center justify-center gap-x-4">
                      <input
                        type="checkbox"
                        className="w-5 h-5 p-1 text-[.6rem] bg-transparent border-[3px] rounded-md appearance-none cursor-pointer border-light-default peer checked:border-light-default checked:ring-0"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                      <h3 className="text-xl">Video</h3>
                    </div>

                    <span className="text-xl font-light">
                      {videoData.length}
                    </span>
                  </div>

                  {/* Video List Section */}
                  <div className="grid bg-dark-default h-[530px] overflow-hidden overflow-y-scroll scrollbar-thin">
                    {videoData.map((video) => (
                      <>
                        <div key={video.id} className="py-3 rounded-lg">
                          <div className="grid items-center justify-between grid-cols-[5%_auto_50%] px-6 pt-2 pb-5 gap-x-6">
                            <input
                              type="checkbox"
                              className="w-6 h-6 p-1 text-[.6rem] bg-transparent border-[3px] rounded-md appearance-none cursor-pointer border-light-default peer checked:border-light-default checked:ring-0"
                              checked={isVideoSelected(video.id)}
                              onChange={() => toggleCheckbox(video.id)}
                            />
                            <img
                              src={VideoImg}
                              alt="Video thumbnail"
                              className="object-cover w-40 h-24 mr-4 rounded-lg"
                            />
                            <div>
                              <h4 className="text-base 2xl:text-lg">
                                {truncateText(video.title, 50)}
                              </h4>
                              <p className="text-sm text-light-secondary">
                                {truncateText(video.description, 50)}
                              </p>
                            </div>
                          </div>
                          <hr className="w-full border-light-shadow" />
                        </div>
                      </>
                    ))}
                  </div>

                  {/* Footer Section */}
                  <div className="flex items-center justify-center px-4 py-3 bg-black rounded-bl-xl rounded-br-xl">
                    <button
                      type="button"
                      className="text-xl text-light-default"
                    >
                      Add Video
                    </button>
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
