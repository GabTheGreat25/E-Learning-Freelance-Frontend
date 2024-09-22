import React, { useState } from "react";
import { CustomizationSidebarHeader } from "./customizationSidebarHeader";
import { FaChevronRight } from "react-icons/fa";
import {
  ImageSection,
  TwoColumnsImageSection,
  VideoUiSection,
} from "@components";
import {
  TextSection,
  CourseSection,
  SingleVideoSection,
  VideoSection,
} from "@pages";
import { Toast } from "@utils";
import { TOAST } from "@constants";
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
      component: CourseSection,
      ui: null,
    },
    {
      title: "Video Section",
      icon: GalleryImg,
      component: VideoSection,
      ui: VideoUiSection,
    },
    {
      title: "Single Video Section",
      icon: GalleryImg,
      component: SingleVideoSection,
      ui: null,
    },
    {
      title: "Text Section",
      icon: GalleryImg,
      component: TextSection,
      ui: null,
    },
    { title: "Spacer Section", icon: GalleryImg, component: null, ui: null },
    { title: "Divider Section", icon: GalleryImg, component: null, ui: null },
  ];

  const [activeSection, setActiveSection] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [selectedVideos, setSelectedVideos] = useState([]);

  const handleSectionChange = (sectionTitle) => {
    const selectedSection = sections.find(
      (section) => section.title === sectionTitle,
    );
    if (selectedSection.component) {
      setActiveSection(sectionTitle);
    } else if (selectedSection.ui) {
      onSectionChange(sectionTitle, selectedSection.ui);
    }
  };

  const handleSave = (savedData) => {
    if (selectedVideos.length === 0) {
      Toast(TOAST.WARN, "No videos selected, cannot save!");
      return;
    }

    const currentSection = sections.find(
      (section) => section.title === activeSection,
    );

    if (currentSection.component) {
      onSectionChange(activeSection, currentSection.ui, savedData);
    } else {
      onSectionChange(activeSection, currentSection.ui);
    }

    setActiveSection(null);
  };

  const handleBack = () => {
    setActiveSection(null);
  };

  const CurrentSectionComponent = sections.find(
    (section) => section.title === activeSection,
  )?.component;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[30rem] bg-dark-default text-light-default shadow-lg transform transition-transform duration-300 ease-in-out p-6 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <CustomizationSidebarHeader
        activeSection={activeSection}
        onClose={onClose}
        onBack={handleBack}
        onSave={() => handleSave(selectedVideos)}
      />
      <div className="grid gap-y-6">
        {activeSection && CurrentSectionComponent ? (
          <CurrentSectionComponent setSelectedVideos={setSelectedVideos} />
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
