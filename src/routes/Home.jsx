import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import { Navbar } from "../componets/Navbar/Navbar"
import { Invoices } from "../componets/Invoices/Invoices"
import { Header } from "../componets/Header/Header"
import 'react-toastify/dist/ReactToastify.css';
import { Form } from "../componets/Form/Form";
import { PaginatedInvoices } from "../componets/Invoices/PaginatedInvoices";

export const Home = () => {
  // const [searchValueFilter, setSearchValueFilter] = useState([]);
  
  return (
    <>
      <Navbar/>
      <Header/>
        <ToastContainer />
      {/* <Invoices searchValueFilter={searchValueFilter} /> */}
      <PaginatedInvoices itemsPerPage={8}></PaginatedInvoices>
      <Form />
    </>
  )
}