export const InvoiceStatusBtn = ({status}) => {
    if (status === 'paid') {
        return (
            <button className="bg-btn-paid-color bg-opacity-10 py-2.5 rounded-md px-8 w-fit text-spartanS font-bold text-btn-paid-color">● Paid</button>
        )
    }
    if (status === 'pending') {
        return (
            <button className="bg-btn-pending-color bg-opacity-10 py-2.5 rounded-md px-5 w-fit text-spartanS font-bold text-btn-pending-color">● Pending</button>
        )
    }
    if (status === 'draft') {
        return (
            <button className="bg-btn-draft-color bg-opacity-10 py-2.5 rounded-md px-7 w-fit text-spartanS font-bold text-btn-draft-color dark:bg-[#373b53] dark:text-05">● Draft</button>
        )
    }
}