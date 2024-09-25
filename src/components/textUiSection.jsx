import React from "react";
import { FaArrowUp, FaArrowDown, FaCog } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";

export function TextUiSection({
  id,
  data,
  onDelete,
  onMoveUp,
  onMoveDown,
  onEdit,
}) {
  return (
    <div className="relative w-full border border-light-shadow">
      <div className="flex justify-between px-8 py-2 bg-dark-default">
        <h1>Text Section</h1>
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

      <div className="w-full px-8 py-6">
        <h2 className={`${data?.style?.value}`}>{data?.text}</h2>
      </div>
    </div>
  );
}
