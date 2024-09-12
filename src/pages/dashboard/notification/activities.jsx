import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer, TabNavigation, DataTable } from "@components";
import { notificationTabs } from "@utils";

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

export function Activities() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Activities");

  const columns = [
    { name: "ID" },
    { name: "Preview" },
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
    Preview: "Preview",
    Title: "Title",
    Course: "Course",
    Views: "Views",
    "Active Views": "Active Views",
    "Upload Date": "June 10, 2024",
    Duration: "Duration",
    Visibility: "Visibility",
    Transcriptions: "Transcriptions",
  }));

  return (
    <>
      <Navbar title="Notifications" />
      <section className="h-screen px-10 pt-12 pb-32 overflow-y-auto bg-black scrollbar-thin text-light-default">
        {/* Analytics */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={notificationTabs}
        />

        <div>
          <div className="flex items-center justify-end pt-12 pb-6 md:gap-x-0 gap-x-2">
            <button className="px-4 py-1 text-sm border rounded-full md:text-base md:px-8">
              Export CSV
            </button>
          </div>
          <DataTable columns={columns} data={data} />
        </div>

        <Footer />
      </section>
    </>
  );
}
