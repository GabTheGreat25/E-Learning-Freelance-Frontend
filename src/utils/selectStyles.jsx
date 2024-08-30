export function SelectStyles() {
  return {
    placeholder: (provided) => ({
      ...provided,
      color: "#BFBFBF",
      position: "relative",
      right: "10px",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      "&:hover": {
        border: "none",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#FAF7F7",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#242426",
      color: "#FAF7F7",
      position: "absolute",
      right: "1px",
      width: "calc(100% - 2px)",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#99C8FF" : "transparent",
      color: state.isFocused ? "#242426" : "#FAF7F7",
      "&:hover": {
        backgroundColor: "#99C8FF",
        color: "#242426",
      },
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: "#FAF7F7",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#BFBFBF",
      transition: "none",
      "&:hover": {
        color: "#BFBFBF",
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };
}
