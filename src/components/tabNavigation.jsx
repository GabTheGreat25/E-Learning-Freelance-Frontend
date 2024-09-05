import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function TabNavigation({ activeTab, setActiveTab, tabs }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tab) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  useEffect(() => {
    const currentPath = location.pathname;

    const activeTab = tabs.find((tab) => currentPath === tab.path);

    if (activeTab) {
      setActiveTab(activeTab.name);
    }
  }, [location, setActiveTab, tabs]);

  return (
    <div className="flex text-2xl border-b gap-x-6 border-light-secondary">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`relative pb-2 ${
            activeTab === tab.name
              ? "border-b-[2.5px] border-light-default"
              : ""
          }`}
          onClick={() => handleTabClick(tab)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}
