import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(
    location.state?.activeSection || "Active Users",
  );
  const [activeTab, setActiveTab] = useState("Analytics");
  const [tableData, setTableData] = useState([]);

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

  const activeUsersData = new Array(40).fill().map(() => ({
    _id: generateObjectId(),
    "First Name": "Juan",
    "Last Name": "Dela Cruz",
    Age: 20,
    Gender: "Male",
    "Last Active": "Aug 10, 2024",
    "Date Registered": "June 10, 2024",
    "Last Video": "Things to master if you...",
  }));

  const inactiveUsersData = new Array(109).fill().map(() => ({
    _id: generateObjectId(),
    "First Name": "Maria",
    "Last Name": "Santos",
    Age: 21,
    Gender: "Female",
    "Last Active": "July 12, 2024",
    "Date Registered": "May 5, 2024",
    "Last Video": "How to start programming...",
  }));

  const completedStudentsData = new Array(40).fill().map(() => ({
    _id: generateObjectId(),
    "First Name": "Carlos",
    "Last Name": "Reyes",
    Age: 22,
    Gender: "Male",
    "Last Active": "July 5, 2024",
    "Date Registered": "March 10, 2024",
    "Last Video": "Top Skills for Web Dev",
  }));

  const bookDownloadsData = new Array(34).fill().map(() => ({
    _id: generateObjectId(),
    "First Name": "Anna",
    "Last Name": "Luna",
    Age: 19,
    Gender: "Female",
    "Last Active": "Aug 15, 2024",
    "Date Registered": "April 18, 2024",
    "Last Video": "Mastering Python",
  }));

  const totalStudentsData = new Array(213).fill().map(() => ({
    _id: generateObjectId(),
    "First Name": "Lucas",
    "Last Name": "Fernandez",
    Age: 23,
    Gender: "Male",
    "Last Active": "Aug 20, 2024",
    "Date Registered": "Feb 10, 2024",
    "Last Video": "Advanced JavaScript",
  }));

  const getDataBySection = () => {
    switch (activeSection) {
      case "Active Users":
        return activeUsersData;
      case "Inactive Users":
        return inactiveUsersData;
      case "Completed Students":
        return completedStudentsData;
      case "Book Downloads":
        return bookDownloadsData;
      case "Total Students":
        return totalStudentsData;
      default:
        return activeUsersData;
    }
  };

  useEffect(() => {
    setTableData(getDataBySection());
  }, [activeSection]);

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

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2 xl:grid-cols-3">
          {/* Active Users Section */}
          <div
            className={`${
              activeSection === "Active Users"
                ? "bg-center bg-no-repeat bg-cover"
                : "bg-dark-default"
            } rounded-lg`}
            style={{
              backgroundImage:
                activeSection === "Active Users"
                  ? `url(${GradientVideoImg})`
                  : "none",
            }}
          >
            <div
              className={`flex flex-col justify-between w-full h-full px-6 py-3 border-2 rounded-lg shadow-lg ${
                activeSection === "Active Users"
                  ? "border-transparent"
                  : "border-light-secondary"
              }`}
            >
              <div className="overflow-hidden">
                <h1 className="text-3xl font-normal truncate text-light-default">
                  Active Users
                </h1>
                <p className="mt-1 text-sm truncate text-light-secondary">
                  Number of users who are currently <br /> active on the
                  platform
                </p>
              </div>
              <div className="flex items-end justify-between mt-4">
                <h1 className="text-5xl font-bold text-light-default">40</h1>
                {activeSection !== "Active Users" && (
                  <button
                    onClick={() => setActiveSection("Active Users")}
                    className="flex items-center text-lg text-light-default"
                  >
                    See All <span className="mb-1 ml-3 text-2xl">&#8250;</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Total Completed Students Section */}
          <div
            className={`${
              activeSection === "Completed Students"
                ? "bg-center bg-no-repeat bg-cover"
                : "bg-dark-default"
            } rounded-lg`}
            style={{
              backgroundImage:
                activeSection === "Completed Students"
                  ? `url(${GradientVideoImg})`
                  : "none",
            }}
          >
            <div
              className={`flex flex-col justify-between w-full h-full px-6 py-3 border-2 rounded-lg shadow-lg ${
                activeSection === "Completed Students"
                  ? "border-transparent"
                  : "border-light-secondary"
              }`}
            >
              <div className="overflow-hidden">
                <h1 className="text-3xl font-normal truncate text-light-default">
                  Total Completed Students
                </h1>
                <p className="mt-1 text-sm truncate text-light-secondary">
                  Total number of students who have completed <br /> their
                  courses
                </p>
              </div>
              <div className="flex items-end justify-between mt-4">
                <h1 className="text-5xl font-bold text-light-default">40</h1>
                {activeSection !== "Completed Students" && (
                  <button
                    onClick={() => setActiveSection("Completed Students")}
                    className="flex items-center text-lg text-light-default"
                  >
                    See All <span className="mb-1 ml-3 text-2xl">&#8250;</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Total Book Downloads Section */}
          <div
            className={`${
              activeSection === "Book Downloads"
                ? "bg-center bg-no-repeat bg-cover"
                : "bg-dark-default"
            } rounded-lg`}
            style={{
              backgroundImage:
                activeSection === "Book Downloads"
                  ? `url(${GradientVideoImg})`
                  : "none",
            }}
          >
            <div
              className={`flex flex-col justify-between w-full h-full px-6 py-3 border-2 rounded-lg shadow-lg ${
                activeSection === "Book Downloads"
                  ? "border-transparent"
                  : "border-light-secondary"
              }`}
            >
              <div className="overflow-hidden">
                <h1 className="text-3xl font-normal truncate text-light-default">
                  Total Book Downloads
                </h1>
                <p className="mt-1 text-sm truncate text-light-secondary">
                  Total number of books downloaded by students
                </p>
              </div>
              <div className="flex items-end justify-between mt-4">
                <h1 className="text-5xl font-bold text-light-default">34</h1>
                {activeSection !== "Book Downloads" && (
                  <button
                    onClick={() => setActiveSection("Book Downloads")}
                    className="flex items-center text-lg text-light-default"
                  >
                    See All <span className="mb-1 ml-3 text-2xl">&#8250;</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Inactive Users Section */}
          <div
            className={`${
              activeSection === "Inactive Users"
                ? "bg-center bg-no-repeat bg-cover"
                : "bg-dark-default"
            } rounded-lg`}
            style={{
              backgroundImage:
                activeSection === "Inactive Users"
                  ? `url(${GradientVideoImg})`
                  : "none",
            }}
          >
            <div
              className={`flex flex-col justify-between w-full h-full px-6 py-3 border-2 rounded-lg shadow-lg ${
                activeSection === "Inactive Users"
                  ? "border-transparent"
                  : "border-light-secondary"
              }`}
            >
              <div className="overflow-hidden">
                <h1 className="text-3xl font-normal truncate text-light-default">
                  Inactive Users
                </h1>
                <p className="mt-1 text-sm truncate text-light-secondary">
                  Number of users who are currently inactive <br /> on the
                  platform
                </p>
              </div>
              <div className="flex items-end justify-between mt-4">
                <h1 className="text-5xl font-bold text-light-default">109</h1>
                {activeSection !== "Inactive Users" && (
                  <button
                    onClick={() => setActiveSection("Inactive Users")}
                    className="flex items-center text-lg text-light-default"
                  >
                    See All <span className="mb-1 ml-3 text-2xl">&#8250;</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Total Students Section */}
          <div
            className={`${
              activeSection === "Total Students"
                ? "bg-center bg-no-repeat bg-cover"
                : "bg-dark-default"
            } rounded-lg`}
            style={{
              backgroundImage:
                activeSection === "Total Students"
                  ? `url(${GradientVideoImg})`
                  : "none",
            }}
          >
            <div
              className={`flex flex-col justify-between w-full h-full px-6 py-3 border-2 rounded-lg shadow-lg ${
                activeSection === "Total Students"
                  ? "border-transparent"
                  : "border-light-secondary"
              }`}
            >
              <div className="overflow-hidden">
                <h1 className="text-3xl font-normal truncate text-light-default">
                  Total Students
                </h1>
                <p className="mt-1 text-sm truncate text-light-secondary">
                  Total number of students currently registered on the platform
                </p>
              </div>
              <div className="flex items-end justify-between mt-4">
                <h1 className="text-5xl font-bold text-light-default">213</h1>
                {activeSection !== "Total Students" && (
                  <button
                    onClick={() => setActiveSection("Total Students")}
                    className="flex items-center text-lg text-light-default"
                  >
                    See All <span className="mb-1 ml-3 text-2xl">&#8250;</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div>
          <div className="flex items-center justify-between pt-12 md:gap-x-0 gap-x-2">
            <div className="flex gap-x-6">
              <div>
                <h1 className="pb-1 md:text-3xl">{activeSection}</h1>
                <p className="text-xs md:text-sm text-light-secondary">
                  Number of users who are currently shown in {activeSection}
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
            data={tableData}
            handleRowClick={handleRowClick}
            totalRows={tableData.length}
          />
          ;
        </div>

        <Footer />
      </section>
    </>
  );
}
