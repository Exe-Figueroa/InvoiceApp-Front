import { useParams } from "react-router-dom"
import { useContext, useEffect } from "react"
import { ToastContainer } from 'react-toastify';
import { DataProvider } from "../DataContext/DataContextProvider"

import { InvoiceDetailsOptions } from "../componets/InvoiceDetailsOptions/InvoiceDetailsOptions"
import { InvoiceProductDetails } from "../componets/InvoiceProductDetails/InvoiceProductDetails"
import { InvoiceStatusBtn } from "../componets/InvoiceStatus/InvoiceStatusBtn/InvoiceStatusBtn"
import { InvoiceUserDetails } from "../componets/InvoiceUserDetails/InvoiceUserDetails"
import { GoBackBtn } from "../componets/GoBackBtn/GoBackBtn"

import { Navbar } from "../componets/Navbar/Navbar"
import { DeleteBtn } from "../componets/DeleteBtn/DeleteBtn"
import { Form } from "../componets/Form/Form";
export const InvoiceDetails = () => {

    const { data, setSeeModal, seeModal } = useContext(DataProvider);

    const { id } = useParams()

    const user = data.find(user => user._id === id)

    return (
        <>
            <ToastContainer />

            <Navbar></Navbar>
            <section className="p-4 pt-[120px]">
                <GoBackBtn canGoHome={true}></GoBackBtn>
                <section className="flex md:w-[730px] md:mx-auto bg-white rounded w-full items-center sm:justify-between px-2.5 py-5 dark:bg-03" >
                    <div className="flex w-4/5 sm:w-fit sm:justify-evenly sm:mx-0 items-center justify-between mx-auto">
                        <p className="sm:mx-5 dark:text-white/75">Status</p>
                        <InvoiceStatusBtn status={user?.status} />
                    </div>
                    <div className="hidden sm:flex mr-3">
                        < InvoiceDetailsOptions setSeeModal={setSeeModal} id={id} status={user?.status} />
                    </div>
                </section>

                <section className="w-full">
                    <InvoiceUserDetails user={user} ></InvoiceUserDetails>
                    <div className="sm:hidden">
                        <InvoiceProductDetails isMobile={true}></InvoiceProductDetails>
                    </div>
                    <div className="hidden sm:flex">
                        <InvoiceProductDetails isMobile={false}></InvoiceProductDetails>
                    </div>

                </section>
                <div className="sm:hidden">
                    < InvoiceDetailsOptions setSeeModal={setSeeModal} id={id} status={user?.status} />

                </div>
                {seeModal && <DeleteBtn id={id} />}
            </section>
            <Form />
        </>
    )
}




