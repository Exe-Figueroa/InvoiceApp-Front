import { useContext, useState } from "react";
import { DataProvider } from "../../DataContext/DataContextProvider";

export const DateInput = () => {
  const [parsedDate, setParsedDate] = useState('Select Date');
  const { setPaymentDue, formData } = useContext(DataProvider);

  const dateChange = (e) => {
    const { value } = e.target;
    const event = new Date(e.target.value);
    const coso = event.toUTCString();
    const [_, day, month, year] = coso.split(' ');
    value ? setParsedDate(`${day} ${month} ${year}`) : setParsedDate('Select Date');
    setPaymentDue(value);
  }
  const seeCalendar = () => {
    const createdAt = document.getElementById('createdAt');
    console.log(createdAt);
    createdAt.click();
  }
  return (
    <div className="relative mb-6 px-6 ">
      <div className='absolute top-1/2 left-10 bg-white w-2/3 dark:bg-04 dark:text-05 '>{parsedDate}</div>
      <label htmlFor="createdAt" className='label-input dark:text-05'
        onClick={seeCalendar}
      >Payment due</label>
      <input
        type="date"
        id='createdAt'
        name='createdAt'
        className='input dark:bg-04 dark:outline-none dark:text-06 dark:[color-scheme:dark]'
        onChange={(e) => {
          dateChange(e);
        }}
        value={formData?.paymentDue || ''}
      />
    </div>
  )
}