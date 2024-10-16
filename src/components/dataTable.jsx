import React, { useState, useEffect } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi";

export function DataTable({
  columns,
  data,
  initialRowsPerPage = 15,
  handleRowClick,
  maxHeight = "650px",
}) {
  const [originalColumns] = useState(columns);
  const [selectedColumns, setSelectedColumns] = useState(
    columns.filter((column) => column.name !== "ID"),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const totalRows = tableData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleDelete = () => {
    const newData = tableData.filter((row) => !selectedRows.includes(row._id));
    setTableData(newData);
    setSelectedRows([]);

    const selectAllCheckbox = document.querySelector("#selectAllCheckbox");
    if (selectAllCheckbox) selectAllCheckbox.checked = false;
  };

  const handleColumnToggle = (columnName) => {
    setSelectedColumns((prevSelectedColumns) => {
      if (prevSelectedColumns.find((col) => col.name === columnName)) {
        return prevSelectedColumns.filter((col) => col.name !== columnName);
      } else {
        const newSelectedColumns = [...prevSelectedColumns];
        const originalColumn = originalColumns.find(
          (col) => col.name === columnName,
        );
        const originalIndex = originalColumns.indexOf(originalColumn);

        newSelectedColumns.splice(originalIndex - 1, 0, originalColumn);

        return newSelectedColumns;
      }
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (!isNaN(newRowsPerPage)) {
      setRowsPerPage(newRowsPerPage);
      setCurrentPage(1);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allRows = slicedData.map((row) => row._id);
      setSelectedRows(allRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id],
    );
  };

  const slicedData = tableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div>
      {/* Column Selector */}
      <div className="flex flex-wrap items-center justify-center w-full my-4">
        <div className="flex flex-wrap items-center justify-start w-full gap-x-4">
          <h1 className="pb-2 mr-4 xl:pb-0">Columns:</h1>
          {originalColumns
            .filter((column) => column.name !== "ID")
            .map((column) => (
              <label
                key={column.name}
                className="flex items-center gap-x-2 text-light-default"
              >
                <input
                  type="checkbox"
                  checked={selectedColumns.find(
                    (col) => col.name === column.name,
                  )}
                  onChange={() => handleColumnToggle(column.name)}
                  className="w-5 h-5 p-1 text-[.6rem] bg-transparent border-2 rounded-md appearance-none cursor-pointer border-light-default peer checked:border-light-default checked:ring-0"
                />
                <span>{column.name}</span>
              </label>
            ))}
        </div>
      </div>

      {/* Table */}
      <div
        className="overflow-y-auto rounded-md scrollbar-thin"
        style={{ maxHeight }}
      >
        <div className="overflow-x-auto 2xl:w-[120%] w-[200%]">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-light-default bg-dark-default">
                <th className="px-4 py-2 border-b border-light-shadow">
                  <input
                    id="selectAllCheckbox"
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      slicedData.length > 0 &&
                      selectedRows.length === slicedData.length
                    }
                    className="h-5 w-5 p-1 text-[.6rem] bg-transparent border-2 rounded-md appearance-none cursor-pointer border-light-default peer checked:border-light-default checked:ring-0"
                  />
                </th>
                <th className="px-4 py-2 border-b border-light-shadow">ID</th>
                {selectedColumns.map((column) => (
                  <th
                    key={column.name}
                    className="px-4 py-2 border-b border-light-shadow"
                  >
                    {column.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-light-default bg-dark-default">
              {slicedData.map((row) => (
                <tr
                  key={row._id}
                  className="cursor-pointer hover:bg-light-shadow"
                  onClick={(e) => {
                    if (e.target.type !== "checkbox") handleRowClick(row._id);
                  }}
                >
                  <td
                    className="px-4 py-2 border-b border-light-shadow"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row._id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleRowSelect(row._id);
                      }}
                      className="h-5 w-5 p-1 text-[.6rem] bg-transparent border-2 rounded-md appearance-none cursor-pointer border-light-default peer checked:border-light-default checked:ring-0"
                    />
                  </td>
                  <td className="px-4 py-2 border-b border-light-shadow">
                    {row._id}
                  </td>
                  {selectedColumns.map((column) => (
                    <td
                      key={`${row._id}-${column.name}`}
                      className="px-4 py-2 border-b border-light-shadow"
                    >
                      {column.isImage ? (
                        <img
                          src={row[column.name]}
                          alt={column.name}
                          className="object-cover w-32 h-20 rounded"
                        />
                      ) : (
                        row[column.name] || "N/A"
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-light-default">
        {/* Delete Button */}
        <div className="py-4">
          <button
            onClick={handleDelete}
            className={`flex text-lg items-center gap-x-2 px-4 py-2 bg-red-500 text-white rounded ${
              selectedRows.length === 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={selectedRows.length === 0}
          >
            Delete <HiOutlineTrash size={24} />
          </button>
        </div>
        {/* Pagination */}
        <div className="flex items-center gap-4">
          <label className="mr-2">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="px-2 py-1 bg-black border rounded border-light-shadow text-light-default"
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <span className="text-lg">
            {`${(currentPage - 1) * rowsPerPage + 1} - ${
              currentPage * rowsPerPage > totalRows
                ? totalRows
                : currentPage * rowsPerPage
            } of ${totalRows}`}
          </span>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`p-2 rounded bg-dark-secondary text-light-default hover:bg-light-shadow ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
          >
            <IoChevronBackOutline />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`p-2 rounded bg-dark-secondary text-light-default hover:bg-light-shadow ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            <IoChevronForwardOutline />
          </button>
        </div>
      </div>
    </div>
  );
}
