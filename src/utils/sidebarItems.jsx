import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "@hooks";
import * as images from "@assets";
import { Toast } from "@utils";
import { TOAST } from "@constants";

export function SidebarItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return [
    {
      name: "home",
      label: "Home",
      icon: images.HomeImg,
      onClick: () => {
        console.log("Navigating to Home");
        navigate("/dashboard");
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
        navigate("/dashboard/settings");
      },
    },
    {
      name: "logout",
      label: "Log Out",
      icon: images.LogoutImg,
      onClick: () => {
        dispatch(authActions.logout());
        navigate("/");
        Toast(TOAST.SUCCESS, "Logged out successfully");
      },
    },
  ];
}
