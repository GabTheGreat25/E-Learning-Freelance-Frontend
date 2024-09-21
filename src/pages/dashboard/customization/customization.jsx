import React, { useState } from "react";
import { Navbar, Footer, CustomizationSidebar } from "@components";
import { AddVideoImg } from "@assets";

export function Customization() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleButtonClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Navbar title="Customization" />
      <section className="h-screen px-16 pt-12 pb-32 overflow-y-auto bg-black scrollbar-thin text-light-default">
        <Footer
          showButton={true}
          onButtonClick={handleButtonClick}
          buttonTitle={"Add Section"}
          buttonIcon={AddVideoImg}
        />
      </section>
      <CustomizationSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </>
  );
}
