import React, { useState, useEffect } from "react";
import Select from "react-select";
import { SelectStyles } from "@utils";

const styleOptions = [
  { label: "Header", value: "text-3xl" },
  { label: "Paragraph", value: "text-base" },
];

export function TextSection({ selectedData, setSelectedData }) {
  const [data, setData] = useState(selectedData || { text: "", style: null });

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(selectedData)) {
      setSelectedData(data);
    }
  }, [data, selectedData, setSelectedData]);

  const handleTextChange = (e) => {
    setData((prev) => ({
      ...prev,
      text: e.target.value,
    }));
  };

  const handleStyleChange = (selectedOption) => {
    setData((prev) => ({
      ...prev,
      style: selectedOption,
    }));
  };

  useEffect(() => {
    setData(selectedData || { text: "", style: null });
  }, [selectedData]);

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
          value={data.text}
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
          options={styleOptions}
          value={data.style}
          onChange={handleStyleChange}
          styles={SelectStyles()}
          placeholder="Select Style"
          className="w-full px-[.65rem] py-[.35rem] text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none"
        />
      </div>
    </div>
  );
}
