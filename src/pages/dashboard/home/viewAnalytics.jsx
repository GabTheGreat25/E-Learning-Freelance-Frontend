import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaArrowLeft, FaArrowRight, FaRegEdit } from "react-icons/fa";
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
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [visibleCurrentVideos, setVisibleCurrentVideos] = useState([]);
  const [currentVideosPerPage, setcurrentVideosPerPage] = useState(1);

  const [doneVideoIndex, setDoneVideoIndex] = useState(0);
  const [visibleDoneVideos, setVisibleDoneVideos] = useState([]);
  const [doneVideosPerPage, setdoneVideosPerPage] = useState(1);

  const containerRef = useRef(null);

  const columns = ["ID", "Lesson", "Progress", "Started", "Finished", "Date"];

  const data = new Array(200).fill().map(() => ({
    _id: generateObjectId(),
    Lesson: "How to be successfull",
    Progress: "50%",
    Started: "Aug 5, 2024",
    Finished: "N/A",
    Date: "Aug 10 , 2024",
  }));

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

  useEffect(() => {
    const updateVideosVisibility = () => {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const isSmallScreen = window.matchMedia("(max-width: 600px)").matches;
      const itemWidth = isSmallScreen ? 250 : 300;

      const newcurrentVideosPerPage = Math.floor(containerWidth / itemWidth);
      setcurrentVideosPerPage(newcurrentVideosPerPage);
      setVisibleCurrentVideos(
        currentVideos.slice(
          currentVideoIndex,
          currentVideoIndex + newcurrentVideosPerPage,
        ),
      );
    };

    updateVideosVisibility();

    window.addEventListener("resize", updateVideosVisibility);

    return () => window.removeEventListener("resize", updateVideosVisibility);
  }, [currentVideoIndex]);

  const handleCurrentNext = () => {
    if (currentVideoIndex + currentVideosPerPage < currentVideos.length) {
      setCurrentVideoIndex(currentVideoIndex + currentVideosPerPage);
    }
  };

  const handleCurrentBack = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - currentVideosPerPage);
    }
  };

  useEffect(() => {
    const updateVideosVisibility = () => {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const isSmallScreen = window.matchMedia("(max-width: 600px)").matches;
      const itemWidth = isSmallScreen ? 250 : 300;

      const newdoneVideosPerPage = Math.floor(containerWidth / itemWidth);
      setdoneVideosPerPage(newdoneVideosPerPage);
      setVisibleDoneVideos(
        doneVideos.slice(doneVideoIndex, doneVideoIndex + newdoneVideosPerPage),
      );
    };

    updateVideosVisibility();

    window.addEventListener("resize", updateVideosVisibility);

    return () => window.removeEventListener("resize", updateVideosVisibility);
  }, [doneVideoIndex]);

  const handleDoneNext = () => {
    if (doneVideoIndex + doneVideosPerPage < doneVideos.length) {
      setDoneVideoIndex(doneVideoIndex + doneVideosPerPage);
    }
  };

  const handleDoneBack = () => {
    if (doneVideoIndex > 0) {
      setDoneVideoIndex(doneVideoIndex - doneVideosPerPage);
    }
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

          {/* Currently Watching */}
          <div className="w-full h-full">
            <h1 className="text-3xl">Currently Watching</h1>
            <div
              ref={containerRef}
              className={`relative flex flex-col ${
                visibleCurrentVideos.length <= 3
                  ? "md:items-start items-center"
                  : "items-center"
              } justify-center xl:px-0 lg:px-6 px-2 md:px-12`}
            >
              <div className="flex gap-4 pt-6 pb-2">
                {visibleCurrentVideos.map((video, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-4 2xl:max-w-xs xl:max-w-[18.5rem] max-w-[17.5rem] rounded-lg shadow-lg text-light-default"
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
                        {video.videoName} <br />
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
            <div className="flex items-end justify-end px-2 mt-4 gap-x-4">
              <button
                className={`bg-dark-secondary p-2 rounded-full`}
                onClick={handleCurrentBack}
              >
                <FaArrowLeft className="text-xl text-light-default" />
              </button>
              <button
                className={`bg-dark-secondary p-2 rounded-full`}
                onClick={handleCurrentNext}
              >
                <FaArrowRight className="text-xl text-light-default" />
              </button>
            </div>
          </div>

          {/* Finished Videos */}
          <div className="w-full h-full pt-16">
            <h1 className="text-3xl">Finished Videos</h1>
            <div
              ref={containerRef}
              className={`relative flex flex-col ${
                visibleDoneVideos.length <= 3
                  ? "md:items-start items-center"
                  : "items-center"
              } justify-center xl:px-0 lg:px-6 px-2 md:px-12`}
            >
              <div className="flex gap-4 pt-6 pb-2">
                {visibleDoneVideos.map((video, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-4 2xl:max-w-xs xl:max-w-[18.5rem] max-w-[17.5rem] rounded-lg shadow-lg text-light-default"
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
                        {video.videoName} <br />
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
            <div className="flex items-end justify-end px-2 mt-4 gap-x-4">
              <button
                className={`bg-dark-secondary p-2 rounded-full`}
                onClick={handleDoneBack}
              >
                <FaArrowLeft className="text-xl text-light-default" />
              </button>
              <button
                className={`bg-dark-secondary p-2 rounded-full`}
                onClick={handleDoneNext}
              >
                <FaArrowRight className="text-xl text-light-default" />
              </button>
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
