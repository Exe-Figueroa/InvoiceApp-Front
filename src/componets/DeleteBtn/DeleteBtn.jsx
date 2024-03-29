import { useContext } from 'react'
import { DataProvider } from '../../DataContext/DataContextProvider'
import { ShadowBackground } from '../ShadowBackground/ShadowBackground';

export const DeleteBtn = ({ id }) => {
  const { cancelDelete, deleteInvoice, deleteDraft } = useContext(DataProvider);
    const {data} = useContext(DataProvider)
    const user = data.find(user => user._id === id)

  return (
    <>
    <ShadowBackground isActive zIndex={'z-50'}/>
      <div className='w-4/5 max-w-[480px] rounded-md h-56 p-5 z-50 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  dark:bg-03 '>
        <h2 className='text-spartanM font-bold text-08 pr-4 dark:text-white'>Confirm Deletion</h2>
        <p className='text-lg text-pretty font-bold text-06 pr-2 md:pr-6 dark:text-white/75'>Are you sure you want to delete invoice #{user?.id}? This action cannot be undone.</p>
        <section className="flex justify-end w-full bg-white py-5 gap-2  mx-auto dark:bg-03">
          <button className="text-spartanS bg-[#F9FAFE] hover:bg-05 ease-in transition-all duration-200  py-2.5 px-5 rounded-3xl text-07 font-bold dark:bg-04  dark:text-white"
            onClick={() => cancelDelete()}
          >Cancel</button>
          <button className="text-white font-semibold ease-in transition-all duration-200 bg-09 hover:bg-[#FF9797] px-5 py-2.5 text-center rounded-3xl"
            onClick={() => user?.status === 'draft' ? deleteDraft(id):deleteInvoice(id)}
          >Delete</button>
        </section>
      </div>
    </>
  )
}

