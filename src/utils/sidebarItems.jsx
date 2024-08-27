import { useNavigate } from "react-router-dom";
import * as images from "@assets";

export function SidebarItems() {
  const navigate = useNavigate();

  return [
    {
      name: "home",
      label: "Home",
      icon: images.HomeImg,
      onClick: () => {
        console.log("Navigating to Home");
        // navigate("/home");
      },
    },
    {
      name: "content",
      label: "Content",
      icon: images.TaskSquareImg,
      onClick: () => {
        console.log("Navigating to Content");
        // navigate("/content");
      },
    },
    {
      name: "customization",
      label: "Customization",
      icon: images.BrushImg,
      onClick: () => {
        console.log("Navigating to Customization");
        // navigate("/customization");
      },
    },
    {
      name: "notifications",
      label: "Notifications",
      icon: images.NotificationImg,
      onClick: () => {
        console.log("Navigating to Notifications");
        // navigate("/notifications");
      },
    },
    {
      name: "transactions",
      label: "Transactions",
      icon: images.EmptyWalletImg,
      onClick: () => {
        console.log("Navigating to Transactions");
        // navigate("/transactions");
      },
    },
    {
      name: "settings",
      label: "Settings",
      icon: images.SettingImg,
      onClick: () => {
        console.log("Navigating to Settings");
        // navigate("/settings");
      },
    },
    {
      name: "logout",
      label: "Log Out",
      icon: images.LogoutImg,
      onClick: () => {
        console.log("Logging out");
        // navigate("/login");
      },
    },
  ];
}
