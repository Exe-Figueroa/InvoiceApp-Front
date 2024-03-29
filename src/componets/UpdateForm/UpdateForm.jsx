import { useContext } from 'react';
import { BillFromForm } from '../BillFromForm/BillFromForm';
import { BillToFrom } from '../BillToForm/BillToForm';
import { DateInput } from '../DateInput/DateInput'
import { ItemsContainer } from '../ItemsContainer/ItemsContainer';
import { PaimentTerms } from '../PaymentTerms/PaymentTerms'
import { GoBackBtn } from '../GoBackBtn/GoBackBtn';
import { DataProvider } from '../../DataContext/DataContextProvider';
import { ShadowBackground } from '../ShadowBackground/ShadowBackground';
import { FormButtons } from '../FormButtons/FormButtons';

export const Form = () => {
  const { isActive } = useContext(DataProvider);
  return (
    <>
      <ShadowBackground isActive={isActive} className={''} />
      <div id="Form" className={`z-30 top-[72px] md:top-[80px] bg-[#f9fafe] pt-8 left-0 lg:left-[70px] absolute lg:top-0 transition ${isActive ? 'translate-x-0 lg:translate-x-10' : '-translate-x-full'} lg:rounded-e-[20px] `}>
        <GoBackBtn />
        {/* <h2 className='text-spartanL font-bold text-08'>Edit <span className='text-06'>#</span>XM9141</h2> */}
        <h2 className='text-spartanL font-bold text-08 px-6'>New Invoice</h2>
        {/* Fomrulario */}
        <form >
          <BillFromForm />
          <BillToFrom />
          <DateInput />
          <PaimentTerms />
          <ItemsContainer />
          <FormButtons />
        </form>
      </div>
    </>
  );
}

