import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "@components";
import { AddVideoImg } from "@assets";

export function Customization() {
  const handleButtonClick = () => {
    console.log("Add Section");
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
    </>
  );
}
