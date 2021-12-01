import React from "react";

export default function AlertBox({ children, type }) {
  const alertStyle = () => {
    if (type === "success") {
      return style.success;
    } else {
      return style.error;
    }
  };

  return <div style={alertStyle()}>{children}</div>;
}

//success and error

const style = {
  success: {
    color: "#4F8A10",
    backgroundColor: "#DFF2BF",
    borderRadius: 2,
    border: "1px solid green",
    fontSize: "12px",
  },
  error: {
    color: "red",
    backgroundColor: "#FFBABA",
    borderRadius: 2,
    border: "1px solid red",
    fontSize: "12px",
  },
};
