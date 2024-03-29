import {  useContext, useState } from "react";
import { BtnLogin } from "./BtnLogin"
import { FormLoginEmail } from "./FomrLoginEmail"
import { FormLoginPassword } from "./FomrLoginPassword"
import { DataProvider } from "../../DataContext/DataContextProvider";

export const LoginForm = () => {
  const [isValid, setIsValid] = useState(true);
  const { userData, login } = useContext(DataProvider);

  return (
  <>
  <section className="max-w-[500px] m-auto pt-[120px]">
    <div className="w-full bg-white py-8 px-10  rounded-xl hover:shadow-md dark:bg-03" >
      <h1 className="text-black font-bold text-spartanL  dark:text-07">Sing In</h1>
      <form autoComplete="email"  action="#" 
      onSubmit={(e) => {
        e.preventDefault(),
        login()
      }}>
        <FormLoginEmail isValid={isValid} setIsValid={setIsValid} value={userData?.email || ''}/>
        <FormLoginPassword value={userData?.password || ''} />
        <BtnLogin/>
      </form>
    </div>
    
  </section>
  </>
  )
}