import React, { useState } from "react";
import { CustomizationSidebarHeader } from "./customizationSidebarHeader";
import { FaChevronRight } from "react-icons/fa";
import { ImageSection, TwoColumnsImageSection } from "@components";
import { GalleryImg, GalleryDarkImg } from "@assets";

export function CustomizationSidebar({ isOpen, onClose, onSectionChange }) {
  const sections = [
    {
      title: "Image Section",
      icon: GalleryImg,
      component: null,
      ui: ImageSection,
    },
    {
      title: "Two Column Image Section",
      icon: GalleryImg,
      component: null,
      ui: TwoColumnsImageSection,
    },
    {
      title: "Course Section",
      icon: GalleryImg,
      component: null,
      ui: null,
    },
    {
      title: "Video Section",
      icon: GalleryImg,
      component: null,
      ui: null,
    },
    {
      title: "Single Video Section",
      icon: GalleryImg,
      component: null,
      ui: null,
    },
    {
      title: "Text Section",
      icon: GalleryImg,
      component: null,
      ui: null,
    },
    { title: "Spacer Section", icon: GalleryImg, component: null, ui: null },
    { title: "Divider Section", icon: GalleryImg, component: null, ui: null },
  ];

  const [hoveredSection, setHoveredSection] = useState(null);

  const handleSectionChange = (sectionTitle) => {
    onSectionChange(sectionTitle); // Pass the selected section to parent component
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[30rem] bg-dark-default text-light-default shadow-lg transform transition-transform duration-300 ease-in-out p-6 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <CustomizationSidebarHeader onClose={onClose} />

      <div className="grid gap-y-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 transition-colors border rounded-md cursor-pointer border-light-secondary hover:bg-light-default hover:text-dark-default"
            onMouseEnter={() => setHoveredSection(section.title)}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={() => handleSectionChange(section.title)}
          >
            <div className="flex items-center">
              <img
                src={
                  hoveredSection === section.title
                    ? GalleryDarkImg
                    : section.icon
                }
                alt={section.title}
                className="mr-3"
              />
              <span className="mt-[0.25rem]">{section.title}</span>
            </div>
            <span className="flex items-center">
              Add <FaChevronRight size={12} className="ml-1" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
