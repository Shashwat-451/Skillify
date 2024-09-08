import React from "react";

const HighlightText = ({text}) => {
  return (
    <span  className="theme-text -gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]    -clip-text font-bold">
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;
