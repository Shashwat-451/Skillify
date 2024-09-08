import React, { useState } from "react"
import { IoMdSettings } from "react-icons/io"
import { useDispatch,useSelector } from "react-redux"
import { setTheme } from '../../slices/themeSlice';

const CustomDropdown2 = () => {
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.theme);

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (value) => {
    dispatch(setTheme(value));
    setIsOpen(false)
  }

  return (
    <div  className="dropdown theme ">
      <button onClick={toggleDropdown} className="dropbtn2">
      </button>
      {isOpen && (
        <div className="dropdown-content theme">
          
        </div>
      )}
    </div>
  )
}

export default CustomDropdown2
