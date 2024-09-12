import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div style={{fontFamily:"georgia",fontWeight:"200px"}} className=" text-xl md:text-4xl  mx-auto py-5 pb-20 text-center  ">
        We are passionate about revolutionizing the way we learn. Our
        innovative platform <HighlightText text={"combines technology"} />,{" "}
        <span style={{fontFamily:"georgia",fontWeight:"200px"}}  >expertise</span>
        , and community to create an
        <span style={{fontFamily:"georgia",fontWeight:"200px"}}>
            {" "}
            unparalleled educational
        experience.
        </span>  
    </div>
  )
}

export default Quote