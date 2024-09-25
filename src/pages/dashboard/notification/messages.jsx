import React, { useState, useRef, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
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
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const modalRef = useRef(null);

  const [users, setUsers] = useState([
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
  ]);

  const handleSendMessage = () => {
    if (inputMessage.trim() || selectedFile) {
      const newMessage = {
        text: inputMessage || "",
        sender: "Me",
        time: "Just now",
        file: selectedFile ? URL.createObjectURL(selectedFile) : null,
        senderType: "Student",
        fileType: selectedFile ? selectedFile.type : null,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
      setSelectedFile(null);
      inputRef.current.focus();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(null);
      setShowSuccessModal(false);

      setTimeout(() => {
        setSelectedFile(file);
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 2000);
      }, 100);
    }
  };

  const handleUserClick = (user) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.name === user.name ? { ...u, unread: 0 } : u)),
    );

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

  const handleKeyDown = (event) => {
    if (event.code === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowSuccessModal(false);
      }
    };

    if (showSuccessModal) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showSuccessModal]);

  return (
    <>
      <Navbar title="Notifications" />
      <section className="h-screen px-16 pt-12 pb-32 overflow-y-auto bg-black text-light-default scrollbar-thin">
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={notificationTabs}
        />

        <div className="flex mt-8 h-[800px]">
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

          <div className="flex flex-col flex-1 ml-8 rounded-lg bg-dark-default">
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

            <div className="flex-grow p-4 space-y-4 overflow-y-auto border-2 border-light-default">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start ${
                    message.sender === "Me" ? "justify-end" : ""
                  }`}
                >
                  <div className="flex flex-col flex-wrap p-3 my-2 rounded-lg bg-dark-secondary">
                    {message.file && message.fileType.startsWith("image/") && (
                      <img
                        src={message.file}
                        alt="Uploaded"
                        className="object-contain w-full h-auto max-w-xs mb-2 md:max-w-sm lg:max-w-md"
                      />
                    )}
                    {message.file && message.fileType.startsWith("video/") && (
                      <video
                        controls
                        src={message.file}
                        className="object-contain w-full h-auto max-w-xs mb-2 md:max-w-sm lg:max-w-md"
                      />
                    )}

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

            <div className="p-4 border-b-2 border-l-2 border-r-2 rounded-b-lg bg-dark-default border-light-default">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message here..."
                  className="flex-grow px-4 py-2 rounded-full bg-dark-secondary text-light-default placeholder-light-default"
                />
                <button onClick={() => fileInputRef.current.click()}>
                  <FiPaperclip
                    size={24}
                    className="cursor-pointer text-light-default"
                  />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 rounded-lg bg-light-shadow text-light-default hover:bg-dark-tertiary"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="p-16 rounded-lg bg-dark-secondary text-light-default"
          >
            <p className="text-2xl">File uploaded successfully!</p>
          </div>
        </div>
      )}
    </>
  );
}
