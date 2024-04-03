import { useContext, useEffect } from "react";
import { DataProvider } from "../../DataContext/DataContextProvider";

export const InputItem = ({ name, placeholder, textLabel, value, onUpdateProduct, max }) => {
  const { setErrorForm } = useContext(DataProvider);


  useEffect(() => {
    if (value > max) {
      setErrorForm(true)
    }else {
      setErrorForm(false)
    }
  },[value])

  return (
    <div className='w-full flex flex-col gap-1 mb-6 relative'>
      <label
        className='label-input dark:text-05'
      >{textLabel}</label>
      <input
        type="number"
        name={name}
        disabled = {name === "price"}
        className={`input dark:bg-04 dark:outline-none dark:text-white/75 ${value > max ? 'inputValidator' : ''} `}
        placeholder={placeholder}
        onChange={onUpdateProduct}
        value={value}
        min={0}
        
      />
      <p className="textValidator absolute font-semibold -bottom-6">{value > max && `Your max stock is: ${max}`}</p>
    </div>
  );
}