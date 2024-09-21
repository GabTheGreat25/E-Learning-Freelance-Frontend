import React, { useState } from "react";
import { CustomizationSidebarHeader } from "./customizationSidebarHeader";
import { FaChevronRight } from "react-icons/fa";
import {
  TextSection,
  CourseSection,
  SingleVideoSection,
  VideoSection,
} from "@pages";
import { GalleryImg, GalleryDarkImg } from "@assets";

export function CustomizationSidebar({ isOpen, onClose }) {
  const sections = [
    { title: "Image Section", icon: GalleryImg },
    { title: "Two Column Image Section", icon: GalleryImg },
    { title: "Course Section", icon: GalleryImg, component: CourseSection },
    { title: "Video Section", icon: GalleryImg, component: VideoSection },
    {
      title: "Single Video Section",
      icon: GalleryImg,
      component: SingleVideoSection,
    },
    { title: "Text Section", icon: GalleryImg, component: TextSection },
    { title: "Spacer Section", icon: GalleryImg },
    { title: "Divider Section", icon: GalleryImg },
  ];

  const [activeSection, setActiveSection] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);

  const handleSectionChange = (sectionTitle) => {
    setActiveSection(sectionTitle);
  };

  const CurrentSectionComponent = sections.find(
    (section) => section.title === activeSection,
  )?.component;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[26rem] bg-dark-default text-light-default shadow-lg transform transition-transform duration-300 ease-in-out p-6 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <CustomizationSidebarHeader
        activeSection={activeSection}
        onClose={onClose}
        onBack={() => setActiveSection(null)}
      />

      <div className="grid gap-y-6">
        {activeSection ? (
          CurrentSectionComponent ? (
            <CurrentSectionComponent />
          ) : (
            <div>Component not found</div>
          )
        ) : (
          sections.map((section, index) => (
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
          ))
        )}
      </div>
    </div>
  );
}
