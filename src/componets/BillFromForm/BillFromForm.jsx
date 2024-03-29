import { useContext, useState } from "react";
import { DataProvider } from "../../DataContext/DataContextProvider";
import { InputSection } from "../InputSection/InputSection";

export const BillFromForm = () => {
  const { billFromChange, formData, isEdit } = useContext(DataProvider);
  return (
    <>
      <h2 className='text-spartanL font-bold text-08 px-6 dark:text-white'>{isEdit ? `Edit #${formData.id}` :'New Invoice'}</h2>

      <div className="px-6">
        <h3 className='text-01 text-spartanM font-bold'> Bill From</h3>
        <InputSection
          placeholder={'Insert street address'}
          name={'senderStreet'}
          textLabel={'Street Address'}
          onChange={billFromChange}
          value={formData?.user?.street || ''}
          messageValidator={'Cannot contain symbols,it starts with numbers followed by letters.'}
        />
        <div className='w-full flex gap-x-6'>
          <InputSection
            name={'senderCity'}
            placeholder={'City'}
            textLabel={'City'}
            onChange={billFromChange}
            value={formData?.user?.city || ''}
            messageValidator={'Cannot contain numbers.'}
          />
          <InputSection
            name={'senderPostCode'}
            placeholder={'Post code'}
            textLabel={'PostCode'}
            onChange={billFromChange}
            value={formData?.user?.postCode || ''}
            messageValidator={'Can´t contain lowercase letters'}
          />
        </div>
        <InputSection
          name={'senderCountry'}
          placeholder={'Insert your country'}
          textLabel={'Country'}
          onChange={billFromChange}
          value={formData?.user?.country || ''}
          messageValidator={'Cannot contain numbers.'}
        />
      </div>
    </>
  )
}