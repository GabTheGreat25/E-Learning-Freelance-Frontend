import React from "react";
import { AddVideoImg } from "@assets";

export function Footer({ showButton = false, onButtonClick, buttonTitle }) {
  return (
    <div>
      <div className="flex items-center justify-center pt-12 text-light-default 2xl:gap-x-16 xl:gap-x-12 lg:gap-x-10 md:gap-x-8">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>

      <div className="pt-8 text-base text-center text-light-secondary">
        <p>2024 Copyright</p>
      </div>

      {showButton && (
        <div className="relative flex items-end justify-end pt-8 text-center bottom-16 right-4">
          <button
            onClick={onButtonClick}
            className="bg-gradient-to-r from-[#c1905f] to-[#9c6d3b] p-2 rounded-full px-5 py-3 border border-light-default"
          >
            <div className="flex items-center justify-center gap-x-3">
              <img
                src={AddVideoImg}
                alt="AddVideoImg"
                className="object-cover w-5 h-5"
              />
              <span className="text-lg">{buttonTitle}</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
