import React, { useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export function DataTable({ columns, data, initialRowsPerPage = 15 }) {
  const [selectedColumns, setSelectedColumns] = useState(
    columns.filter((column) => column !== "ID"),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [selectedRows, setSelectedRows] = useState([]);
  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleColumnToggle = (column) => {
    setSelectedColumns((prevSelectedColumns) =>
      prevSelectedColumns.includes(column)
        ? prevSelectedColumns.filter((col) => col !== column)
        : [...prevSelectedColumns, column],
    );
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
      const allRows = data.map((row) => row._id);
      setSelectedRows(allRows);
    } else setSelectedRows([]);
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id],
    );
  };

  return (
    <div>
      <div className="flex flex-wrap items-center w-full my-4">
        <h1 className="pb-2 mr-4 xl:pb-0">Columns:</h1>
        <div className="flex flex-wrap w-full gap-4">
          {columns
            .filter((column) => column !== "ID")
            .map((column) => (
              <label
                key={column}
                className="flex items-center gap-x-2 text-light-default"
              >
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(column)}
                  onChange={() => handleColumnToggle(column)}
                  className="w-5 h-5 p-1 text-[.6rem] bg-transparent border-2 rounded-md appearance-none cursor-pointer border-light-default peer checked:border-light-default checked:ring-0"
                />
                <span>{column}</span>
              </label>
            ))}
        </div>
      </div>

      <div className="rounded-md scrollbar-thin max-h-[650px] overflow-y-auto">
        <div className="overflow-x-auto 2xl:w-[100%] w-[200%]">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-light-default bg-dark-default">
                <th className="px-4 py-2 border-b border-light-shadow">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedRows.length === data.length}
                    className="h-5 w-5 p-1 text-[.6rem] bg-transparent border-2 rounded-md appearance-none cursor-pointer border-light-default peer checked:border-light-default checked:ring-0"
                  />
                </th>
                <th className="px-4 py-2 border-b border-light-shadow">ID</th>
                {selectedColumns.map((column) => (
                  <th
                    key={column}
                    className="px-4 py-2 border-b border-light-shadow"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-light-default bg-dark-default">
              {data
                .slice(
                  (currentPage - 1) * rowsPerPage,
                  currentPage * rowsPerPage,
                )
                .map((row) => (
                  <tr key={row._id} className="hover:bg-light-shadow">
                    <td className="px-4 py-2 border-b border-light-shadow">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row._id)}
                        onChange={() => handleRowSelect(row._id)}
                        className="h-5 w-5 p-1 text-[.6rem] bg-transparent border-2 rounded-md appearance-none cursor-pointer border-light-default peer checked:border-light-default checked:ring-0"
                      />
                    </td>
                    <td className="px-4 py-2 border-b border-light-shadow">
                      {row._id}
                    </td>
                    {selectedColumns.map((column) => (
                      <td
                        key={`${row._id}-${column}`}
                        className="px-4 py-2 border-b border-light-shadow"
                      >
                        {row[column]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-end mt-4 text-light-default">
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
