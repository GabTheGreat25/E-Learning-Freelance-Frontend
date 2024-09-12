import React, { useState } from "react";
import { Navbar, Footer, TabNavigation, DataTable } from "@components";
import { notificationTabs } from "@utils";

export function Messages() {
  const [activeTab, setActiveTab] = useState("Activities");

  return (
    <>
      <Navbar title="Notifications" />
      <section className="h-screen px-4 pt-12 pb-32 overflow-y-auto bg-black scrollbar-thin sm:px-10 2xl:px-28 xl:px-24 lg:px-12 text-light-default">
        {/* Analytics */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={notificationTabs}
        />

        <Footer />
      </section>
    </>
  );
}
