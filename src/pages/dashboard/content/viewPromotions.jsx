import React, { useState, useEffect } from "react";
import { Navbar, Footer, TabNavigation, DataTable } from "@components";
import { contentTabs } from "@utils";
import { useNavigate } from "react-router-dom";
import { VideoImg } from "@assets";

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

export const ViewPromotions = () => {
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
    navigate("/dashboard/promotions/create");
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

        {/* All Video Title */}
        <div className="pt-6">
          <h1 className="text-3xl">All Promotions</h1>
        </div>

        <DataTable columns={columns} data={data} maxHeight={1000} />

        <Footer
          showButton={true}
          onButtonClick={handleButtonClick}
          buttonTitle={"Add Promotions"}
        />
      </section>
    </div>
  );
};
