import React from "react";

export function SidebarHeader({ logo, username }) {
  return (
    <div className="flex flex-col items-start px-8 pt-8">
      <img src={logo} alt="Go Virtual Logo" className="mb-4" />
      <p className="text-2xl font-medium text-light-default">
        Hi {username || "Admin"}
      </p>
    </div>
  );
}
