import React from "react";
import {
  FaRegEdit,
  FaEye,
  FaArrowUp,
  FaArrowDown,
  FaCog,
} from "react-icons/fa";
import { HiOutlineTrash, HiOutlineChartBar } from "react-icons/hi";

export function VideoUiSection({
  id,
  data,
  onDelete,
  onMoveUp,
  onMoveDown,
  onEdit,
}) {
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
        <h1>Video Section</h1>
        <div className="flex gap-x-3">
          <FaCog
            size={20}
            className="cursor-pointer"
            onClick={() => onEdit(id)}
          />
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

      {/* Video content section */}
      <div className="w-full px-8 pb-6">
        <div className="relative flex flex-row h-[24rem] pt-6 overflow-x-auto overflow-y-hidden scrollbar-thin">
          {data.map((video, index) => (
            <div
              key={index}
              className="absolute px-6 left-0 rounded-lg shadow-lg 2xl:max-w-xs xl:max-w-[17.5rem] max-w-[16.5rem] text-light-default h-full w-full overflow-hidden"
              style={{
                marginLeft: calculateMarginLeft(index, window.innerWidth),
              }}
            >
              <div className="relative">
                <img
                  src={video.image}
                  alt="Video thumbnail"
                  className="object-cover w-full h-48 rounded-lg"
                />
                <button className="absolute top-0 right-0 flex items-center px-2 py-1 text-sm bg-black gap-x-1 rounded-bl-md text-light-default">
                  <FaRegEdit className="text-light-default" /> Edit
                </button>
              </div>
              <div>
                <h1 className="pt-2 text-lg font-semibold leading-tight">
                  {truncateText(video.title, 6)}
                </h1>
                <p className="text-sm text-light-secondary">
                  {video.courseName} <br />
                  {video.duration}{" "}
                  <span className="float-right">{video.date}</span>
                </p>
              </div>
              <p className="py-4 text-sm text-light-secondary">
                {truncateText(video.description, 22)}
              </p>
              <div className="flex items-center justify-between text-xs text-light-secondary">
                <div className="flex items-center gap-2">
                  <FaEye className="text-light-secondary" />
                  <span>{video.views} Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineChartBar className="text-light-secondary" />
                  <span>{video.active} Active Viewers</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
