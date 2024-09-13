import React from "react";
import { IoChevronUpOutline, IoSearchOutline } from "react-icons/io5";
import { Navbar, Footer, LineChart, DataTable } from "@components";

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

export function Transactions() {
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
      <Navbar title="Transactions" />
      <section className="h-screen px-16 pt-6 pb-32 overflow-y-auto bg-black scrollbar-thin text-light-default">
        <div className="grid w-full gap-6 xl:grid-cols-3">
          <div className="flex items-start justify-between h-full p-4 border rounded-lg border-light-defautlt">
            <div>
              <h1 className="text-2xl font-semibold">+ Php 24,340</h1>
              <p className="text-lg">Total Profits</p>
            </div>
            <div className="flex items-center rounded-lg justify-center p-[.3rem] border gap-x-2 border-light-default bg-dark-secondary">
              <IoChevronUpOutline size={28} />
              <p className="text-lg">8%</p>
            </div>
          </div>
          <div className="flex items-start justify-between h-full p-4 border rounded-lg border-light-defautlt">
            <div>
              <h1 className="text-2xl font-semibold">+ Php 4,000</h1>
              <p className="text-lg">Last Transaction</p>
            </div>
            <div className="flex items-center rounded-lg justify-center p-[.3rem] border gap-x-2 border-light-default bg-dark-secondary">
              <IoChevronUpOutline size={28} />
              <p className="text-lg">8%</p>
            </div>
          </div>
          <div className="flex items-start justify-between h-full p-4 border rounded-lg border-light-defautlt">
            <div>
              <h1 className="text-2xl font-semibold">- Php 103.52</h1>
              <p className="text-lg">Increase from Last Month</p>
            </div>
            <div className="flex items-center rounded-lg justify-center p-[.3rem] border gap-x-2 border-light-default bg-dark-secondary">
              <IoChevronUpOutline size={28} />
              <p className="text-lg">8%</p>
            </div>
          </div>
        </div>
        <LineChart />

        <div className="flex items-center justify-end pt-12 pb-6">
          <div className="flex items-center bg-transparent border rounded-md cursor-pointer border-light-default">
            <input
              type="text"
              placeholder="Search User"
              className="px-4 py-2 bg-transparent outline-none text-light-default placeholder-light-default"
            />
            <IoSearchOutline className="mr-4 text-light-default" size={24} />
          </div>
        </div>

        <div className="pb-6">
          <DataTable columns={columns} data={data} />
        </div>

        <Footer />
      </section>
    </>
  );
}
