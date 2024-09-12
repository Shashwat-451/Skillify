import React, { useEffect, useState } from "react"
// Icons
// import { FaRegStar, FaStar } from "react-icons/fa"
// import ReactStars from "react-rating-stars-component"
import { Link } from "react-router-dom"
import { FaRupeeSign } from "react-icons/fa";
import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../Common/RatingStars"

function Course_Card({ course, Height }) {
  // const avgReviewCount = GetAvgRating(course.ratingAndReviews)
  // console.log(course.ratingAndReviews)
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])
  // console.log("count............", avgReviewCount)

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className=" rounded-[25px] allCoursesCards">
          <div className="allCoursesCardImage ">
            <img 
            style={{borderRadius:"25px 25px 0px 0px",height:"200px"}}
              src={course?.thumbnail}
              alt="course thumbnail"
              className=""
            />
          </div>
          <div className="flex flex-col allCoursesLower">
            <p style={{fontSize:"18px",fontWeight:"bold",height:"100px"}} className="">{course?.courseName}</p>
            <p style={{fontFamily:"sans-serif",fontWeight:"bold"}} className="text-sm ">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex gap-2">
              <span style={{fontWeight:"bold"}} className="">{avgReviewCount || 0}</span>

              <RatingStars Review_Count={avgReviewCount} />
              <span style={{color:"grey"}} className="">
                ({course?.ratingAndReviews?.length})
              </span>
            </div>
            <div style={{display:"flex",marginTop:"8px"}}>
            <FaRupeeSign style={{}}/> 
            <p style={{marginTop:"-5px",fontFamily:"sans-serif",fontSize:"18px",fontWeight:"bold"}}> {course?.price}</p>
            </div>
            
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card
