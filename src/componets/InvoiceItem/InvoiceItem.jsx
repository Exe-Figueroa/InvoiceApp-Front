export const InvoiceItem = ({id, date, price}) => {
    return (
        <section className="gap-2 flex flex-col sm:flex-row sm:justify-between w-1/2 sm:gap-x-6 items-start">
        <h3 className="flex font-bold text-08 dark:text-white w-full">
            <p className="text-07 font-bold">#</p>
            {id}
        </h3>
        <p className="text-spartanP text-06 dark:text-white/75 w-full">{date}</p>
        <h3 className="font-bold text-08 dark:text-white w-full">${price}</h3>
        </section>
    )
}