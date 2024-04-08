import { LoginForm } from "../componets/LoginForm/LoginForm"
import { NavbarLogin } from "../componets/LoginForm/NavbarLogin/NavbarLogin"
import { useContext, useEffect } from "react"
import { DataProvider } from "../DataContext/DataContextProvider"

export const Login = () => {
  const {setUserAuth} = useContext(DataProvider)
  useEffect(()=> {
    setUserAuth({token: null})
  },[])
  return (
  <>
    <NavbarLogin></NavbarLogin> 
    <LoginForm/>
  </>
  )
}