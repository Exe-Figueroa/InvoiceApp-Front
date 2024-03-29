

export const InvoiceUserDetails = ({ user }) => {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      const createdDate = user?.createdAt ? formatDate(user.createdAt) : null;

    
    return (
        <section className="bg-white md:mx-auto flex flex-col w-full mt-5 rounded-t-md justify-center items-center md:w-[730px] dark:bg-03">
         <article className="flex mt-10 flex-col gap-4 sm:flex-row justify-between w-2/3 sm:w-full sm:px-6 sm:py-2 ">
            <div>
                <h3 className="flex font-bold text-08 dark:text-white"><p className="text-07 font-bold">#</p>{user?.id}</h3>
                <p className="text-spartanP text-06 dark:text-white/75">Graphic Design</p>
            </div>
            <div className="text-spartanP text-06 dark:text-white/75">
                <p>{user?.user?.street}</p>
                <p>{user?.user?.city}</p>
                <p>{user?.user?.postCode}</p>
                <p>{user?.user?.country}</p>
            </div>
            </article>
            <article className="flex-wrap justify-between mt-4 gap-3 flex w-2/3 items-start sm:w-full sm:px-10">
            <div>
                <p className="text-spartanP text-06 dark:text-white/75">Invoice Date</p>
                <h2 className="font-bold text-08 dark:text-white">{ createdDate }</h2>
                <p className="text-spartanP text-06 dark:text-white/75">Payment Due</p>
                <h2 className="font-bold text-08 dark:text-white">{user?.paymentDue}</h2>
            </div>
            <div className="text-spartanP text-06 dark:text-white/75">
                <p>Bill To</p>
                <h2 className="font-bold text-08 dark:text-white">{user?.client?.clientName}</h2>
                <p>{user?.client?.street}</p>
                <p>{user?.client?.city}</p>
                <p>{user?.client?.postCode}</p>
                <p>{user?.client?.country}</p>
            </div>
            <div>
            <p className="text-spartanP text-06 dark:text-white/75">Sent to</p>
            <h2 className="font-bold text-08 dark:text-white">{user?.client?.clientEmail}</h2>
            </div>
        </article>
        </section>
    )
}