import React from "react";
import { useOutletContext } from "react-router-dom";

export function Home() {
  const { isSidebarOpen } = useOutletContext();

  const isMediumScreen = window.innerWidth >= 768;

  return (
    <>
      <section className="grid min-w-full min-h-screen place-items-center">
        <div
          className={`text-center transition-transform duration-300 ease-in-out ${
            isSidebarOpen && isMediumScreen ? "translate-x-20" : "translate-x-0"
          }`}
        >
          Home is working!
        </div>
      </section>
    </>
  );
}
