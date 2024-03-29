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
import './Form.css';

export const Form = () => {
  const { isActive } = useContext(DataProvider);
  return (
    <div className='dark:bg-12 '>
      <ShadowBackground isActive={isActive} />
      <div id="Form" className={`z-30 top-[72px] md:top-[80px] bg-white dark:bg-03 pt-8 left-0 absolute sm:fixed calc lg:h-screen sm:top-[80px] lg:top-0 transition lg:left-0 lg:pl-[65px] ${isActive ? 'translate-x-0 lg:translate-x-10' : '-translate-x-full'} lg:rounded-e-[20px] `}>
        <div className='sm:hidden'>
          <GoBackBtn canGoHome={false} />
        </div>
        <form >
          <div className=' sm:overflow-y-scroll sm:mr-3 calcForm '>
            <BillFromForm />
            <BillToFrom />
            <DateInput />
            <PaimentTerms />
            <ItemsContainer />
          </div>
            <FormButtons cancelBtn={false}/>
        </form>
      </div>
    </div>
  );
}

