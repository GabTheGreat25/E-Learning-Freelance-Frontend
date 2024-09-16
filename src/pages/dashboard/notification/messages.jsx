import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Navbar, Footer, TabNavigation } from "@components";
import { notificationTabs } from "@utils";
import { ChatHeadImg } from "@assets";

export function Messages() {
  const [activeTab, setActiveTab] = useState("Messages");
  const [activeUser, setActiveUser] = useState("Jack Harrow");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I have some queries regarding 2nd Chapter",
      sender: "Jack Harrow",
      time: "40 mins ago",
      senderType: "Student",
    },
    {
      text: "Sure, let me know what the issue is?",
      sender: "Me",
      time: "40 mins ago",
      senderType: "Student",
    },
    {
      text: "I have a problem about the payment can you help me?",
      sender: "Jack Harrow",
      time: "Just now",
      senderType: "Student",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const users = [
    { name: "Jack Harrow", senderType: "Student", unread: 0 },
    { name: "Veli Dincer", senderType: "Student", unread: 1 },
    { name: "Theresa Webb", senderType: "Student", unread: 3 },
    { name: "John Doe", senderType: "Student", unread: 0 },
    { name: "Jane Smith", senderType: "Student", unread: 5 },
    { name: "Michael Brown", senderType: "Student", unread: 1 },
    { name: "Emma Wilson", senderType: "Student", unread: 0 },
    { name: "Oliver Harris", senderType: "Student", unread: 2 },
    { name: "Johnny Rev", senderType: "Student", unread: 3 },
    { name: "Joy Smith", senderType: "Student", unread: 0 },
    { name: "Michelle Lore", senderType: "Student", unread: 4 },
    { name: "Carrie Hale", senderType: "Student", unread: 1 },
    { name: "Liam Miller", senderType: "Student", unread: 5 },
    { name: "Emily Johnson", senderType: "Student", unread: 2 },
    { name: "Alisha Marie", senderType: "Student", unread: 0 },
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        text: inputMessage,
        sender: "Me",
        time: "Just now",
        senderType: "Student",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  const handleUserClick = (user) => {
    setActiveUser(user.name);

    setMessages([
      {
        text: `Chat with ${user.name} starts here.`,
        sender: user.name,
        time: "Just now",
        senderType: user.senderType,
      },
    ]);
  };

  return (
    <>
      <Navbar title="Notifications" />
      <section className="h-screen px-16 pt-12 pb-32 overflow-y-auto bg-black text-light-default">
        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={notificationTabs}
        />

        <div className="flex mt-8 h-[800px]">
          {/* Sidebar */}
          <div className="w-[30%] bg-dark-default text-light-default">
            <div className="flex items-center justify-between mb-4 bg-transparent border rounded-md cursor-pointer border-light-default">
              <input
                type="text"
                placeholder="Search User"
                className="px-4 py-2 bg-transparent outline-none text-light-default placeholder-light-default"
              />
              <IoSearchOutline className="mr-4 text-light-default" size={24} />
            </div>
            <ul className="space-y-4 overflow-hidden scrollbar-thin overflow-y-scroll h-[90%]">
              {users.map((user, index) => (
                <li key={index}>
                  <div
                    onClick={() => handleUserClick(user)}
                    className={`flex flex-col p-2 cursor-pointer ${
                      activeUser === user.name
                        ? "bg-light-shadow border-l-4"
                        : "hover:bg-dark-secondary"
                    }`}
                  >
                    <div className="flex items-center">
                      <img
                        src={ChatHeadImg}
                        alt={user.name}
                        className="w-8 h-8 mr-4 rounded-full"
                      />
                      <span className="flex-grow text-lg">{user.name}</span>
                      {user.unread > 0 && (
                        <div className="relative top-3">
                          <span className="px-2 py-1 ml-2 text-xs font-semibold rounded-full text-dark-default bg-light-default">
                            {user.unread}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="pl-12 text-sm text-light-default">
                      {user.senderType}
                    </span>
                  </div>
                  {index < users.length - 1 && (
                    <hr className="border-light-default" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Message Area */}
          <div className="flex flex-col flex-1 ml-8 rounded-lg bg-dark-default">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-t-2 border-l-2 border-r-2 rounded-t-lg bg-dark-default border-light-default">
              <div className="flex items-center">
                <img
                  src={ChatHeadImg}
                  alt={activeUser}
                  className="w-10 h-10 mr-4 rounded-full"
                />
                <div>
                  <h2 className="text-white">{activeUser}</h2>
                  <p className="text-sm text-gray-400">
                    {users.find((user) => user.name === activeUser)?.senderType}
                  </p>
                </div>
              </div>
              <div className="flex px-6 space-x-8 text-lg">
                <button className="text-error-default hover:underline">
                  Delete
                </button>
                <button className="text-light-default hover:underline">
                  Block
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-4 space-y-4 overflow-y-auto border-2 border-light-default">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start ${
                    message.sender === "Me" ? "justify-end" : ""
                  }`}
                >
                  <div className="flex flex-col p-3 my-2 rounded-lg bg-dark-secondary">
                    <p
                      className={`text-light-default text-base max-w-md ${
                        message.sender === "Me" ? "self-end" : "self-start"
                      }`}
                    >
                      {message.text}
                    </p>
                    <p
                      className={`text-sm text-light-default ${
                        message.sender === "Me" ? "self-end" : "self-start"
                      } mt-1`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-b-2 border-l-2 border-r-2 rounded-b-lg bg-dark-default">
              <div className="flex">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-grow p-3 rounded-l-lg text-light-default placeholder:text-light-default bg-dark-secondary focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 rounded-r-lg bg-light-shadow text-light-default hover:bg-dark-tertiary"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
