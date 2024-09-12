import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Footer, TabNavigation, DataTable } from "@components";
import { homeTabs } from "@utils";
import { GradientVideoImg } from "@assets";

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

export function Analytics() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Analytics");

  const columns = [
    { name: "ID" },
    { name: "First Name" },
    { name: "Last Name" },
    { name: "Age" },
    { name: "Gender" },
    { name: "Last Active" },
    { name: "Date Registered" },
    { name: "Last Video" },
  ];

  const data = new Array(200).fill().map(() => ({
    _id: generateObjectId(),
    "First Name": "Juan",
    "Last Name": "Dela Cruz",
    Age: 20,
    Gender: "Male",
    "Last Active": "Aug 10, 2024",
    "Date Registered": "June 10, 2024",
    "Last Video": "Things to master if you...",
  }));

  const handleRowClick = (id) => {
    navigate(`/dashboard/analytics/${id}`);
  };

  return (
    <>
      <Navbar title="Home" />
      <section className="h-screen px-16 pt-12 pb-32 overflow-y-auto bg-black scrollbar-thin text-light-default">
        {/* Analytics */}
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
                  Active Users
                </h1>
                <p className="mt-1 text-sm truncate text-light-secondary">
                  Number of users who are currently <br /> active on the
                  platform
                </p>
              </div>
              <h1 className="text-5xl font-bold text-light-default">40</h1>
            </div>
          </div>

          <div className="justify-between w-full h-full px-6 py-3 border-2 rounded-lg border-light-secondary bg-dark-default">
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
              <h1 className="text-5xl font-bold text-light-default">40</h1>
              <button className="flex items-center text-lg text-light-default">
                See All <span className="mb-1 ml-3 text-2xl">&#8250;</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-between w-full h-full px-6 py-3 border-2 rounded-lg border-light-secondary bg-dark-default md:col-span-2 xl:col-span-1">
            <div className="overflow-hidden">
              <h1 className="text-3xl font-normal truncate text-light-default">
                Total Book Downloads
              </h1>
              <p className="mt-1 text-sm truncate text-light-secondary">
                Total number of students currently <br /> registered on the
                platform
              </p>
            </div>
            <div className="flex items-end justify-between mt-4">
              <h1 className="text-5xl font-bold text-light-default">34</h1>
              <button className="flex items-center text-lg text-light-default">
                See All <span className="mb-1 ml-3 text-2xl">&#8250;</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:col-span-2 xl:col-span-3">
            <div className="justify-between w-full h-full px-6 py-3 border-2 rounded-lg border-light-secondary bg-dark-default">
              <div className="overflow-hidden">
                <h1 className="text-3xl font-normal truncate text-light-default">
                  Inactive Users
                </h1>
                <p className="mt-1 text-sm truncate text-light-secondary">
                  Total number of students currently <br /> registered on the
                  platform
                </p>
              </div>
              <div className="flex items-end justify-between mt-4">
                <h1 className="text-5xl font-bold text-light-default">109</h1>
                <button className="flex items-center text-lg text-light-default">
                  See All <span className="mb-1 ml-3 text-2xl">&#8250;</span>
                </button>
              </div>
            </div>

            <div className="justify-between w-full h-full px-6 py-3 border-2 rounded-lg border-light-secondary bg-dark-default">
              <div className="overflow-hidden">
                <h1 className="text-3xl font-normal truncate text-light-default">
                  Total Students
                </h1>
                <p className="mt-1 text-sm truncate text-light-secondary">
                  Total number of students currently <br /> registered on the
                  platform
                </p>
              </div>
              <div className="flex items-end justify-between mt-4">
                <h1 className="text-5xl font-bold text-light-default">213</h1>
                <button className="flex items-center text-lg text-light-default">
                  See All <span className="mb-1 ml-3 text-2xl">&#8250;</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between pt-12 md:gap-x-0 gap-x-2">
            <div className="flex gap-x-6">
              <div>
                <h1 className="pb-1 md:text-3xl">Active Users</h1>
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
          <DataTable
            columns={columns}
            data={data}
            handleRowClick={handleRowClick}
          />
        </div>

        <Footer />
      </section>
    </>
  );
}
