import { useContext } from "react"
import { DataProvider } from "../../DataContext/DataContextProvider";

export const NewInvBtn = () => {
  const { setIsActive, setFormData, setIsEdit } = useContext(DataProvider);

  const openForm = () => {
    setIsEdit(false);
    setIsActive(true);
    setFormData();
  }
  //! asignar id del form para poder abrrlo cuando seleccionen el btn de new.

  return (
    <>
      <button className="bg-01 text-white h-10 flex  items-center justify-around p-2  rounded-3xl font-bold ml-3 hover:bg-02 " onClick={openForm}>
        <div className="bg-white  w-7 h-7 rounded-2xl flex justify-center items-center mr-1">
          <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z" fill="#7C5DFA" fillRule="nonzero" />
          </svg>
        </div>
        <p className="md:flex hidden">New Invoice</p>
        <p className="md:hidden">New</p>
      </button>
    </>
  )
}