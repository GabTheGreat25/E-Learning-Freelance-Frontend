import React, { useState } from "react";
import { contentTabs } from "@utils";
import { Navbar, Footer, TabNavigation } from "@components";
import { VideoUploadImg, AddVideoImg } from "@assets";
import { useNavigate } from "react-router-dom";

export function Videos() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Videos");

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
        <h1 className="py-10 text-3xl">All Videos</h1>
        <div className="grid items-center justify-center text-center">
          <img
            src={VideoUploadImg}
            alt="VideoUploadImg"
            className="object-cover"
          />
          <h1 className="pb-2 text-4xl">Upload a Video</h1>
          <p className="pb-6 text-light-secondary">
            Click on “Add Video” to begin
          </p>
          <div className="grid items-center justify-center pb-24">
            <button
              onClick={() => navigate("/dashboard/videos/create")}
              className="bg-gradient-to-r from-[#c1905f] to-[#9c6d3b] p-2 rounded-full px-12 py-4 border border-light-default"
            >
              <div className="flex items-center justify-center gap-x-3">
                <img
                  src={AddVideoImg}
                  alt="AddVideoImg"
                  className="object-cover"
                />
                <span className="text-2xl">Add Video</span>
              </div>
            </button>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
