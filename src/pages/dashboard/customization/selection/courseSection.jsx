import React, { useState } from "react";
import { CoverImg } from "@assets";

const videoData = [
  {
    id: 1,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
  },
  {
    id: 2,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
  },
  {
    id: 3,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
  },
  {
    id: 4,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
  },
  {
    id: 5,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
  },
  {
    id: 6,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
  },
];

export function CourseSection() {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleCheckbox = (videoId) => {
    setSelectedVideos((prevSelected) =>
      prevSelected.includes(videoId)
        ? prevSelected.filter((id) => id !== videoId)
        : [...prevSelected, videoId],
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(videoData.map((video) => video.id));
    }
    setSelectAll(!selectAll);
  };

  const isVideoSelected = (videoId) => selectedVideos.includes(videoId);

  const truncateText = (text, charLimit) => {
    if (text.length > charLimit) {
      return `${text.slice(0, charLimit)}...`;
    }
    return text;
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 py-3 bg-black rounded-tl-xl rounded-tr-xl">
        <div className="flex items-center justify-center gap-x-4">
          <input
            type="checkbox"
            className="w-5 h-5 p-1 text-[.6rem] bg-transparent border-[2px] rounded-md appearance-none cursor-pointer border-light-default peer checked:border-light-default checked:ring-0"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <h3 className="text-xl">Selected Courses</h3>
        </div>

        <span className="text-xl font-light">{videoData.length}</span>
      </div>

      {/* Video List Section */}
      <div className="grid bg-dark-default h-[750px] overflow-hidden overflow-y-scroll scrollbar-thin">
        {videoData.map((video) => (
          <>
            <div key={video.id} className="py-3 rounded-lg">
              <div className="grid items-center justify-between grid-cols-[5%_auto_50%] px-6 pt-2 pb-5 gap-x-6">
                <input
                  type="checkbox"
                  className="w-5 h-5 p-1 text-[.6rem] bg-transparent border-[2px] rounded-md appearance-none cursor-pointer border-light-default peer checked:border-light-default checked:ring-0"
                  checked={isVideoSelected(video.id)}
                  onChange={() => toggleCheckbox(video.id)}
                />
                <img
                  src={CoverImg}
                  alt="Video thumbnail"
                  className="mr-4 rounded-lg w-28"
                />
                <div>
                  <h4 className="text-base">{truncateText(video.title, 50)}</h4>
                  <p className="text-sm text-light-secondary">
                    {truncateText(video.description, 50)}
                  </p>
                </div>
              </div>
              <hr className="w-full border-light-shadow" />
            </div>
          </>
        ))}
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-center px-4 py-3 bg-black rounded-bl-xl rounded-br-xl">
        <button type="button" className="text-xl text-light-default">
          Add Course
        </button>
      </div>
    </div>
  );
}
