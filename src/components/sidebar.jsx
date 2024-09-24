import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { GoVirtualImg } from "@assets";
import { SidebarHeader, SidebarContents } from "@utils";

export function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [activeItem, setActiveItem] = useState("home");

  useEffect(() => {
    const savedItem = localStorage.getItem("activeSidebarItem");
    if (savedItem) {
      setActiveItem(savedItem);
    } else {
      setActiveItem("home");
      localStorage.setItem("activeSidebarItem", "home");
    }
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
    localStorage.setItem("activeSidebarItem", item);
  };

  return (
    <section className="relative bg-dark-default">
      <div
        className={`${
          isSidebarOpen ? "md:translate-x-80" : "translate-x-0"
        } fixed top-0 left-0 z-10 p-4 transition-transform duration-300 lg:hidden text-light-default`}
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
        className={`fixed top-0 left-0 bg-dark-default shadow-xl transform transition-transform duration-300 ease-in-out z-20 ${
          !isSidebarOpen && "-translate-x-full"
        } xxs:w-64 sm:w-72 md:w-80 lg:w-80 lg:translate-x-0 lg:relative lg:block h-screen overflow-auto scrollbar-thin scrollbar-hide`}
      >
        {isSidebarOpen && (
          <div className="flex px-6 pt-6 place-content-end md:hidden text-light-default">
            <FaTimes
              size={24}
              onClick={toggleSidebar}
              className="cursor-pointer"
            />
          </div>
        )}
        <SidebarHeader logo={GoVirtualImg} username={"Admin"} />
        <SidebarContents
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />
      </div>
    </section>
  );
}
