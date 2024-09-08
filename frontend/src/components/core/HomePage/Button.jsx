import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div style={{color:"white"}}
        className={`text-center text-[13px] theme sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] `}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
