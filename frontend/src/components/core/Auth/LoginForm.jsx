import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"


function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [recaptchaValue, setRecaptchaValue] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  // const SITE_KEY = process.env.SITE_KEY;
  const SITE_KEY = "6LdfQToqAAAAAD5wXlMaP2kQcX1j_nF9B3qtWGbb"
  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate, recaptchaValue))
    //captchaRef.current.reset()
  }

  const handleChange = (value) => {
    console.log(value)
    setRecaptchaValue(value)
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full ">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="form-style w-full p-2 border-rounded rounded-[18px] text-black "
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
       
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="form-style w-full !pr-10 p-2 rounded-[18px] text-black "
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        > 
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-white">
            Forgot Password
          </p>
        </Link>
      </label>
      <div className="form-group">
        <ReCAPTCHA
          sitekey={SITE_KEY}
          onChange={handleChange}
          // ref={captchaRef}
        />
      </div>
      <button
        type="submit"
        className="mt-3 rounded-[18px]   py-[8px] px-[12px] font-medium  text-black bg-white"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
