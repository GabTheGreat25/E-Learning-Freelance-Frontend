import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@components";

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section className={`relative min-h-screen bg-black`}>
        {isSmallScreen && isSidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-opacity-25 bg-light-default"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
        <div className="flex min-h-full">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />

          <div className="flex-grow lg:pt-0">
            <Outlet context={{ isSidebarOpen }} />
          </div>
        </div>
      </section>
    </>
  );
}
