import React from "react";
import { SidebarItems } from "@utils";

export function SidebarContents({ activeItem, onItemClick }) {
  const sidebarItems = SidebarItems();

  const getItemClass = (item) => {
    return `flex items-center py-2 pr-4 cursor-pointer hover:bg-light-shadow ${
      activeItem === item
        ? "border-r-4 border-light-variant"
        : "border-r-4 border-transparent"
    }`;
  };

  return (
    <ul className="py-4 mt-4 space-y-2 text-light-default">
      {sidebarItems.map((item) => (
        <span key={item.name} className="grid pb-2">
          <li
            onClick={() => {
              onItemClick(item.name);
              item.onClick();
            }}
            className={getItemClass(item.name)}
          >
            <img
              src={item.icon}
              alt={`${item.name} icon`}
              size={24}
              className="ml-8 mr-4"
            />
            <h1 className="text-lg font-medium text-light-default">
              {item.label}
            </h1>
          </li>
          <hr className="m-0 border-t border-light-shadow" />
        </span>
      ))}
    </ul>
  );
}
