import React from "react";
import Select from "react-select";
import { SelectStyles } from "@utils";

export function TextSection() {
  return (
    <div>
      <div className="w-full mb-4">
        <label
          htmlFor="text"
          className="block mb-2 text-xs font-medium md:text-base text-light-default"
        >
          Text <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="text"
          placeholder="Enter Text"
          className={`w-full px-4 py-3 text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
        />
      </div>
      <div className="relative w-full mb-4">
        <label
          htmlFor="style"
          className="block mb-2 text-xs font-medium md:text-base text-light-default"
        >
          Style <span className="text-red-600">*</span>
        </label>
        <Select
          options={[
            { label: "Header", value: "Header" },
            { label: "Paragraph", value: "Paragraph" },
          ]}
          className={`w-full px-[.65rem] py-[.35rem] text-[.65rem] bg-transparent border rounded-md md:text-base text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
          placeholder="Select Style"
          styles={SelectStyles()}
        />
      </div>
    </div>
  );
}
