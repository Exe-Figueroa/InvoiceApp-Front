import { useContext, useState } from "react";
import { Validator } from "../../utils/regexValidator";
import { DataProvider } from "../../DataContext/DataContextProvider";
const regexValidator = new Validator();

export const InputSection = ({ name, placeholder, onChange, textLabel, value, index, messageValidator, list, messageValidatorList, error }) => {
  const [isValid, setIsvalid] = useState(true);
  const { isCorrect } = useContext(DataProvider);

  const validateInput = (e) => {
    const { value } = e.target;
    onChange(e)
    switch (name) {
      case ('senderStreet'):
        setIsvalid(regexValidator.isStreetAddress(value));
        break;
      case ('clientStreet'):
        setIsvalid(regexValidator.isStreetAddress(value));
        break;

      case ('senderCity'):
        setIsvalid(regexValidator.isCity(value));
        break;
      
      case ('clientCity'):
        setIsvalid(regexValidator.isCity(value));
        break;

      case 'senderPostCode':
        setIsvalid(regexValidator.isPostCode(value));
        break;

      case 'clientPostCode':
        setIsvalid(regexValidator.isPostCode(value));
        break;

      case 'senderCountry':
        setIsvalid(regexValidator.isCountry(value));
        break;

      case 'clientCountry':
      setIsvalid(regexValidator.isCountry(value));
        break;

      case 'clientName':
        setIsvalid(regexValidator.isName(value))
        break

      case 'clientEmail':
        setIsvalid(regexValidator.isEmail(value))
        break

      default:
        break;
    }
  }

  return (
    <div className='w-full flex flex-col gap-1 mb-6 relative'>
      <label
        htmlFor={index ?? name}
        className='label-input dark:text-05'
      >{textLabel}</label>
      <input
        id={index ?? name}
        type="text"
        name={name}
        className={`input dark:outline-none dark:focus:outline-white dark:bg-04 dark:text-white ${(!isValid || error)? "inputValidator" : "" }`}
        placeholder={placeholder}
        onChange={validateInput}
        value={value}
        list={list}
      />
      <p className="textValidator absolute -bottom-6">{!isValid && messageValidator}{error && messageValidatorList}</p>
    </div>
  )
};