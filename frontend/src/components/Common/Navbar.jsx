import { useEffect, useState, useRef } from "react"
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
  const [isOpen, setIsOpen] = useState(false)
  const currentTheme = useSelector((state) => state.theme.theme)
  const positionStyle = useSelector((state) => state.theme.header)
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  console.log("position style", positionStyle)

  useEffect(() => {
    document.body.className = currentTheme
  }, [currentTheme])
  useEffect(() => {
    ; (async () => {
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
  const handleClick = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div style={{ fontFamily: "georgia", marginBottom: "50px" }}
      className={` mt-5 flex h-14 items-center justify-center border-b-1 border-grey-10 ${location.pathname !== "/" ? " " : ""
        } transition-all duration-200`}
    >
      <div style={{ position: positionStyle, backgroundColor: "white", zIndex: "200", width: "100%", height: "90px" }} className="flex  items-center justify-between">

        <Link style={{ fontWeight: "bold", fontSize: "35px", marginLeft: "20px" }} to="/"><HighlightText text={"Skillify"} /></Link>

        <div onClick={() => handleClick()} className="md:hidden" style={{ position: "fixed",right:"0px", zIndex: "200" }}>
          <button  >
            <AiOutlineMenu style={{ marginRight: "4px", padding: "0px" }} fontSize={24} fill="#AFB2BF" />
          </button>
        </div>



        <nav className=" navbarurl hidden md:block">
          <ul className="flex gap-x-6 ">

            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative  flex cursor-pointer items-center  ${matchRoute("/catalog/:catalogName")
                          ? "theme-text font-bold "
                          : "theme-grey font-bold"
                        }`}
                    >
                      <p className="p-2 m-2 text-grey">{link.title}</p>
                      <BsChevronDown />
                      <div style={{ boxShadow: "0px 8px 16px rgba(0, 0, 0, 3.5)" }} className="bg-white text-black  invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg  opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 hov absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded   "></div>
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
                                  className="-transparent  hov  rounded-lg py-2  "
                                  key={i}
                                >
                                  <p className="px-2" style={{ padding: "5px" }}>{subLink.name}</p>
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
                    <p style={{ borderRadius: "10px" }}
                      className={`${matchRoute(link?.path)
                          ? "theme text-white font-bold p-2 m-2"
                          : "theme-grey font-bold p-2 m-2"
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
              <div style={{ height: "40px", width: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }} className="theme">
                <AiOutlineShoppingCart className="text-white text-2xl" />
              </div>

              {totalItems > 0 && (
                <span style={{ color: "white" }} className="theme absolute -top-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full   text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className=" text-white rounded-[6px] border theme  px-[8px]  py-[4px] ">
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




        {

          isOpen && <div ref={dropdownRef} style={{ position: "relative", marginTop: "370px", marginRight: "8px" }}>

            <nav className=" navbarurl md:hidden p-1">
              <ul className=" gap-x-6 ">

                {NavbarLinks.map((link, index) => (
                  <li key={index}>
                    {link.title === "Catalog" ? (
                      <>
                        <div
                          className={`group relative  flex cursor-pointer items-center  ${matchRoute("/catalog/:catalogName")
                              ? "theme-text font-bold "
                              : "theme-grey font-bold"
                            }`}
                        >
                          <p className="p-2 m-2 text-grey">{link.title}</p>
                          <BsChevronDown />
                          <div style={{ boxShadow: "0px 8px 16px rgba(0, 0, 0, 3.5)" }} className="bg-white text-black  invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg  opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                            <div className="group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 hov absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded   "></div>
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
                                      className="-transparent  hov  rounded-lg py-2  "
                                      key={i}
                                    >
                                      <p className="px-2" style={{ padding: "5px" }}>{subLink.name}</p>
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
                        <p style={{ borderRadius: "10px" }}
                          className={`${matchRoute(link?.path)
                              ? "theme text-white font-bold p-2 m-2"
                              : "theme-grey font-bold p-2 m-2"
                            }`}
                        >
                          {link.title}
                        </p>
                      </Link>
                    )}
                  </li>
                ))}

             <div className=" items-center gap-x-4 ">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <div style={{ height: "40px", width: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }} className="theme">
                <AiOutlineShoppingCart className="text-white text-2xl" />
              </div>

              {totalItems > 0 && (
                <span style={{ color: "white" }} className="theme absolute -top-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full   text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          {token === null && (
            <Link to="/login">
              <button className="text-center rounded-[6px] border text-grey  px-[4px]  py-[2px] m-1 w-[90px]">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              
              <button className="text-center text-grey rounded-[6px] border  px-[4px]  py-[2px] m-1 w-[90px] ">
                Sign up
              </button>
            </Link>
          )}

          </div>
          

      
        </div>


              </ul>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} className="flex">
              {token !== null && <ProfileDropdown />}
              </div>
              
            </nav>
            

          </div>
        }
      </div>



    </div>
  )
}

export default Navbar
