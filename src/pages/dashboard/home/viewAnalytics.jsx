import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { HiOutlineChartBar } from "react-icons/hi";
import { Navbar, Footer, TabNavigation, DataTable } from "@components";
import { homeTabs } from "@utils";
import { VideoImg } from "@assets";

const currentVideos = [
  {
    title: "Things to master if you want to learn",
    courseName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    courseName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
];

const doneVideos = [
  {
    title: "Things to master if you want to learn",
    courseName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    courseName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    courseName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    courseName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
];

const generateObjectId = () => {
  return (
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0") +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0") +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  );
};

export function ViewAnalytics() {
  const [activeTab, setActiveTab] = useState("Analytics");
  const navigate = useNavigate();

  const columns = ["ID", "Lesson", "Progress", "Started", "Finished", "Date"];

  const data = new Array(200).fill().map(() => ({
    _id: generateObjectId(),
    Lesson: "How to be successfull",
    Progress: "50%",
    Started: "Aug 5, 2024",
    Finished: "N/A",
    Date: "Aug 10 , 2024",
  }));

  const watchingVideos = currentVideos.slice(0, 2);
  const finishedVideos = doneVideos.slice(0, 4);

  const description =
    "Learn why people think, feel, and behave the way they do; how to utilize advanced communication styles; and the fundamentals of leadership and management.";

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(" ")} ...`;
    }
    return text;
  };

  return (
    <>
      <Navbar title="Analytics" />
      <section className="h-screen px-4 pt-12 pb-32 overflow-y-auto bg-black scrollbar-thin sm:px-10 2xl:px-28 xl:px-24 lg:px-12 text-light-default">
        {/* Analytics */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={homeTabs}
        />

        {/* Breadcrumbs */}
        <div className="flex items-center justify-start mt-4 mb-8 gap-x-3">
          <button
            onClick={() => navigate(-1)}
            className="text-lg underline text-light-default"
          >
            Analytics
          </button>
          <span className="text-2xl"> &#8250; </span>
          <span className="text-lg underline text-light-default">
            Juan Dela Cruz
          </span>
        </div>
        <div>
          {/* Student */}
          <div className="pb-12">
            <h1 className="text-3xl">Juan Dela Cruz</h1>
            <p className="text-sm text-light-secondary">
              Member Since: August 10, 2024
            </p>
            <p className="text-sm text-light-secondary">Monthly Member</p>
          </div>
          <div></div>
          {/* Currently Watching */}
          <div className="w-full h-full">
            <h1 className="text-3xl">Currently Watching</h1>
            <div className="grid items-center justify-center max-w-2xl gap-6 pt-6 md:grid-flow-col-dense">
              {watchingVideos.map((video, index) => (
                <div
                  key={index}
                  className="flex flex-col p-4 space-y-4 rounded-lg shadow-lg text-light-default"
                >
                  <div className="relative">
                    <img
                      src={video.imgSrc}
                      alt="Video thumbnail"
                      className="object-cover w-full h-48 rounded-lg"
                    />
                    <button className="absolute top-0 right-0 flex items-center px-2 py-1 text-sm bg-black gap-x-1 rounded-bl-md text-light-default ">
                      <FaRegEdit className="text-light-default" /> Edit
                    </button>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold leading-tight">
                      {truncateText(video.title, 6)}{" "}
                    </h1>
                    <p className="text-sm text-light-secondary">
                      {video.courseName} <br />
                      {video.duration}{" "}
                      <span className="float-right">{video.date}</span>
                    </p>
                  </div>
                  <p className="text-sm text-light-secondary">
                    {truncateText(description, 22)}{" "}
                  </p>
                  <div className="flex items-center justify-between text-xs text-light-secondary">
                    <div className="flex items-center gap-2">
                      <FaEye className="text-light-secondary" />
                      <span>{video.views} Views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineChartBar className="text-light-secondary" />
                      <span>{video.active} Active Viewers</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Finished Videos */}
          <div className="w-full h-full pt-16">
            <h1 className="text-3xl">Finished Videos</h1>
            <div className="grid items-center justify-center grid-cols-1 gap-6 pt-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {finishedVideos.map((video, index) => (
                <div
                  key={index}
                  className="flex flex-col p-4 space-y-4 rounded-lg shadow-lg text-light-default"
                >
                  <div className="relative">
                    <img
                      src={video.imgSrc}
                      alt="Video thumbnail"
                      className="object-cover w-full h-48 rounded-lg"
                    />
                    <button className="absolute top-0 right-0 flex items-center px-2 py-1 text-sm bg-black gap-x-1 rounded-bl-md text-light-default ">
                      <FaRegEdit className="text-light-default" /> Edit
                    </button>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold leading-tight">
                      {truncateText(video.title, 6)}{" "}
                    </h1>
                    <p className="text-sm text-light-secondary">
                      {video.courseName} <br />
                      {video.duration}{" "}
                      <span className="float-right">{video.date}</span>
                    </p>
                  </div>
                  <p className="text-sm text-light-secondary">
                    {truncateText(description, 22)}{" "}
                  </p>
                  <div className="flex items-center justify-between text-xs text-light-secondary">
                    <div className="flex items-center gap-2">
                      <FaEye className="text-light-secondary" />
                      <span>{video.views} Views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineChartBar className="text-light-secondary" />
                      <span>{video.active} Active Viewers</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div>
            <div className="flex items-center justify-between pt-12 md:gap-x-0 gap-x-2">
              <div className="flex gap-x-6">
                <div>
                  <h1 className="pb-1 md:text-3xl">History</h1>
                  <p className="text-xs md:text-sm text-light-secondary">
                    Number of users who are currently on active on the platform
                  </p>
                </div>
              </div>
              <div>
                <button className="px-4 py-1 text-sm border rounded-full md:text-base md:px-8">
                  Export CSV
                </button>
              </div>
            </div>
            <DataTable columns={columns} data={data} />
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
