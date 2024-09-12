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
        <div style={{fontFamily:"georgia"}} className="bg-richblack-700 text-white rounded">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div style={{height:"160px"}} className="flex flex-col gap-2 px-3 py-3">
            <p style={{height:"36px"}} className="text-xl">{course?.courseName}</p>
            <p className="text-sm  ">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              {/* <ReactStars
                count={5}
                value={avgReviewCount || 0}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaRegStar />}
                fullIcon={<FaStar />}
              /> */}
              <RatingStars Review_Count={avgReviewCount} />
              <span className="">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <div className="flex">
            <FaRupeeSign />
            <p style={{marginTop:"-10px",marginLeft:"5px"}} className="text-xl">{course?.price}</p>
            </div>
            
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card
