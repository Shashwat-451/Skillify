import React, { useEffect, useRef, useState } from "react"
import axios, { all } from "axios"
import { FaFilter, FaSearch } from "react-icons/fa"
import CustomDropdown from "../components/Common/CustomDropdown.jsx"
import CourseCard from "../components/core/Catalog/CourseCard.jsx"

export default function AllCourses() {


  const [allCourses, setAllCourses] = useState([])
  const [filterByTag, setFilterByTag] = useState("All")
  const [search, setSearch] = useState("")
  const [filterOpen, isFilterOpen] = useState(false)
  const [searchOpen, isSearchOpen] = useState(false)
  const filterRef = useRef(null)
  const searchRef=useRef(null)

  //pagination variables
  const [currentPage,setCurrentPage]=useState(1);
  const recordsPerPage=8;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  
  const displayCourses = allCourses.filter((course) => {
    return course.courseName.toLowerCase().includes(search.toLowerCase())
  })


  const npage=Math.ceil(displayCourses.length/recordsPerPage);
  const numbers=[...Array(npage+1).keys()].slice(1);





  const records=displayCourses.slice(firstIndex,lastIndex);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        isFilterOpen(false)
      }
    }
    

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [filterRef])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        isSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchRef])


  const handleChange = (value) => {
    setFilterByTag(value)
  }
  const handleFilterClick = () => {
    isFilterOpen(!filterOpen)
  }
  const handleSearchClick = () => {
    isSearchOpen(!searchOpen)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
    <CustomDropdown/>
      <div style={{ position: "relative" ,marginTop:"-80px"}} className="filterByTag">
        <div
          onClick={() => handleFilterClick()}
          className={`${filterOpen ? "filterOpen" : "filterClosed"}`}
        >
          <FaFilter style={{ fontSize: "20px", color: "white" }} />
        </div>

        {filterOpen && (
          <div ref={filterRef} className="coursesDiv">
            <div
              onClick={() => handleChange("All")}
              className={`${
                filterByTag === "All"
                  ? "theme text-white"
                  : "bg-white text-black"
              }`}
            >
              All Courses
            </div>
            <div
              onClick={() => handleChange("Web Development")}
              className={`${
                filterByTag === "Web Development"
                  ? "theme text-white"
                  : "bg-white text-black"
              }`}
            >
              Web Development
            </div>
            <div
              onClick={() => handleChange("Blockchain")}
              className={`${
                filterByTag === "Blockchain"
                  ? "theme text-white"
                  : "bg-white text-black"
              }`}
            >
              Blockchain
            </div>
            <div
              onClick={() => handleChange("Machine Learning")}
              className={`${
                filterByTag === "Machine Learning"
                  ? "theme text-white"
                  : "bg-white text-black"
              }`}
            >
              Machine Learning
            </div>
            <div
              onClick={() => handleChange("Data Structures And Algorithms")}
              className={`${
                filterByTag === "Data Structures And Algorithms"
                  ? "theme text-white"
                  : "bg-white text-black"
              }`}
            >
              DSA
            </div>
            <div
              onClick={() => handleChange("Cloud Computing")}
              className={`${
                filterByTag === "Cloud Computing"
                  ? "theme text-white"
                  : "bg-white text-black"
              }`}
            >
              Cloud Computing
            </div>
          </div>
        )}
      </div>

      <div
        onClick={() => handleSearchClick()}
        className="SearchClosed"
      >
        <FaSearch style={{ fontSize: "20px", color: "white" }} />
      </div>

      {searchOpen && (
        <>
          <div ref={searchRef} className="search">
            <input
            style={{height:"50px",outline:"none"}}
              className=" ml-3 w-[170px]  rounded-[18px] p-1"
              name="search"
              value={search}
              onChange={handleSearch}
              placeholder="Search Course"
            />
          </div>
        </>
      )}

      <div className="allCoursesContainer">
        {filterByTag === "All" && Array.isArray(allCourses)
          ? records.map((course) => (
              <div>
                <CourseCard
                  key={course.id}
                  course={course}
                  Height="h-[550px]"
                />
              </div>
            ))
          : allCourses.map(
              (course) =>
                course.category.name === filterByTag && (
                  <div>
                    <CourseCard
                      key={course.id}
                      course={course}
                      Height="h-[550px]"
                    />
                  </div>
                )
            )}
      </div>

      <div className="pagination-container" >
        <nav>
          <ul className="pagination">
             <l1 style={{padding:"10px",color:"black"}} className='page-item prev'>
              <a href="#" className="page-link font-bold" onClick={()=>prePage()}>Prev</a>
             </l1>
             {
              numbers.map((num,i)=>(
                <li className={`page-item`} key={i}>
                  <div className={`linkk ${currentPage===num?'theme text-white':''}`}>
                  <a href="#"  onClick={()=>changeCPage(num)}>{num}</a>
                  </div>
                  
                </li>
              ))
             }
              <l1 style={{padding:"10px",color:"black"}} className='page-item next'>
              <a href="#" className="page-link  font-bold" onClick={()=>nextPage()}>Next</a>
             </l1>
          </ul>
        </nav>
      </div>
    </>
  )
  function nextPage(){
    if(currentPage!==npage){
      setCurrentPage(currentPage+1);
     }
  }
  function prePage(){
   if(currentPage!==1){
    setCurrentPage(currentPage-1);
   }
  }
  function changeCPage(id){
   setCurrentPage(id);
  }

}
