import React, { useState } from "react";
import Select from "react-select";
import { SelectStyles } from "@utils";

export function TextSection({ setSelectedData }) {
  const [text, setText] = useState("");
  const [style, setStyle] = useState(null);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    setSelectedData({ text: newText, style });
  };

  const handleStyleChange = (selectedOption) => {
    setStyle(selectedOption);
    setSelectedData({ text, style: selectedOption });
  };

  return (
    <div>
      <div className="w-full mb-4">
        <label
          htmlFor="text"
          className="block mb-2 text-sm font-medium text-light-default"
        >
          Text <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="text"
          placeholder="Enter Text"
          value={text}
          onChange={handleTextChange}
          className="w-full px-4 py-3 text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none"
        />
      </div>
      <div className="relative w-full mb-4">
        <label
          htmlFor="style"
          className="block mb-2 text-xs font-medium text-light-default"
        >
          Style <span className="text-red-600">*</span>
        </label>
        <Select
          options={[
            { label: "Header", value: "text-3xl" },
            { label: "Paragraph", value: "text-base" },
          ]}
          className={`w-full px-[.65rem] py-[.35rem] text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
          value={style}
          onChange={handleStyleChange}
          styles={SelectStyles()}
          placeholder="Select Style"
        />
      </div>
    </div>
  );
}
