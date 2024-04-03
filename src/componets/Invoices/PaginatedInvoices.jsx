import ReactPaginate from 'react-paginate'
import { Invoices } from './Invoices';
import  './paginated.css';
import { DataProvider } from '../../DataContext/DataContextProvider';
import { useContext, useState } from 'react';

export function PaginatedInvoices({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);
    const {searchValueFilter, setSearchValueFilter, data} = useContext(DataProvider)

    const endOffset = itemOffset + itemsPerPage;


    const currentItems = data?.slice(itemOffset, endOffset);
    const filteredData = searchValueFilter.length ? searchValueFilter.slice(itemOffset,endOffset) : currentItems;
   
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const pageCount2 = Math.ceil(searchValueFilter.length / itemsPerPage);
    
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.length; 
      setItemOffset(newOffset);
    };
  
  
    return (
      <>
        <Invoices currentItems={filteredData} searchValueFilter={searchValueFilter}></Invoices>
        <ReactPaginate
          className=' my-4 flex justify-center font-bold gap-6 items-center text-end  react-paginate dark:text-white dark:react-paginate-dark'
          breakLabel="..."
          nextLabel="Next →"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount2 || pageCount}
          previousLabel="← Previous"
          activeLinkClassName='react-paginate-active'
          
          
          renderOnZeroPageCount={null}
        />
      </>
    );
  }