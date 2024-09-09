import React, { useState,useRef,useEffect } from "react"
import { IoMdSettings } from "react-icons/io"
import { useDispatch } from "react-redux"

import { setHeader, setTheme } from "../../slices/themeSlice"
import { TiTick } from "react-icons/ti";
const CustomDropdown = () => {

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);
    
  const [isOpen, setIsOpen] = useState(false)
  const [header,setHeaderr]=useState("fixed")
  const [theme,setThemee]=useState("fixed")
  const dispatch = useDispatch()
  
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setIsOpen(false);
    }
    };

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const handleHeaderChange = (value) => {
    console.log("Button Clicked", value)
    setHeaderr(value)
    dispatch(setHeader(value))
    
  }
  const handleOptionClick = (value) => {
    setThemee(value);
    dispatch(setTheme(value))
    
  }

  return (
    <div ref={dropdownRef}
      style={{ width:"40x"}}
      className="dropdown theme"
    >
      <button onClick={toggleDropdown} className="dropbtn">
        <IoMdSettings className="rot" />
      </button>
      {isOpen && (
        <div  className="side-container ml-4 ">
          <div className="border rounded-lg dropdown-content flex w-[250px] p-3 bg-white">
          <p style={{color:"black",fontFamily:"georgia",fontWeight:"bold",fontSize:"12px"}} >THEME</p>
            <div style={{display: "flex", flexWrap: "wrap", gap: "5px" ,backgroundColor:"#F9F9FD"}}>
              <div
                style={{
                  height: "30px",
                  width: "30px",
                  backgroundColor: "green",
                  borderRadius:"5px",
                  position:"relative" 
                }}
                onClick={() => handleOptionClick("green")}
              >{theme==="green" && <TiTick style={{position:"absolute",fontSize:"30px",bottom:"2px",right:"2px"}} />}</div>
              <div
                style={{
                  height: "30px",
                  width: "30px",
                  backgroundColor: "#FF4500",
                  borderRadius:"5px",
                  position:"relative" 
                }}
                onClick={() => handleOptionClick("orange")}
              >{theme==="orange" && <TiTick style={{position:"absolute",fontSize:"30px",bottom:"2px",right:"2px"}} />}</div>
              <div
                style={{
                  height: "30px",
                  width: "30px",
                  backgroundColor: "#00BFFF",
                  borderRadius:"5px",
                   position:"relative" 
                }}
                onClick={() => handleOptionClick("blue")}
              >{theme==="blue" && <TiTick style={{position:"absolute",fontSize:"30px",bottom:"2px",right:"2px"}} />}</div>
              <div
                style={{
                  height: "30px",
                  width: "30px",
                  backgroundColor: "#7924b5",
                  borderRadius:"5px",
                   position:"relative" 
                }}
                onClick={() => handleOptionClick("purple")}
              >{theme==="purple" && <TiTick style={{position:"absolute",fontSize:"30px",bottom:"2px",right:"2px"}} />}</div>
              <div
                style={{
                  height: "30px",
                  width: "30px",
                  backgroundColor: "black",
                  borderRadius:"5px",
                   position:"relative" 
                }}
                onClick={() => handleOptionClick("dark")}
              >{theme==="dark" && <TiTick style={{position:"absolute",fontSize:"30px",bottom:"2px",right:"2px"}} />}</div>
            </div>
            <p style={{color:"black",fontFamily:"georgia",fontWeight:"bold",fontSize:"12px"}} >HEADER</p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                color: "black",
                backgroundColor:"#F9F9FD",
                alignItems:"center",
                justifyContent:"center"
              }}
            >
              <button className={`${header==="fixed"?"theme text-white":"text-black bg-gray "}`} style={{padding:"8px",fontFamily:"georgia",fontWeight:"bold",fontSize:"13px",borderRadius:"10px"}} onClick={()=>handleHeaderChange("fixed")}>Fixed</button>
              <button className={`${header==="static"?"theme  text-white":"text-black bg-gray"}`} style={{padding:"8px",fontFamily:"georgia",fontWeight:"bold",fontSize:"13px",borderRadius:"10px"}} onClick={()=>handleHeaderChange("static")}>Static</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomDropdown
