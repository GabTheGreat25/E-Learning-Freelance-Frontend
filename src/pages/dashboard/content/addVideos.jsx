import React, { useState, useEffect } from "react";
import { contentTabs, Toast } from "@utils";
import { Navbar, Footer, TabNavigation } from "@components";
import { CalendarImg, UploadImg } from "@assets";
import { useNavigate } from "react-router-dom";
import { TOAST } from "@constants";

export function AddVideos() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Videos");
  const [video, setVideo] = useState(null);
  const [fileName, setFileName] = useState("");

  const truncateText = (text, charLimit) => {
    if (text.length > charLimit) {
      return `${text.slice(0, charLimit)}...`;
    }
    return text;
  };

  const handleFileSelect = (file) => {
    if (file && file.type === "video/mp4") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideo(reader.result);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    } else {
      Toast(TOAST.ERROR, "Only MP4 files are supported.");
    }
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
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
      <Navbar title="Content" />
      <section className="h-screen px-4 pt-12 pb-32 overflow-y-auto scrollbar-thin sm:px-10 2xl:px-28 xl:px-24 lg:px-12 text-light-default">
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
          <button className="py-1 border rounded-full px- md:text-base md:px-12">
            <span className="text-lg">Save</span>
          </button>
        </div>
        {/* Form */}
        <div className="rounded-xl bg-dark-secondary">
          <form className="px-10 py-6">
            <div className="flex items-center justify-center">
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
              </div>
              <div>
                <h1 className="pb-3 text-sm font-semibold xs:text-xl text-light-default">
                  Video Upload
                </h1>
                <div
                  className={`flex flex-col items-center justify-center md:p-8 p-4 border-[.125rem] border-dashed cursor-pointer rounded-xl bg-dark-default w-fit focus:border-info-secondary focus:outline-none`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="video/mp4"
                    onChange={handleVideo}
                    className="hidden"
                    id="upload-video"
                  />
                  <label htmlFor="upload-video">
                    <div className="flex flex-col items-center justify-center cursor-pointer">
                      <img
                        src={UploadImg}
                        alt="UploadImg"
                        className="w-12 h-12 xs:h-16 xs:w-16 md:h-fit md:w-fit"
                      />
                      <h1 className="pt-3 pb-1 text-xs text-center md:text-base text-light-default">
                        Drag MP4 files here
                      </h1>
                      <p className="text-xs text-center md:text-base text-light-secondary">
                        {fileName
                          ? truncateText(fileName, 30)
                          : "Only MP4 files supported"}
                      </p>
                    </div>
                  </label>
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
