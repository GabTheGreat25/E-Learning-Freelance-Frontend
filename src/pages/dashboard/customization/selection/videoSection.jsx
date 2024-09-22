import React, { useState } from "react";
import { VideoImg } from "@assets";

const videoData = [
  {
    id: 1,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
    courseName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    image: VideoImg,
  },
  {
    id: 2,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
    courseName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    image: VideoImg,
  },
  {
    id: 3,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
    courseName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    image: VideoImg,
  },
  {
    id: 4,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
    courseName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    image: VideoImg,
  },
  {
    id: 5,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
    courseName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    image: VideoImg,
  },
  {
    id: 6,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
    courseName: "Course Name",
    duration: "2 hr 1 min",
    date: "Aug 18",
    views: 100,
    active: 50,
    image: VideoImg,
  },
];

export function VideoSection({ setSelectedVideos }) {
  const [selectedVideosState, setSelectedVideosState] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleCheckbox = (video) => {
    setSelectedVideosState((prevSelected) => {
      const newSelected = prevSelected.some((v) => v.id === video.id)
        ? prevSelected.filter((v) => v.id !== video.id)
        : [...prevSelected, video];

      setSelectedVideos(newSelected);
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    const newSelected = selectAll ? [] : videoData;
    setSelectedVideosState(newSelected);
    setSelectedVideos(newSelected);
    setSelectAll(!selectAll);
  };

  const isVideoSelected = (videoId) =>
    selectedVideosState.some((video) => video.id === videoId);

  const truncateText = (text, charLimit) =>
    text.length > charLimit ? `${text.slice(0, charLimit)}...` : text;

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-3 bg-black rounded-tl-xl rounded-tr-xl">
        <div className="flex items-center justify-center gap-x-4">
          <input
            type="checkbox"
            className="w-5 h-5 p-1 text-[.6rem] bg-transparent border-[2px] rounded-md appearance-none cursor-pointer border-light-default peer checked:border-light-default checked:ring-0"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <h3 className="text-xl">Selected Videos</h3>
        </div>
        <span className="text-xl font-light">{videoData.length}</span>
      </div>

      <div className="grid bg-dark-default h-[750px] overflow-hidden overflow-y-scroll scrollbar-thin">
        {videoData.map((video) => (
          <div key={video.id} className="py-3 rounded-lg">
            <div className="grid items-center justify-between grid-cols-[5%_auto_50%] px-6 pt-2 pb-5 gap-x-6">
              <input
                type="checkbox"
                className="w-5 h-5 p-1 text-[.6rem] bg-transparent border-[2px] rounded-md appearance-none cursor-pointer border-light-default peer checked:border-light-default checked:ring-0"
                checked={isVideoSelected(video.id)}
                onChange={() => toggleCheckbox(video)}
              />
              <img
                src={video.image}
                alt="Video thumbnail"
                className="object-cover w-32 h-24 mr-4 rounded-lg"
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
        ))}
      </div>

      <div className="flex items-center justify-center px-4 py-3 bg-black rounded-bl-xl rounded-br-xl">
        <button type="button" className="text-xl text-light-default">
          Add Videos
        </button>
      </div>
    </div>
  );
}
