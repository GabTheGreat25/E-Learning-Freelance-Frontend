import React from "react";

export function Navbar({ title }) {
  return (
    <div className="relative w-full rounded-lg h-28 bg-gradient-to-r from-purple-900 via-yellow-700 to-teal-900">
      <div className="absolute inset-0 bg-black rounded-lg opacity-75"></div>
      <div className="absolute inset-0 bg-black rounded-lg opacity-40"></div>

      <div className="relative flex items-end h-full px-16 pb-2">
        <h1 className="text-4xl font-medium text-light-default">{title}</h1>
      </div>
    </div>
  );
}

export default Navbar;
