import React, { useContext, useState } from 'react'
import { DataProvider } from "../../DataContext/DataContextProvider"

import { useNavigate } from 'react-router-dom';

export const FormButtons = ({ cancelBtn }) => {
  const { isEdit, setIsActive, createInvoice, createInvoiceDraft, formData, updateInvoice, errorForm } = useContext(DataProvider);
  const navigate = useNavigate();
  
  

const saveAndSendBtn = () => {
  if (formData?.status) {
    return updateInvoice
  }
  else{
    return createInvoice
  }
  
}

  const clickBackBtn = () => {
    if (!cancelBtn) {
      setIsActive(false)
    } else if (!isEdit) {
      navigate('/');
      setIsActive(false)
    } else {
      navigate('/details/:id');
      setIsActive(false)
    }
  }
  
  return (
    <div className='sm:sticky bottom-0 '>
      <div className='w-full h-12 bg-gradient-to-t from-black/10 mt-4 relative top-5 -z-10'></div>

      <div className={`w-full flex gap-2 ${isEdit ? 'justify-end' : 'justify-between'} bg-white pt-6 pb-6 shadow-t px-6 rounded-r-2xl z-50 dark:bg-12 `}>
        <button type='button'
          className='py-3 text-nowrap px-4 rounded-full  bg-[#F9FAFE] text-07 font-bold  dark:text-07'
          onClick={clickBackBtn}
        >{isEdit ? 'Cancel' : 'Discard'}</button>
        <section className='flex gap-2'>
          <button 
          onClick={createInvoiceDraft}
          type='button'
          disabled={errorForm}
            className={`${isEdit ? 'hidden' : ''} w-full py-3 text-nowrap px-4 rounded-full bg-[#373B53] text-06 font-bold dark:bg-[#373B53] dark:text-white transition ${errorForm && "opacity-70"}`}
          >Save as Draft</button>
          <button
            disabled={errorForm}
            type='button'
            className={`w-full py-3 text-nowrap px-4 rounded-full bg-01 text-white font-bold transition ${errorForm && "opacity-70"}`}
            onClick={saveAndSendBtn()}
          >Save & Send</button>
        </section>
      </div>
    </div>

  )
};
