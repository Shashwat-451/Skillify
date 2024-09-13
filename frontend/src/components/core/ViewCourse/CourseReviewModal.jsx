import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../Common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ratingChanged = (newRating) => {
    // console.log(newRating)
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto  -white  -opacity-10 backdrop-blur-sm">
      <div className="bg-white  text-black my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400  ">
        {/* Modal Header */}
        <div className="bg-black text-white flex items-center justify-between rounded-t-lg p-5">
          <p className="text-xl font-semibold  -5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl  -5" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="theme text-white p-6">
          <div className=" flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div className="">
              <p className="font-semibold  -5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm  -5">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex w-11/12 flex-col space-y-2">
              <label
                className="text-sm  -5"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
              style={{boxShadow:"0px 8px 16px rgba(0, 0, 0, 0.5)",padding:"5px",borderRadius:"10px"}}
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="text-black form-style resize-x-none min-h-[130px] w-full"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please Add Your Experience
                </span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => setReviewModal(false)}
                className={`flex bg-white text-black cursor-pointer items-center gap-x-2 rounded-md   py-[8px] px-[20px] font-semibold  -900`}
              >
                Cancel
              </button>
              <IconBtn className="bg-white text-black" text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
