import React, { useState } from "react";
import { contentTabs } from "@utils";
import { Navbar, Footer, TabNavigation } from "@components";

export function Promotions() {
  const [activeTab, setActiveTab] = useState("Promotions");

  return (
    <>
      <Navbar title="Content" />
      <section className="h-screen px-4 pt-12 pb-32 overflow-y-auto scrollbar-thin sm:px-10 2xl:px-28 xl:px-24 lg:px-12 text-light-default">
        {/* Content */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={contentTabs}
        />

        <Footer />
      </section>
    </>
  );
}
