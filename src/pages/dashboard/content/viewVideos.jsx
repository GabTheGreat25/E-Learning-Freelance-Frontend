import React, { useState, useEffect } from "react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { HiOutlineChartBar } from "react-icons/hi";
import { Navbar, Footer, TabNavigation, DataTable } from "@components";
import { contentTabs } from "@utils";
import { useNavigate } from "react-router-dom";
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

export const ViewVideos = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Videos");
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
    { name: "Preview", isImage: true },
    { name: "Title" },
    { name: "Course" },
    { name: "Views" },
    { name: "Active Views" },
    { name: "Upload Date" },
    { name: "Duration" },
    { name: "Visibility" },
    { name: "Transcriptions" },
  ];

  const data = new Array(200).fill().map(() => ({
    _id: generateObjectId(),
    Preview: VideoImg,
    Title: "Title",
    Course: "Course",
    Views: "Views",
    "Active Views": "Active Views",
    "Upload Date": "Aug 10, 2024",
    Duration: "2 hr 1 min",
    Visibility: "Visibility",
    Transcriptions: "Transcriptions",
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
      return `${index * 21.5}rem`;
    } else if (screenWidth >= 1280) {
      return `${index * 19.5}rem`;
    } else if (screenWidth >= 1024) {
      return `${index * 19}rem`;
    } else if (screenWidth >= 768) {
      return `${index * 18.75}rem`;
    } else return `${index * 18}rem`;
  };

  const handleButtonClick = () => {
    navigate("/dashboard/videos/create");
  };

  return (
    <div>
      <Navbar title="Content" />
      <section className="h-screen px-16 pt-12 pb-32 overflow-y-auto scrollbar-thin text-light-default">
        {/* Content */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={contentTabs}
        />

        {/* Top Video Title */}
        <div className="pt-8">
          <h1 className="text-3xl">New Video</h1>
          <p className="text-light-secondary">
            See all your active videos here
          </p>
        </div>

        {/* Currently Watching */}
        <div className="w-full">
          <div className="relative flex flex-row h-[29rem] pb-2 overflow-x-auto overflow-y-hidden scrollbar-thin">
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

        {/* All Video Title */}
        <div className="pt-6">
          <h1 className="text-3xl">All Videos</h1>
        </div>

        <DataTable columns={columns} data={data} maxHeight={1000} />

        <Footer
          showButton={true}
          onButtonClick={handleButtonClick}
          buttonTitle={"Add Video"}
        />
      </section>
    </div>
  );
};
