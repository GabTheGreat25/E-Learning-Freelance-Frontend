import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { HiOutlineChartBar } from "react-icons/hi";
import { Navbar, Footer, TabNavigation, DataTable } from "@components";
import { homeTabs } from "@utils";
import { VideoImg } from "@assets";

const currentVideos = [
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
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
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    imgSrc: VideoImg,
  },
  {
    title: "Things to master if you want to learn",
    videoName: "Course Name",
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
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Analytics");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = [
    { name: "ID" },
    { name: "Lesson" },
    { name: "Progress" },
    { name: "Started" },
    { name: "Finished" },
    { name: "Date" },
  ];

  const data = new Array(200).fill().map(() => ({
    _id: generateObjectId(),
    Lesson: "How to be successful",
    Progress: "50%",
    Started: "Aug 5, 2024",
    Finished: "N/A",
    Date: "Aug 10 , 2024",
  }));

  const description =
    "Learn why people think, feel, and behave the way they do; how to utilize advanced communication styles; and the fundamentals of leadership and management.";

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(" ")} ...`;
    }
    return text;
  };

  const calculateMarginLeft = (index) => {
    if (screenWidth >= 1536) {
      return `${index * 19.5}rem`;
    } else if (screenWidth >= 1280) {
      return `${index * 17.5}rem`;
    } else if (screenWidth >= 1024) {
      return `${index * 16.5}rem`;
    } else if (screenWidth >= 768) {
      return `${index * 16}rem`;
    } else return `${index * 15.5}rem`;
  };

  return (
    <>
      <Navbar title="Analytics" />
      <section className="h-screen px-16 pt-12 pb-32 overflow-y-auto bg-black scrollbar-thin text-light-default">
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

          {/* Currently Watching */}
          <div className="w-full h-full">
            <h1 className="text-3xl">Currently Watching</h1>
            <div className="relative flex flex-row h-[29rem] pt-6 pb-2 overflow-x-auto overflow-y-hidden scrollbar-thin">
              {currentVideos.map((video, index) => (
                <div
                  key={index}
                  className="absolute p-6 left-0 rounded-lg shadow-lg 2xl:max-w-xs xl:max-w-[17.5rem] max-w-[16.5rem] text-light-default h-full w-full overflow-hidden"
                  style={{
                    marginLeft: calculateMarginLeft(index),
                  }}
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
                    <h1 className="pt-2 text-lg font-semibold leading-tight">
                      {truncateText(video.title, 6)}
                    </h1>
                    <p className="text-sm text-light-secondary">
                      {video.videoName} <br />
                      {video.duration}
                      <span className="float-right">{video.date}</span>
                    </p>
                  </div>
                  <p className="py-4 text-sm text-light-secondary">
                    {truncateText(description, 22)}
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
            <div className="relative flex flex-row h-[29rem] pt-6 pb-2 overflow-x-auto overflow-y-hidden scrollbar-thin">
              {doneVideos.map((video, index) => (
                <div
                  key={index}
                  className="absolute p-6 left-0 rounded-lg shadow-lg 2xl:max-w-xs xl:max-w-[17.5rem] max-w-[16.5rem] text-light-default h-full w-full overflow-hidden"
                  style={{
                    marginLeft: calculateMarginLeft(index),
                  }}
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
                    <h1 className="pt-2 text-lg font-semibold leading-tight">
                      {truncateText(video.title, 6)}
                    </h1>
                    <p className="text-sm text-light-secondary">
                      {video.videoName} <br />
                      {video.duration}
                      <span className="float-right">{video.date}</span>
                    </p>
                  </div>
                  <p className="py-4 text-sm text-light-secondary">
                    {truncateText(description, 22)}
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
