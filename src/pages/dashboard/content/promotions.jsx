import React, { useState } from "react";
import { contentTabs } from "@utils";
import { Navbar, Footer, TabNavigation } from "@components";
import { PromotionUploadImg, DocumentFilterImg } from "@assets";

export function Promotions() {
  const [activeTab, setActiveTab] = useState("Promotions");

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
        <h1 className="py-10 text-3xl">All Videos</h1>
        <div className="grid items-center justify-center pb-24 text-center">
          <img
            src={PromotionUploadImg}
            alt="PromotionUploadImg"
            className="object-cover"
          />
          <h1 className="pb-2 text-4xl pt-9">Create a Promotion</h1>
          <p className="pb-6 text-light-secondary">
            Click on “Add Promotion” to begin
          </p>
          <div className="grid items-center justify-center">
            <button className="bg-gradient-to-r from-[#c1905f] to-[#9c6d3b] p-2 rounded-full px-12 py-4 border border-light-default">
              <div className="flex items-center justify-center gap-x-3">
                <img
                  src={DocumentFilterImg}
                  alt="DocumentFilterImg"
                  className="object-cover"
                />
                <span className="text-2xl">Add Promotion</span>
              </div>
            </button>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
