import { useState } from "react";

export function PasswordVisibility() {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return { isPasswordVisible, togglePasswordVisibility };
}
