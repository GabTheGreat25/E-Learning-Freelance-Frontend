import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { contentTabs, SelectStyles, Toast } from "@utils";
import { Navbar, Footer, TabNavigation } from "@components";
import { UploadImg, CalendarImg } from "@assets";
import { useNavigate } from "react-router-dom";
import { TOAST } from "@constants";

export function AddVideos() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Videos");
  const [video, setPreview] = useState(null);
  const [previewFileName, setPreviewFileName] = useState("");
  const [banner, setBanner] = useState(null);
  const [bannerFileName, setBannerFileName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailFileName, setThumbnailFileName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const handlePreviewFileSelect = (file) => {
    if (file && file.type === "video/mp4") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setPreviewFileName(file.name);
      };
      reader.readAsDataURL(file);
    } else {
      Toast(TOAST.ERROR, "Only MP4 files are supported for the preview.");
    }
  };

  const handlePreview = (e) => {
    const file = e.target.files[0];
    handlePreviewFileSelect(file);
  };

  const handlePreviewDragOver = (e) => {
    e.preventDefault();
  };

  const handlePreviewDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handlePreviewFileSelect(files[0]);
    }
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
            Videos
          </button>
          <span className="text-2xl"> &#8250; </span>
          <span className="text-lg underline text-light-default">
            Add new video
          </span>
        </div>
        {/* Form Title */}
        <div className="flex items-center justify-between pb-4">
          <h1 className="text-3xl">New Video</h1>
          <button
            onClick={() => navigate("/dashboard/videos/view")}
            className="py-1 border rounded-full px- md:text-base md:px-12"
          >
            <span className="text-lg">Save</span>
          </button>
        </div>
        {/* Form */}
        <div className="rounded-xl bg-dark-secondary">
          <form className="px-10 py-6">
            <div className="pb-6">
              <h1 className="pb-3 text-sm xs:text-xl text-light-default">
                Preview
              </h1>
              <div
                className={`w-full h-[18rem] flex flex-col items-center justify-center md:p-8 p-4 border-[.125rem] border-dashed cursor-pointer rounded-xl bg-dark-default focus:border-info-secondary focus:outline-none`}
                onDragOver={handlePreviewDragOver}
                onDrop={handlePreviewDrop}
              >
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={handlePreview}
                  className="hidden"
                  id="upload-preview"
                />
                <label htmlFor="upload-preview">
                  <div className="flex flex-col items-center justify-center cursor-pointer">
                    <img
                      src={UploadImg}
                      alt="UploadImg"
                      className="w-12 h-12 xs:h-16 xs:w-16 md:h-fit md:w-fit"
                    />
                    <h1 className="pt-3 text-xs text-center md:text-base text-light-default">
                      Drag MP4 files here
                    </h1>
                    <p className="text-xs text-center md:text-base text-light-secondary">
                      {previewFileName
                        ? truncateText(previewFileName, 30)
                        : "MP4 files supported"}
                    </p>
                  </div>
                </label>
              </div>
            </div>
            <div className="grid xl:grid-cols-[60%_40%] xl:items-start xl:justify-center xl:gap-x-10 xl:px-6">
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
                <div className="relative mb-8">
                  <label
                    htmlFor="author"
                    className="block mb-2 text-xl font-medium"
                  >
                    Author <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="author"
                    type="text"
                    placeholder="Enter author"
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
                    htmlFor="gender"
                    className="block mb-2 text-xl font-medium"
                  >
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <Select
                    options={[
                      { label: "Course 1", value: "Course 1" },
                      { label: "Course 2", value: "Course 2" },
                    ]}
                    className={`w-full p-[.65rem] border rounded-md focus:border-info-secondary focus:outline-none`}
                    placeholder="Select course"
                    styles={SelectStyles()}
                  />
                </div>
                <div className="relative mb-6">
                  <label
                    htmlFor="transcription"
                    className="block mb-2 text-xl font-medium"
                  >
                    Transcription <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="transcription"
                    rows="6"
                    placeholder="Enter transcription"
                    className={`w-full p-4 border rounded-md text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none bg-transparent resize-none`}
                  />
                </div>
                <div className="flex gap-x-6">
                  <div className="relative w-full mb-8">
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
                  <div className="relative w-full mb-8">
                    <div className="flex items-center pt-9">
                      <input
                        type="text"
                        id=""
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
