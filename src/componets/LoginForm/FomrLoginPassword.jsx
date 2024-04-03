import { useContext, useState } from "react";
import { DataProvider } from "../../DataContext/DataContextProvider";


export const FormLoginPassword = ({value}) => {
  const [ isPass, setIsPass ] = useState(false);
  const { userData, setUserData, error } = useContext(DataProvider)
  
  const validateInput = (e)=>{
    const {value} = e.target;
    setUserData({...userData, password: value})
    
    if (value.length === 0 ) {
      setIsPass(false)
    } else if ( value.length < 8) {
      setIsPass(true)
    } else if (value.length > 20) {
      setIsPass(true)
    } else {
      setIsPass(false)
    }

  }
  
  return (
    <>
    <div className="mb-11">
      <input 
      type="password" 
      placeholder="Password"
      name="passwordLogin" 
      required
      autoComplete="email"
      id="passwordLogin" 
      onChange={validateInput}
      value={value}
      className={`input dark:outline-none  dark:focus:outline-white dark:bg-04 dark:text-white ${isPass || error.error === 'Email incorrect o Passport incorrect' ? "inputValidator" : "" } `}/>
      <p className="textValidator">{isPass && 'Your password must have a length from 8 - 20 digits'}</p>
    </div>
    </>
  )
}