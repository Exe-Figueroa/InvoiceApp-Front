import { LoginForm } from "../componets/LoginForm/LoginForm"
import avatar from "../assets/favicon-32x32.png"
import { NavbarLogin } from "../componets/LoginForm/NavbarLogin/NavbarLogin"

export const Login = () => {
  return (
  <>
    <NavbarLogin></NavbarLogin> 
    <LoginForm/>
  </>
  )
}