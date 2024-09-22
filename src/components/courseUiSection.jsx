import React from "react";
import { FaArrowUp, FaArrowDown, FaCog } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";

export function CourseUiSection({ id, data, onDelete, onMoveUp, onMoveDown }) {
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(" ")} ...`;
    }
    return text;
  };

  const calculateMarginLeft = (index, screenWidth) => {
    if (screenWidth >= 1536) {
      return `${index * 19.5}rem`;
    } else if (screenWidth >= 1280) {
      return `${index * 16.5}rem`;
    } else if (screenWidth >= 1024) {
      return `${index * 16}rem`;
    } else if (screenWidth >= 768) {
      return `${index * 15.75}rem`;
    } else return `${index * 15.5}rem`;
  };

  return (
    <div className="relative w-full border border-light-shadow">
      <div className="flex justify-between px-8 py-2 bg-dark-default">
        <h1>Course Section</h1>
        <div className="flex gap-x-3">
          <FaCog size={20} className="cursor-pointer" />
          <HiOutlineTrash
            size={22}
            onClick={() => onDelete(id)}
            className="cursor-pointer"
          />
          <div className="flex gap-x-[3px]">
            <FaArrowUp
              onClick={onMoveUp}
              size={20}
              className="cursor-pointer"
            />
            <FaArrowDown
              onClick={onMoveDown}
              size={20}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Course content section */}
      <div className="w-full px-8 pb-6">
        <div className="relative flex flex-row h-[26rem] pt-6 overflow-x-auto overflow-y-hidden scrollbar-thin">
          {data.map((course, index) => (
            <div
              key={index}
              className="absolute left-0 h-full pb-6 w-[18rem] rounded-lg shadow-lg overflow-hidden"
              style={{
                marginLeft: calculateMarginLeft(index, window.innerWidth),
              }}
            >
              <div
                className="relative w-full h-full bg-center bg-cover"
                style={{ backgroundImage: `url(${course.image})` }}
              >
                <div className="absolute inset-0 bg-opacity-65 bg-dark-default"></div>
                <div className="absolute bottom-0 flex flex-col items-center justify-center text-center text-white">
                  <p className="text-sm">{course.speaker}</p>
                  <h1 className="px-6 pb-1 text-xl">
                    {truncateText(course.title, 20)}
                  </h1>
                  <p className="pb-4 text-sm">{course.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
