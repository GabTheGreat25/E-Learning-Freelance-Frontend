import React, { useState } from "react";
import { Navbar, Footer, CustomizationSidebar } from "@components";
import { AddVideoImg } from "@assets";
import { ImageSection, TwoColumnsImageSection } from "@components";
import { Toast } from "@utils";
import { TOAST } from "@constants";

export function Customization() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [addedSections, setAddedSections] = useState([]);

  const handleButtonClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSectionChange = (sectionTitle) => {
    if (addedSections.length >= 20) {
      Toast(TOAST.WARN, "Maximum 20 sections allowed!");
      return;
    }

    setAddedSections((prevSections) => [...prevSections, sectionTitle]);
    setSidebarOpen(false);
  };

  const renderSection = (sectionTitle, index) => {
    if (sectionTitle === "Image Section") {
      return <ImageSection key={index} />;
    }
    if (sectionTitle === "Two Column Image Section") {
      return <TwoColumnsImageSection key={index} />;
    }
    return null;
  };

  return (
    <>
      <Navbar title="Customization" />
      <section className="h-screen overflow-y-auto scrollbar-thin">
        <div className="grid min-h-screen px-16 pt-12 pb-20">
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
      {/* Sidebar for selecting sections */}
      <CustomizationSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        onSectionChange={handleSectionChange}
      />
    </>
  );
}
