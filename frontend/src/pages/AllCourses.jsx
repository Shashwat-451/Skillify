import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import { FaFilter, FaSearch } from "react-icons/fa"

import CourseCard from "../components/core/Catalog/CourseCard.jsx"

export default function AllCourses() {
  const [allCourses, setAllCourses] = useState([])
  const [filterByTag, setFilterByTag] = useState("All")
  const [search, setSearch] = useState("")
  const [filterOpen, isFilterOpen] = useState(false)
  const [searchOpen, isSearchOpen] = useState(false)
  const filterRef = useRef(null)
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
  const displayCourses = allCourses.filter((course) => {
    return course.courseName.toLowerCase().includes(search.toLowerCase())
  })
  return (
    <>
      <div style={{ position: "relative" }} className="filterByTag">
        <div
          onClick={() => handleFilterClick()}
          className={`${filterOpen ? "filterOpen" : "filterClosed"}`}
        >
          <FaFilter style={{ fontSize: "15px", color: "white" }} />
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
        className={`${filterOpen ? "SearchOpen" : "SearchClosed"}`}
      >
        <FaSearch style={{ fontSize: "15px", color: "white" }} />
      </div>

      {searchOpen && (
        <>
          <div className="search">
            <input
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
          ? displayCourses.map((course) => (
              <div>
                <CourseCard
                  key={course.id}
                  course={course}
                  Height="h-[550px]"
                />
              </div>
            ))
          : displayCourses.map(
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
    </>
  )
}
