import React, { useState } from "react";
import { Navbar, Footer, CustomizationSidebar } from "@components";
import { AddVideoImg } from "@assets";
import { Toast } from "@utils";
import { TOAST } from "@constants";
import { v4 as uuidv4 } from "uuid";

export function Customization() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [addedSections, setAddedSections] = useState([]);
  const [sectionImages, setSectionImages] = useState({});
  const [moveDirection, setMoveDirection] = useState(null);

  const handleButtonClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSectionChange = (sectionTitle, uiComponent, data) => {
    if (addedSections.length >= 20) {
      Toast(TOAST.WARN, "Maximum 20 sections allowed!");
      return;
    }

    const newSection = {
      id: uuidv4(),
      title: sectionTitle,
      uiComponent: uiComponent,
      data,
    };

    setAddedSections((prevSections) => [...prevSections, newSection]);
    setSidebarOpen(false);
  };

  const handleImageChange = (id, imageData) => {
    setSectionImages((prevImages) => ({
      ...prevImages,
      [id]: imageData,
    }));
  };

  const handleDeleteSection = (id) => {
    setAddedSections((prevSections) =>
      prevSections.filter((section) => section.id !== id),
    );
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    setMoveDirection("up");
    const newSections = [...addedSections];
    [newSections[index - 1], newSections[index]] = [
      newSections[index],
      newSections[index - 1],
    ];
    setAddedSections(newSections);

    setTimeout(() => {
      setMoveDirection(null);
    }, 750);
  };

  const handleMoveDown = (index) => {
    if (index === addedSections.length - 1) return;
    setMoveDirection("down");
    const newSections = [...addedSections];
    [newSections[index], newSections[index + 1]] = [
      newSections[index + 1],
      newSections[index],
    ];
    setAddedSections(newSections);

    setTimeout(() => {
      setMoveDirection(null);
    }, 750);
  };

  const renderSection = (section, index) => {
    let sectionClass = "section";
    if (moveDirection === "up") sectionClass += " section-up";
    if (moveDirection === "down") sectionClass += " section-down";

    const SectionComponent = section.uiComponent;

    return (
      <div key={section.id} className={sectionClass}>
        <SectionComponent
          data={section.data}
          onImageChange={handleImageChange}
          onDelete={() => handleDeleteSection(section.id)}
          onMoveUp={() => handleMoveUp(index)}
          onMoveDown={() => handleMoveDown(index)}
        />
      </div>
    );
  };

  return (
    <>
      <Navbar title="Customization" />
      <section className="h-screen overflow-y-auto scrollbar-thin">
        {addedSections.length > 0 && (
          <div className="flex justify-between px-16 pt-6 text-light-default">
            <h1 className="text-2xl">Homepage</h1>
            <div className="px-10 py-[.125rem] border rounded-full h-fit cursor-pointer">
              <button>Save</button>
            </div>
          </div>
        )}
        <div className="grid min-h-screen px-16 pt-4 pb-20">
          <div
            className={`grid bg-black text-light-default ${
              addedSections.length > 0 ? "items-start" : "items-end pb-20"
            }`}
          >
            <div className="grid gap-y-4">
              {addedSections.length > 0 ? (
                addedSections.map((section, index) =>
                  renderSection(section, index),
                )
              ) : (
                <h1 className="flex items-end justify-center text-3xl text-center">
                  No items available
                </h1>
              )}
            </div>
          </div>
          <div className={`flex items-end`}>
            <Footer
              showButton={true}
              onButtonClick={handleButtonClick}
              buttonTitle={"Add Section"}
              buttonIcon={AddVideoImg}
            />
          </div>
        </div>
      </section>
      <CustomizationSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onSectionChange={handleSectionChange}
      />
    </>
  );
}
