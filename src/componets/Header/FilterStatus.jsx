import { useContext, useEffect, useState } from "react";
import { DataProvider } from "../../DataContext/DataContextProvider";

export const FilterStatus = ({setSearchValueFilter}) => {
  const {data, setRequest}=useContext(DataProvider)
  
  const openSelect = () => {
    const selectOptions = document.querySelector("#InvoicesFilter");   
    const svgRowSelect = document.querySelector("#svgRowSelect");   
    if (selectOptions.classList.contains("opacity-0")) {
      selectOptions.classList.remove("opacity-0")
      svgRowSelect.classList.add("rotate-180")
    } else {
      selectOptions.classList.add("opacity-0")
      svgRowSelect.classList.remove("rotate-180")
    }
  } 
  
  const [searchValue, setSearchValue] = useState({
    paid: false,
    pending: false,
    draft: false,
  });

  const onSearchValueChange = (event) => {

    const isChecked = event.target.checked;
    const status = event.target.value;
  
    setSearchValue({
      ...searchValue,
      [status]: isChecked,
    });
  
    if (isChecked) {
      setSearchValueFilter((prevFilter) => [
        ...prevFilter,
        ...data.filter((item) => item.status === status)
      ]);
    } else {
      setSearchValueFilter((prevFilter) =>
        prevFilter.filter((item) => item.status !== status)
      );
    }

  };


  const isActivePaid = searchValue.paid === true;
  const isActivePending = searchValue.pending === true;
  const isActiveDraft = searchValue.draft === true;
  
  return (
    <>
    <div className="relative hover:text-gray-700">
    <div className="flex justify-between items-center font-bold w-20 px-3 pb-1 cursor-pointer md:w-36 " onClick={openSelect}>
        <h2 className="md:flex hidden dark:text-white">Filter by status</h2>
        <h2 className="md:hidden dark:text-white">Filter</h2>
        <svg className="text-black transition-all duration-300"  width="11" height="7" xmlns="http://www.w3.org/2000/svg" id="svgRowSelect">
          <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
        </svg>
      </div>
      <form 
      className="absolute right-1 bg-white text-black font-semibold px-5 mt-1 opacity-0 w-32 h-20 overflow-hidden transition-all shadow-lg rounded-lg py-2  focus:outline-none md:w-36 dark:bg-04 dark:text-white"
      name="Filter" 
      id="InvoicesFilter" 
      action="#" 
      onChange={onSearchValueChange}
      >
          
            <input className={` ${ isActivePaid ? " accent-10" : "appearance-none" }  w-3.5 h-3.5 bg-05   cursor-pointer mr-1 dark:bg-03 hover:border hover:border-02`} value={"paid"} id="paid" name="paid" type="checkbox"/>
            <label className="cursor-pointer" htmlFor="paid">
            Paid</label>
            <br />
            <input className={` ${ isActivePending ? " accent-10" : "appearance-none" }  w-3.5 h-3.5 bg-05  cursor-pointer mr-1 dark:bg-03 hover:border hover:border-02`} value={"pending"} name="pending" type="checkbox" id="pending" />
            <label className="cursor-pointer" htmlFor="pending">
            Pending</label>
            <br />
            <input className={` ${ isActiveDraft ? " accent-10" : "appearance-none" }  w-3.5 h-3.5 bg-05  cursor-pointer mr-1 dark:bg-03 hover:border hover:border-02`} id="draft" value={"draft"} name="draft" type="checkbox" /> 
            <label className="cursor-pointer" htmlFor="draft">
            Draft</label>
      </form>
    </div>
    </>
  )
}


