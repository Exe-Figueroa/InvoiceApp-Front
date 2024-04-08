import { useContext, useEffect, useState } from "react";
import  axios from "axios";
import { ToastContainer } from 'react-toastify';
import { Navbar } from "../componets/Navbar/Navbar"
import { Header } from "../componets/Header/Header"
import 'react-toastify/dist/ReactToastify.css';
import { Form } from "../componets/Form/Form";
import { PaginatedInvoices } from "../componets/Invoices/PaginatedInvoices";
import { DataProvider } from "../DataContext/DataContextProvider";
import { baseURL } from "../../config/config";

export const Home = () => {
  const {userAuth, request, setData} = useContext(DataProvider)

  useEffect(() => {
    if (userAuth.token || request) {
      Promise.all([
        axios.get(`${baseURL}/invoices`, {
          headers: { Authorization: `Bearer ${userAuth.token}` }
        }),
        axios.get(`${baseURL}/invoices/drafts`, { headers: { Authorization: `Bearer ${userAuth.token}` } })
      ]).then(([res1, res2]) => {
        setData([...res1.data, ...res2.data]);
      }).catch(e => {
        if (e.response && e.response.status === 401) {
          navigate('/login');
        }
      })
    }
  }, [userAuth.token, request]);
  
  return (
    <>
      <Navbar/>
      <Header/>
        <ToastContainer />
      <PaginatedInvoices itemsPerPage={8}></PaginatedInvoices>
      {userAuth.token && <Form />}
    </>
  )
}