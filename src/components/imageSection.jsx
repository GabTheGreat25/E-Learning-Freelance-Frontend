import React, { useState } from "react";
import { UploadImg } from "@assets";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { Toast } from "@utils";
import { TOAST } from "@constants";

export function ImageSection({
  id,
  image,
  onImageChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const [imageSectionFileName, setImageSectionFileName] = useState("");

  const truncateText = (text, charLimit) => {
    if (text.length > charLimit) {
      return `${text.slice(0, charLimit)}...`;
    }
    return text;
  };

  const handleImageSectionChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          onImageChange(id, reader.result);
          setImageSectionFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    } else {
      Toast(TOAST.ERROR, "Only image files are supported.");
    }
  };

  return (
    <div className="relative w-full border border-light-shadow">
      <div className="flex justify-between px-8 py-2 bg-dark-default">
        <h1>Image Section</h1>
        <div className="flex gap-x-3">
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
        <div className="flex items-center justify-center w-full px-6 py-16 border-[.125rem] border-dashed cursor-pointer rounded-xl bg-dark-default focus:border-info-secondary focus:outline-none">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSectionChange}
            className="hidden"
            id={`upload-imageSection-${id}`}
          />
          <label htmlFor={`upload-imageSection-${id}`}>
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <img
                src={UploadImg}
                alt="UploadImg"
                className="w-12 h-12 xs:h-16 xs:w-16 md:h-fit md:w-fit"
              />
              <h1 className="pt-3 pb-1 text-xs text-center md:text-base text-light-default">
                Image File
              </h1>
              <p className="text-xs text-center md:text-base text-light-secondary">
                {imageSectionFileName
                  ? truncateText(imageSectionFileName, 20)
                  : "jpg, jpeg, png files"}
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
