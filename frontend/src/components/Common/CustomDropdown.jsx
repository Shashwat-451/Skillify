import React, { useState } from "react"
import { IoMdSettings } from "react-icons/io"
import { useDispatch } from "react-redux"

import { setHeader, setTheme } from "../../slices/themeSlice"

const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()


  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const handleHeaderChange = (value) => {
    console.log("Button Clicked", value)
    dispatch(setHeader(value))
    setIsOpen(false)
  }
  const handleOptionClick = (value) => {
    dispatch(setTheme(value))
    setIsOpen(false)
  }

  return (
    <div
      style={{ top: "170px", left: "1px", width:"40px"}}
      className="dropdown theme rounded-full"
    >
      <button onClick={toggleDropdown} className="dropbtn">
        <IoMdSettings />
      </button>
      {isOpen && (
        <div className="side-container ml-4 ">
          <div className="dropdown-content flex w-[200px] p-3 bg-white">
            <p style={{backgroundColor:"black",color:"white",textAlign:"center"}}>THEME</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: "green",
                }}
                onClick={() => handleOptionClick("green")}
              ></div>
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: "#FF4500",
                }}
                onClick={() => handleOptionClick("orange")}
              ></div>
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: "#00BFFF",
                }}
                onClick={() => handleOptionClick("blue")}
              ></div>
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: "#7924b5",
                }}
                onClick={() => handleOptionClick("purple")}
              ></div>
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: "black",
                }}
                onClick={() => handleOptionClick("dark")}
              ></div>
            </div>
            <p style={{backgroundColor:"black",color:"white",textAlign:"center"}}>HEADER</p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                color: "black",
              }}
            >
              <button style={{backgroundColor:"lightgrey",padding:"10px"}} onClick={()=>handleHeaderChange("fixed")}>Fixed</button>
              <button  style={{backgroundColor:"lightgrey",padding:"10px"}} onClick={()=>handleHeaderChange("static")}>Static</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomDropdown
