import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join the millions learning to code with Skillify for free"
      description1="Build skills for today, tomorrow, and beyond."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup
