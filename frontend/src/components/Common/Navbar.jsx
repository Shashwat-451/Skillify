import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"
import HighlightText from "../core/HomePage/HighlightText"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"


function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()
  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  
  const currentTheme = useSelector((state) => state.theme.theme)
  const positionStyle = useSelector((state) => state.theme.header)
 console.log("position style",positionStyle)
  useEffect(() => {
    document.body.className = currentTheme
  }, [currentTheme])
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        console.log(res.data.data)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div  style={{fontFamily:"georgia" }}
      className={`flex h-14 items-center justify-center border-b-1 border-grey-10 ${
        location.pathname !== "/" ? " " : ""
      } transition-all duration-200`}
    >
      <div style={{position:positionStyle,backgroundColor:"white",zIndex:"2",marginTop:"-20px",paddingTop:"30px",width:"100%",height:"90px"}} className="flex  items-center justify-between">
        
         <Link style={{fontWeight:"bold",fontSize:"25px",marginLeft:"20px"}} to="/"><HighlightText text={"Skillify"} /></Link>

        <nav className=" hidden md:block">
          <ul className="flex gap-x-6">
          
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative hov flex cursor-pointer items-center  ${
                        matchRoute("/catalog/:catalogName")
                          ? "theme-text font-bold"
                          : "theme-grey font-bold"
                      }`}
                    >
                      <p >{link.title}</p>
                      <BsChevronDown />
                      <div  className="theme hov invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col    rounded-lg   text-white opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded   "></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              // ?.filter(
                              //   (subLink) => subLink?.courses?.length > 0
                              // )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="-transparent  hover: 0 rounded-lg py-4  pl-4"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "theme-text font-bold"
                          : "theme-grey font-bold"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="-100  text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full   text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          
          {token === null && (
            <Link to="/login">
              <button style={{fontFamily:"georgia"}} className=" text-white rounded-[6px] border theme  px-[8px]  py-[4px] mr-2">
                Log in
              </button>
            </Link>
          )}
           
          {token === null && (
            <Link to="/signup">
             <button className=" text-white rounded-[6px] border theme  px-[8px]  py-[4px] mr-2 ">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
        
      </div>
    </div>
  )
}

export default Navbar
