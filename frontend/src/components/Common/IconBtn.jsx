export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={` ${text==="Upload"?"bg-white text-black":"theme text-white"} flex items-center   cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold  -900 ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && " text-white"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  )
}
