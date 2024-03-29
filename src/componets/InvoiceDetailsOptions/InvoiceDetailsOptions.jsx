import { useContext } from "react";
import { DataProvider } from "../../DataContext/DataContextProvider";

export const InvoiceDetailsOptions = ({id, setSeeModal, status}) => {
    const {editFormData, setStatusToPaid} = useContext(DataProvider);

    return (
        <section className="flex justify-evenly w-full bg-white py-5 gap-2 mx-auto  dark:bg-03">
        {status !== 'paid' && <button 
        className="text-spartanS bg-[#F9FAFE] hover:bg-05 ease-in transition-all duration-200  py-2.5 px-5 rounded-3xl text-07 font-bold dark:bg-04 dark:text-05  dark:hover:bg-[#2d3253]"
        onClick={()=> editFormData(id)}
        >Edit</button>}
        <button 
        className="text-white font-semibold ease-in transition-all duration-200 bg-09 hover:bg-[#FF9797] px-5 py-2.5 text-center rounded-3xl"
        onClick={()=>setSeeModal(true)}
        >Delete</button>
        <button onClick={()=> setStatusToPaid(id)} className=" bg-01 ease-in transition-all duration-200 hover:bg-02 text-white font-semibold px-5 text-center rounded-3xl">Mark as Paid</button>
        </section>
    )
}