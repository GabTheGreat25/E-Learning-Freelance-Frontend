import React, { useState, useEffect, useRef } from "react";
import { FaEye, FaArrowLeft, FaArrowRight, FaRegEdit } from "react-icons/fa";
import { HiOutlineChartBar } from "react-icons/hi";
import { Navbar, Footer, TabNavigation } from "@components";
import { homeTabs } from "@utils";
import {
  VideoImg,
  GradientVideoImg,
  GradientHomeImg,
  GradientNotificationImg,
  GradientTransactionImg,
} from "@assets";

const courses = [
  {
    title: "Success Course 1",
    videos: 10,
    views: 100,
    active: 10,
    imgSrc: VideoImg,
  },
  {
    title: "Success Course 2",
    videos: 10,
    views: 100,
    active: 10,
    imgSrc: VideoImg,
  },
  {
    title: "Success Course 3",
    videos: 10,
    views: 100,
    active: 10,
    imgSrc: VideoImg,
  },
  {
    title: "Success Course 4",
    videos: 10,
    views: 100,
    active: 10,
    imgSrc: VideoImg,
  },
  {
    title: "Success Course 5",
    videos: 10,
    views: 100,
    active: 10,
    imgSrc: VideoImg,
  },
  {
    title: "Success Course 6",
    videos: 10,
    views: 100,
    active: 10,
    imgSrc: VideoImg,
  },
  {
    title: "Success Course 7",
    videos: 10,
    views: 100,
    active: 10,
    imgSrc: VideoImg,
  },
  {
    title: "Success Course 8",
    videos: 10,
    views: 100,
    active: 10,
    imgSrc: VideoImg,
  },
  {
    title: "Success Course 9",
    videos: 10,
    views: 100,
    active: 10,
    imgSrc: VideoImg,
  },
  {
    title: "Success Course 10",
    videos: 10,
    views: 100,
    active: 10,
    imgSrc: VideoImg,
  },
];

const videos = [
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

export function Home() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCourses, setVisibleCourses] = useState([]);
  const [coursesPerPage, setCoursesPerPage] = useState(1);
  const limitedVideos = videos.slice(0, 8);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isBackDisabled, setIsBackDisabled] = useState(true);
  const [animationDirection, setAnimationDirection] = useState("");
  const [mouseTimeout, setMouseTimeout] = useState(null);

  const containerRef = useRef(null);

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
    const updateCoursesVisibility = () => {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const isSmallScreen = window.matchMedia("(max-width: 600px)").matches;
      const itemWidth = isSmallScreen ? 250 : 300;

      const newCoursesPerPage = Math.floor(containerWidth / itemWidth);
      setCoursesPerPage(newCoursesPerPage);
      setVisibleCourses(
        courses.slice(currentIndex, currentIndex + newCoursesPerPage),
      );

      setIsNextDisabled(currentIndex + newCoursesPerPage >= courses.length);
      setIsBackDisabled(currentIndex === 0);
    };

    updateCoursesVisibility();
    window.addEventListener("resize", updateCoursesVisibility);

    return () => window.removeEventListener("resize", updateCoursesVisibility);
  }, [currentIndex, coursesPerPage]);

  const handleNext = () => {
    if (currentIndex + coursesPerPage < courses.length) {
      setAnimationDirection("next");
      setTimeout(() => {
        setCurrentIndex(currentIndex + coursesPerPage);
        setAnimationDirection("");
      }, 500);
    }
  };

  const handleBack = () => {
    if (currentIndex >= coursesPerPage) {
      setAnimationDirection("back");
      setTimeout(() => {
        setCurrentIndex(currentIndex - coursesPerPage);
        setAnimationDirection("");
      }, 500);
    }
  };

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, right, width } = container.getBoundingClientRect();
    const mouseX = e.clientX;
    const threshold = width * 0.1;

    if (mouseX < left + threshold) {
      if (!isBackDisabled) {
        clearTimeout(mouseTimeout);
        setMouseTimeout(
          setTimeout(() => {
            handleBack();
          }, 300),
        );
      }
    } else if (mouseX > right - threshold) {
      if (!isNextDisabled) {
        clearTimeout(mouseTimeout);
        setMouseTimeout(
          setTimeout(() => {
            handleNext();
          }, 300),
        );
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isNextDisabled, isBackDisabled, mouseTimeout]);

  return (
    <>
      <Navbar title="Home" />
      <section className="h-screen px-4 pt-12 pb-32 overflow-y-auto scrollbar-thin sm:px-10 2xl:px-28 xl:px-24 lg:px-12 text-light-default">
        {/* Overview */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={homeTabs}
        />

        {/* First Button */}
        <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2 xl:grid-cols-3">
          <div
            className="bg-center bg-no-repeat bg-cover rounded-lg"
            style={{ backgroundImage: `url(${GradientVideoImg})` }}
          >
            <div className="flex flex-col justify-between w-full h-full px-6 py-3 border-2 border-transparent rounded-lg shadow-lg">
              <div className="overflow-hidden">
                <h1 className="text-3xl font-normal truncate text-light-default">
                  Upload Video
                </h1>
              </div>
              <div className="flex items-end justify-end mt-4">
                <button className="flex items-center text-lg text-light-default">
                  Go to Content
                  <span className="mb-1 ml-3 text-2xl">&#8250;</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between w-full h-full px-6 py-3 border-2 rounded-lg border-light-secondary bg-dark-default">
            <div className="overflow-hidden">
              <h1 className="text-3xl font-normal truncate text-light-default">
                Active Users
              </h1>
              <p className="mt-1 text-sm truncate text-light-secondary">
                Number of users who are currently <br /> active on the platform
              </p>
            </div>
            <div className="flex items-end justify-between mt-4">
              <h1 className="text-5xl font-bold text-light-default">40</h1>
              <button className="flex items-center text-lg text-light-default">
                See All <span className="mb-1 ml-3 text-2xl">&#8250;</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-between w-full h-full px-6 py-3 border-2 rounded-lg border-light-secondary bg-dark-default md:col-span-2 xl:col-span-1">
            <div className="overflow-hidden">
              <h1 className="text-3xl font-normal truncate text-light-default">
                Total Completed Students
              </h1>
              <p className="mt-1 text-sm truncate text-light-secondary">
                Total number of students currently <br /> registered on the
                platform
              </p>
            </div>
            <div className="flex items-end justify-between mt-4">
              <h1 className="text-5xl font-bold text-light-default">230</h1>
              <button className="flex items-center text-lg text-light-default">
                See All <span className="mb-1 ml-3 text-2xl">&#8250;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Courses */}
        <div className="pt-12">
          <div className="flex items-center justify-between md:gap-x-0 gap-x-2">
            <div className="flex gap-x-6">
              <div>
                <h1 className="pb-1 md:text-3xl">Active Courses</h1>
                <p className="text-xs md:text-sm text-light-secondary">
                  See all your active courses here
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center md:gap-x-10 gap-x-3">
              <div>
                <button className="px-4 py-1 text-sm border rounded-full md:text-base md:px-8">
                  Add Course
                </button>
              </div>
              <button className="flex items-center text-sm md:items-end md:text-xl text-light-default">
                See All <span className="ml-3 text-3xl">&#8250;</span>
              </button>
            </div>
          </div>

          <div
            ref={containerRef}
            className={`relative flex flex-col ${
              visibleCourses.length <= 3
                ? "md:items-start items-center"
                : "items-center"
            } justify-center  xl:px-0 lg:px-6 px-2 md:px-12`}
          >
            <div className="flex gap-4 pt-6 pb-2">
              {visibleCourses.map((course, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 p-6 rounded-lg shadow-lg 2xl:max-w-xs xl:max-w-[18.5rem] max-w-[17.5rem] bg-dark-secondary text-light-default transition-transform duration-500 ${
                    animationDirection === "next"
                      ? "transform translate-x-1/4"
                      : ""
                  } ${
                    animationDirection === "back"
                      ? "transform -translate-x-1/4"
                      : ""
                  }`}
                >
                  <h1 className="text-xl font-semibold">{course.title}</h1>
                  <p className="text-sm text-light-secondary">
                    {course.videos} Videos
                  </p>
                  <p className="mt-2 text-sm">
                    {truncateText(description, 22)}
                  </p>
                  <img
                    src={course.imgSrc}
                    alt="Video thumbnail"
                    className="w-full mt-4 rounded-lg"
                  />
                  <div className="flex items-center justify-between mt-4 text-sm text-light-secondary">
                    <div className="flex items-center gap-2">
                      <FaEye className="text-light-secondary" />
                      <span>{course.views} Views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineChartBar className="text-light-secondary" />
                      <span>{course.active} Active</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-end px-2 mt-4 gap-x-4">
            <button
              className={`bg-dark-secondary p-2 rounded-full ${
                isBackDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleBack}
              disabled={isBackDisabled}
            >
              <FaArrowLeft className="text-xl text-light-default" />
            </button>
            <button
              className={`bg-dark-secondary p-2 rounded-full ${
                isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleNext}
              disabled={isNextDisabled}
            >
              <FaArrowRight className="text-xl text-light-default" />
            </button>
          </div>
        </div>

        {/* Active Videos */}
        <div className="pt-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="pb-1 text-3xl">Active Videos</h1>
              <p className="text-sm text-light-secondary">
                See all your active videos here
              </p>
            </div>
            <button className="px-8 py-1 border rounded-full">Add Video</button>
          </div>

          <div className="grid items-center justify-center grid-cols-1 gap-6 pt-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {limitedVideos.map((video, index) => (
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

        {/* Second Button */}
        <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 xl:grid-cols-3">
          <div
            className="bg-center bg-no-repeat bg-cover rounded-lg"
            style={{ backgroundImage: `url(${GradientHomeImg})` }}
          >
            <div className="flex flex-col justify-between w-full h-full px-6 py-3 border-2 border-transparent rounded-lg shadow-lg">
              <div className="overflow-hidden">
                <h1 className="py-6 text-3xl font-normal truncate text-light-default">
                  Edit Home <br /> Page
                </h1>
              </div>
            </div>
          </div>

          <div
            className="bg-center bg-no-repeat bg-cover rounded-lg"
            style={{ backgroundImage: `url(${GradientNotificationImg})` }}
          >
            <div className="flex flex-col justify-between w-full h-full px-6 py-3 border-2 border-transparent rounded-lg shadow-lg">
              <div className="overflow-hidden">
                <h1 className="py-6 text-3xl font-normal truncate text-light-default">
                  View <br /> Notifications
                </h1>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col justify-between w-full h-full px-6 py-3 bg-center bg-no-repeat bg-cover border-2 border-transparent rounded-lg shadow-lg md:col-span-2 xl:col-span-1"
            style={{ backgroundImage: `url(${GradientTransactionImg})` }}
          >
            <div className="overflow-hidden">
              <h1 className="py-6 text-3xl font-normal truncate text-light-default">
                View <br /> Transactions
              </h1>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
