import React, { useState } from "react";
import { CoverImg } from "@assets";

const courseData = [
  {
    id: 1,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
    speaker: "Speaker Name",
    duration: "2 hr 1 min",
    image: CoverImg,
  },
  {
    id: 2,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
    speaker: "Speaker Name",
    duration: "2 hr 1 min",
    image: CoverImg,
  },
  {
    id: 3,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
    speaker: "Speaker Name",
    duration: "2 hr 1 min",
    image: CoverImg,
  },
  {
    id: 4,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
    speaker: "Speaker Name",
    duration: "2 hr 1 min",
    image: CoverImg,
  },
  {
    id: 5,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
    speaker: "Speaker Name",
    duration: "2 hr 1 min",
    image: CoverImg,
  },
  {
    id: 6,
    title: "Things to master if you want to be SUCCESSFUL",
    description: "Learn why people think, feel, and behave",
    speaker: "Speaker Name",
    duration: "2 hr 1 min",
    image: CoverImg,
  },
];

export function CourseSection({ setSelectedData }) {
  const [selectedCoursesState, setSelectedCoursesState] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleCheckbox = (course) => {
    setSelectedCoursesState((prevSelected) => {
      const newSelected = prevSelected.some((v) => v.id === course.id)
        ? prevSelected.filter((v) => v.id !== course.id)
        : [...prevSelected, course];

      setSelectedData(newSelected);
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    const newSelected = selectAll ? [] : courseData;
    setSelectedCoursesState(newSelected);
    setSelectedData(newSelected);
    setSelectAll(!selectAll);
  };

  const isCourseSelected = (courseId) =>
    selectedCoursesState.some((course) => course.id === courseId);

  const truncateText = (text, charLimit) =>
    text.length > charLimit ? `${text.slice(0, charLimit)}...` : text;

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

        <span className="text-xl font-light">{courseData.length}</span>
      </div>

      {/* Course List Section */}
      <div className="grid bg-dark-default h-[750px] overflow-hidden overflow-y-scroll scrollbar-thin">
        {courseData.map((course) => (
          <div key={course.id} className="py-3 rounded-lg">
            <div className="grid items-center justify-between grid-cols-[5%_auto_50%] px-6 pt-2 pb-5 gap-x-6">
              <input
                type="checkbox"
                className="w-5 h-5 p-1 text-[.6rem] bg-transparent border-[2px] rounded-md appearance-none cursor-pointer border-light-default peer checked:border-light-default checked:ring-0"
                checked={isCourseSelected(course.id)}
                onChange={() => toggleCheckbox(course)}
              />
              <img
                src={course.image}
                alt="Course thumbnail"
                className="object-cover w-32 h-24 mr-4 rounded-lg"
              />
              <div>
                <h4 className="text-base">{truncateText(course.title, 50)}</h4>
                <p className="text-sm text-light-secondary">
                  {truncateText(course.description, 50)}
                </p>
              </div>
            </div>
            <hr className="w-full border-light-shadow" />
          </div>
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
