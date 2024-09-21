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
        navigate("/dashboard");
      },
    },
    {
      name: "content",
      label: "Content",
      icon: images.TaskSquareImg,
      onClick: () => {
        navigate("/dashboard/videos");
      },
    },
    {
      name: "customization",
      label: "Customization",
      icon: images.BrushImg,
      onClick: () => {
        navigate("/dashboard/customization");
      },
    },
    {
      name: "notifications",
      label: "Notifications",
      icon: images.NotificationImg,
      onClick: () => {
        navigate("/dashboard/activities");
      },
    },
    {
      name: "transactions",
      label: "Transactions",
      icon: images.EmptyWalletImg,
      onClick: () => {
        navigate("/dashboard/transactions");
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
