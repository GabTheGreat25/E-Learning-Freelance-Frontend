import React, { useState } from "react";
import { Navbar, Footer, TabNavigation } from "@components";
import { GradientVideoImg } from "@assets";

export function Analytics() {
  const [activeTab, setActiveTab] = useState("Overview");

  // State for managing column visibility and pagination
  const [columns, setColumns] = useState({
    id: true,
    firstName: true,
    lastName: true,
    age: true,
    gender: true,
    lastActive: true,
    dateRegistered: true,
    lastVideo: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // Generate data with incrementing IDs
  const data = Array.from({ length: 200 }, (_, i) => ({
    id: (i + 1).toString(),
    firstName: "Juan",
    lastName: "Dela Cruz",
    age: 20,
    gender: "Male",
    lastActive: "Aug 10, 2024",
    dateRegistered: "June 10, 2024",
    lastVideo: "Things to master if you want to learn...",
  }));

  const handleColumnChange = (column) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [column]: !prevColumns[column],
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(data.length / rowsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page on rows per page change
  };

  const visibleData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <>
      <Navbar title="Home" />
      <section className="h-screen px-4 pt-12 pb-32 overflow-y-auto scrollbar-thin sm:px-10 2xl:px-28 xl:px-24 lg:px-12 text-light-default">
        {/* Overview */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Existing components... */}
        <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2 xl:grid-cols-3">
          {/* Your cards go here */}
        </div>

        {/* Data Tables */}
        <div className="pt-20">
          <div className="flex items-center justify-between md:gap-x-0 gap-x-2">
            <div className="flex gap-x-6">
              <div>
                <h1 className="pb-1 md:text-3xl">Active Users</h1>
                <p className="text-xs md:text-sm text-light-secondary">
                  Number of users who are currently on active on the platform
                </p>
              </div>
            </div>
            <div>
              <button className="px-4 py-1 text-xs border rounded-full md:text-base md:px-8">
                Export CSV
              </button>
            </div>
          </div>

          {/* Column visibility controls */}
          <div className="flex items-center justify-start gap-4 my-4">
            <label>Columns:</label>
            {Object.keys(columns).map((column) => (
              <label key={column} className="flex items-center">
                <input
                  type="checkbox"
                  checked={columns[column]}
                  onChange={() => handleColumnChange(column)}
                />
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </label>
            ))}
          </div>

          {/* Data Table */}
          <div className="relative max-h-[500px] overflow-hidden border border-gray-700 rounded">
            <div className="overflow-x-auto scrollbar-thin">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="sticky top-0 bg-gray-700">
                  <tr>
                    {columns.id && <th className="px-4 py-2 text-left">ID</th>}
                    {columns.firstName && (
                      <th className="px-4 py-2 text-left">First Name</th>
                    )}
                    {columns.lastName && (
                      <th className="px-4 py-2 text-left">Last Name</th>
                    )}
                    {columns.age && (
                      <th className="px-4 py-2 text-left">Age</th>
                    )}
                    {columns.gender && (
                      <th className="px-4 py-2 text-left">Gender</th>
                    )}
                    {columns.lastActive && (
                      <th className="px-4 py-2 text-left">Last Active</th>
                    )}
                    {columns.dateRegistered && (
                      <th className="px-4 py-2 text-left">Date Registered</th>
                    )}
                    {columns.lastVideo && (
                      <th className="px-4 py-2 text-left">Last Video</th>
                    )}
                  </tr>
                </thead>
                <tbody className="block overflow-y-auto bg-gray-800 scrollbar-thin max-h-80">
                  {visibleData.map((row, index) => (
                    <tr key={index} className="flex w-full hover:bg-gray-700">
                      {columns.id && (
                        <td className="w-24 px-4 py-2">{row.id}</td>
                      )}
                      {columns.firstName && (
                        <td className="w-32 px-4 py-2">{row.firstName}</td>
                      )}
                      {columns.lastName && (
                        <td className="w-32 px-4 py-2">{row.lastName}</td>
                      )}
                      {columns.age && (
                        <td className="w-16 px-4 py-2">{row.age}</td>
                      )}
                      {columns.gender && (
                        <td className="w-24 px-4 py-2">{row.gender}</td>
                      )}
                      {columns.lastActive && (
                        <td className="px-4 py-2 w-36">{row.lastActive}</td>
                      )}
                      {columns.dateRegistered && (
                        <td className="px-4 py-2 w-36">{row.dateRegistered}</td>
                      )}
                      {columns.lastVideo && (
                        <td className="w-48 px-4 py-2">{row.lastVideo}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <label>Rows per page:</label>
              <select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="ml-2 border rounded"
              >
                {[5, 10, 15, 20, 25].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 border rounded"
              >
                {"<"}
              </button>
              <span className="mx-2">
                {currentPage} of {Math.ceil(data.length / rowsPerPage)}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(data.length / rowsPerPage)}
                className="px-2 py-1 border rounded"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
