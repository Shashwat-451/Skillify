import React from "react"
import ContactDetails from "../components/core/ContactUsPage/ContactDetails"
import ContactForm from "../components/core/ContactUsPage/ContactForm"
import CustomDropdown from "../components/Common/CustomDropdown.jsx"
const Contact = () => {
  return (
    <div>
      <CustomDropdown/>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
     
      {/* <Footer /> */}
    </div>
  )
}

export default Contact
