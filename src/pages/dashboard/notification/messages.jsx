import React, { useState } from "react";
import { Navbar, Footer, TabNavigation } from "@components";
import { notificationTabs } from "@utils";

export function Messages() {
  const [activeTab, setActiveTab] = useState("Activities");

  return (
    <>
      <Navbar title="Notifications" />
      <section className="h-screen px-16 pt-12 pb-32 overflow-y-auto bg-black scrollbar-thin text-light-default">
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
