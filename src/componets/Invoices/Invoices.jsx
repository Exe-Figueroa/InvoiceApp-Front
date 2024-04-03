import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DataProvider } from "../../DataContext/DataContextProvider";
import { InvoiceItem } from "../InvoiceItem/InvoiceItem";
import { InvoiceStatus } from "../InvoiceStatus/InvoiceStatus";
import { NoneInvoices } from "../NoneInvoices/NoneInvoices";


export const Invoices = ({ searchValueFilter, currentItems }) => {
  // const { data } = useContext(DataProvider);

  if (searchValueFilter.length === 0 && currentItems?.length === 0) {
    return (
      <NoneInvoices />
    )
  } else {
    return (
      <>
      { currentItems.map((invoice) => { 
        const  prices = invoice?.items?.map((item) => item.total)
        const totalPrices = prices?.length > 0 ? prices.reduce((prev, sum) => { return prev + sum}) : [0]

        return (
        <NavLink key={invoice._id} to={`/details/${invoice._id}`}>
        <section  className="w-4/5 my-5 lg:w-1/2 items-center m-auto bg-white p-4 rounded-md  justify-between h-full flex flex-row dark:bg-03">
          <InvoiceItem id={invoice.id} price={totalPrices} date={invoice.paymentDue} />
          <InvoiceStatus name={invoice.client?.clientName} status={invoice.status} />
        </section>
        </NavLink>
      )
      })}
    </>
    )
  }
}
