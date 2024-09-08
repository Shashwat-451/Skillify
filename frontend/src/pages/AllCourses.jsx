import React, { useEffect, useState } from "react"
import axios from "axios"

import CourseCard from "../components/core/Catalog/CourseCard.jsx"



export default function AllCourses() {
  const [allCourses, setAllCourses] = useState([])
  const [filterByTag,setFilterByTag]=useState('All')
  const[search,setSearch]=useState('')

  useEffect(() => {
    
    axios({
      url: "http://localhost:4000/api/v1/course/getAllCourses",
      method: "GET",
    })
      .then((response) => {
        console.log("all courses", response.data) // Log the response data
        setAllCourses(response.data.data) // Ensure this is an array
        
      })
      .catch((error) => {
        console.error("Error fetching courses:", error)
      })
  }, [])
  
   const handleChange=(event)=>{
       setFilterByTag(event.target.value);
   }

   const handleSearch=(event)=>{
    setSearch(event.target.value);
   }
   const displayCourses=allCourses.filter((course)=>{
    return course.courseName.toLowerCase().includes(search.toLowerCase())
 })
  return (
    <>
    <div className="mt-5 ml-2">
    <select className="theme text-white border-none rounded-[18px] p-1 w-[170px]" onChange={handleChange}>
            <option  value={"All"}>Filter</option>
            <option  value={"Web Development"}>Web Development</option>
            <option value={"Blockchain"}>Blockchain</option>
            <option value={"Machine Learning"}>Machine Learning</option>
            <option value={"Data Structures And Algorithms"}>DSA</option>
            <option value={"Cloud Computing"}>Cloud Computing</option>
        </select>

        <input
         style={{border:"none",outline:"none",color:"white"}}
        className=" w-[170px] ml-3 theme place text-white rounded-[18px] p-1" name="search" value={search} onChange={handleSearch} placeholder="Search Course"/>

    </div>
     
            {console.log(filterByTag)}
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",marginTop:"50px"}}>
        
       
    
      {filterByTag==='All' && Array.isArray(allCourses) ? (
        displayCourses.map((course) => (
            <div style={{width:"500px",height:"500px",margin:"10px"}}>
          <CourseCard key={course.id} course={course} Height="h-[550px]" />
          </div>
        ))
      ) :
      (
        displayCourses.map((course) => ( course.category.name===filterByTag &&
            <div style={{width:"500px",height:"500px",margin:"10px"}}>
          <CourseCard key={course.id} course={course} Height="h-[550px]" />
          </div>
        ))
      )
      }
      {/* {
        filterByTag!=='' && Array.isArray(displayCourses) ? (
            displayCourses.map((course) => ( course.category.name===filterByTag &&
                <div style={{width:"500px",height:"500px",margin:"10px"}}>
              <CourseCard key={course.id} course={course} Height="h-[550px]" />
              </div>
            ))
          ) : (
            <p>No courses available</p>
          )
      } */}
   
    </div>
    </>
    
  )
}
