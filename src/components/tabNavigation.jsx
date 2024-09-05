import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function TabNavigation({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Overview") {
      navigate("/dashboard");
    } else if (tab === "Analytics") {
      navigate("/dashboard/analytics");
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath === "/dashboard") {
      setActiveTab("Overview");
    } else if (currentPath.includes("analytics")) {
      setActiveTab("Analytics");
    }
  }, [location, setActiveTab]);

  return (
    <div className="flex text-2xl border-b gap-x-6 border-light-secondary">
      <button
        className={`relative pb-2 ${
          activeTab === "Overview"
            ? "border-b-[2.5px] border-light-default"
            : ""
        }`}
        onClick={() => handleTabClick("Overview")}
      >
        Overview
      </button>
      <button
        className={`relative pb-2 ${
          activeTab === "Analytics"
            ? "border-b-[2.5px] border-light-default"
            : ""
        }`}
        onClick={() => handleTabClick("Analytics")}
      >
        Analytics
      </button>
    </div>
  );
}
