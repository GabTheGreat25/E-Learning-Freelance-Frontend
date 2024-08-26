import React from "react";
import {
  FaBars,
  FaTimes,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export function Sidebar({ isSidebarOpen, toggleSidebar }) {
  return (
    <section className="relative">
      <div
        className={`${
          isSidebarOpen ? "md:translate-x-80" : "translate-x-0"
        } fixed top-0 left-0 z-10 p-4 transition-transform duration-300 lg:hidden`}
      >
        {isSidebarOpen ? (
          <FaTimes
            size={24}
            onClick={toggleSidebar}
            className="cursor-pointer"
          />
        ) : (
          <FaBars
            size={24}
            onClick={toggleSidebar}
            className="cursor-pointer"
          />
        )}
      </div>
      <div
        className={`fixed top-0 left-0 min-h-screen bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-20 ${
          !isSidebarOpen && "-translate-x-full"
        } xxs:w-64 sm:w-72 md:w-80 lg:w-80 lg:translate-x-0 lg:relative lg:block`}
      >
        {isSidebarOpen && (
          <div className="flex px-6 pt-6 place-content-end md:hidden">
            <FaTimes
              size={24}
              onClick={toggleSidebar}
              className="cursor-pointer"
            />
          </div>
        )}
        <div className="flex flex-col items-center pt-8">
          <img
            src="https://via.placeholder.com/120"
            alt="User Avatar"
            className="w-24 h-24 mb-4 rounded bg-neutral-200"
          />
          <p className="font-medium text-dark-default">Juan Dela Cruz</p>
        </div>
        <ul className="p-4 mt-8 space-y-2 text-dark-default">
          <li className="flex items-center py-2 cursor-pointer hover:bg-light-variant">
            <FaFileAlt size={24} className="mx-2" />
            <h1 className="font-medium text-dark-default">Dashboard</h1>
          </li>
          <hr className="border-t border-neutral-200" />
          <li className="flex items-center py-2 cursor-pointer hover:bg-light-variant">
            <FaFileAlt size={24} className="mx-2" />
            <h1 className="font-medium text-dark-default">Content</h1>
          </li>
          <hr className="border-t border-neutral-200" />
          <li className="flex items-center py-2 cursor-pointer hover:bg-light-variant">
            <FaFileAlt size={24} className="mx-2" />
            <h1 className="font-medium text-dark-default">Customization</h1>
          </li>
          <hr className="border-t border-neutral-200" />
          <li className="flex items-center py-2 cursor-pointer hover:bg-light-variant">
            <FaFileAlt size={24} className="mx-2" />
            <h1 className="font-medium text-dark-default">Notifications</h1>
          </li>
          <hr className="border-t border-neutral-200" />
          <li className="flex items-center py-2 cursor-pointer hover:bg-light-variant">
            <FaFileAlt size={24} className="mx-2" />
            <h1 className="font-medium text-dark-default">Transactions</h1>
          </li>
        </ul>
        <div className="absolute bottom-0 left-0 w-full bg-white">
          <ul className="p-4 space-y-2 text-dark-default">
            <li className="flex items-center py-2 cursor-pointer hover:bg-light-variant">
              <FaCog size={24} className="mx-2" />
              <h1 className="font-medium text-dark-default">Settings</h1>
            </li>
            <hr className="border-t border-neutral-200" />
            <li className="flex items-center py-2 cursor-pointer hover:bg-light-variant">
              <FaSignOutAlt size={24} className="mx-2" />
              <h1 className="font-medium text-dark-default">Log Out</h1>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
