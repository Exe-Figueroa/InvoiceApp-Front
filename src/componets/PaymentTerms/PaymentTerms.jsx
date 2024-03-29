import { useState, useContext } from 'react';
import { DataProvider } from '../../DataContext/DataContextProvider';

import './PaymentTerms.css';
export const PaimentTerms = () => {
  const [paymentTerm, setPaymentTerm] = useState(1);
  const {setPaymentValue, formData} = useContext(DataProvider);
  
  const valueChange = (e) => {
    const paymentValue = Number(e.target.value);
    setPaymentTerm(paymentValue);
    setPaymentValue(paymentValue);
  }
  return (
    <div className="relative mb-6 px-6 ">
      <p className='label-input dark:text-05'>Payment Terms</p>
      <div className='absolute top-1/2 left-10 bg-white w-2/3 dark:bg-04 dark:text-05'>{`Net ${paymentTerm} Days`}</div>
      <select
        className='input bg-arrowDown pr-5 dark:outline-none dark:bg-04 dark:text-05'
        name="paymentTerms"
        id="paymentTerms"
        onChange={valueChange}
        value={formData?.paymentTerm || ''}
      >
        <option value="1">1</option>
        <option value="15">15</option>
        <option value="30">30</option>
      </select>
    </div>
  )
}