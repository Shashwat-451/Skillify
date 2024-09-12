import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg";
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))
  

  if (!user) return null

  return (
    <button className="relative " onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        {/* <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover theme"
        /> */}
        <CgProfile onClick={()=>setOpen(!open)} className="theme" style={{fontSize:"35px",color:"white",borderRadius:"50%",marginRight:"30px"}}/>
     
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{boxShadow:"0px 8px 16px 0px rgba(0, 0, 0, 2.2)"}}
          className="hover absolute top-[128%] right-3 z-[1000] divide-y-[1px] divide-black overflow-hidden rounded-md  "
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm  -100 hover:   hover: -25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm  -100 hover:   hover: -25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}
