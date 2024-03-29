
import { useContext } from "react";
import { Validator } from "../../utils/regexValidator";
import { DataProvider } from "../../DataContext/DataContextProvider";


const regexValidator = new Validator();

// Email incorrect
export const FormLoginEmail = ({isValid, setIsValid, value }) => {
  const { userData, setUserData, error } = useContext(DataProvider)

  const validateInput = (e)=>{
    const {value} = e.target;
    setUserData({...userData, email: value})
    
    if ( value.length === 0 ) {
      setIsValid(true)
    } else {
      setIsValid(regexValidator.isEmail(value)) 
    }
  }

  return (
    <>
    <div className="mb-10">
      <input 
      type="email" 
      name="emailLogin" 
      placeholder="Email"
      id="emailLogin" 
      required
      value={value}
      autoComplete="email"
      onChange={validateInput}
      className={`input dark:outline-none transition duration-200 dark:focus:outline-white dark:bg-04 dark:text-white ${!isValid || error.error === 'Email incorrect' ? "inputValidator" : "" } `}/>
      <p className="textValidator">{!isValid && 'Please enter a valid email.'}{error.error === 'Email incorrect' && "Sorry, we can't find an user with this email address"}</p>
      
    </div>
    
    </>

  )
}