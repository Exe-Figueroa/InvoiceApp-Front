import { InvoiceStatusBtn } from "./InvoiceStatusBtn/InvoiceStatusBtn"

export const InvoiceStatus = ({name, status}) =>{
    return (
        <section className="gap-2 flex flex-col sm:flex-row sm:justify-between sm:gap-x-6 items-center">
        <p className="text-spartanP text-06 dark:text-white">{name}</p>
        <InvoiceStatusBtn status={status}></InvoiceStatusBtn>
        </section>
    )
}