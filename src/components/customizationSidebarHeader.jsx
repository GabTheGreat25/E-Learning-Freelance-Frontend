import React from "react";
import { FaChevronLeft } from "react-icons/fa";

export function CustomizationSidebarHeader({
  activeSection,
  onClose,
  onBack,
  onSave,
  isEditMode,
}) {
  return (
    <div className="flex items-center justify-between pb-6">
      {activeSection ? (
        <>
          {!isEditMode && (
            <button className="flex items-center text-white" onClick={onBack}>
              <FaChevronLeft size={20} className="mr-1" />
            </button>
          )}
          <div className="flex items-center justify-between w-full">
            <h1 className={`text-lg ${isEditMode ? "pl-0" : "pl-3"}`}>
              {activeSection}
            </h1>
            <button
              className="text-sm px-8 py-[0.1rem] border rounded-full ml-auto"
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-xl">Add Section</h1>
          <button className="text-white" onClick={onClose}>
            Close
          </button>
        </>
      )}
    </div>
  );
}
