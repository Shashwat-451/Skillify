import React, { useEffect, useState } from "react"
// Icons
// import { FaRegStar, FaStar } from "react-icons/fa"
// import ReactStars from "react-rating-stars-component"
import { Link } from "react-router-dom"

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
        <div className="bg-richblack-700 text-white rounded-[25px] allCoursesCard">
          <div className="rounded-lg">
            <img style={{height:"300px",width:"800px"}}
              src={course?.thumbnail}
              alt="course thumbnail"
              className="rounded-[25px]"
            />
          </div>
          <div style={{fontFamily:"georgia"}} className="flex flex-col gap-2 px-2 py-3  lowercontent">
            <p className="text-xl  -5">{course?.courseName}</p>
            <p className="text-sm  ">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>

              <RatingStars Review_Count={avgReviewCount} />
              <span className="">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl  -5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card
