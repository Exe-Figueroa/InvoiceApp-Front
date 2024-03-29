import { useContext } from 'react';
import { DataProvider } from '../../DataContext/DataContextProvider';

export const TitleHeader = ({searchValueFilter}) => {
  const {data } = useContext(DataProvider);
  const filter = searchValueFilter.length ? searchValueFilter.length : data?.length;


  return (
    <>
        <h1 className="text-spartanM font-bold dark:text-white">Invoices</h1>
        <p className="text-spartanP text-06 md:hidden dark:text-white/75">{filter === 0 ? "No invoices" : `${filter} invoices`}</p>
        <p className="text-spartanP text-06 md:flex hidden dark:text-white/75">{filter === 0 ? "No invoices" : `There are ${filter} total invoices`}</p>
    </>
  )
}