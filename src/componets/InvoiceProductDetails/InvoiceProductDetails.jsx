import { useParams } from "react-router-dom";
import { useContext } from "react";
import { DataProvider } from "../../DataContext/DataContextProvider";

export const InvoiceProductDetails = ({ isMobile }) => {
    const {data} = useContext(DataProvider)
    const { id } = useParams()
    const user = data.find(user => user._id === id)
    const  prices = user?.items?.map((item) => item.total)
    const totalPrices = prices?.length > 0 ? prices.reduce((prev, sum) => { return prev + sum}) : [0]
    

    if (isMobile) {
        return (
            <section className="flex md:mx-auto bg-white py-4 sm:pb-8 mb-6 flex-col w-full justify-center items-center rounded-b-md md:w-[730px] dark:bg-03">
                <div className="flex w-4/5 p-4 bg-[#F9FAFE] flex-col justify-between rounded-t-md dark:bg-[#282c49]">
                    {
                        user?.items.map(item => {

                            if (!item._id) {
                                // Asignar un _id único si no está definido
                                item._id = Math.random().toString(36).substring(7); // Generar un ID aleatorio
                            }
                            
                            return( 
                            <article key={item._id} className="flex justify-between w-full dark:text-white">
                                <div>
                                    <p>{item.name}</p>
                                    <p className="text-07 dark:text-white/75">{item.quantity}x $ {item.price}</p>
                                </div>
                                <p >$ {item?.total}</p>
                            </article>
                            
                            )
                        })}
                </div>



                <div className="flex justify-between items-center text-white rounded-b-md bg-[#373B53] text-center p-5 w-4/5 dark:bg-08">
                    <p className="text-spartanS">Grand Total</p>
                    <h1 className="text-spartanM font-bold">$ {totalPrices}</h1>
                </div>

            </section>
        )
    } else {
        return (
            <section className="flex md:mx-auto bg-white py-4 sm:pb-8 mb-6 flex-col w-full justify-center items-center rounded-b-md md:w-[730px] dark:bg-03">
                <div className="flex w-10/12 p-4 bg-[#F9FAFE] flex-col mt-5 justify-between rounded-t-md dark:bg-04">
                    <div className="hidden sm:flex justify-between mb-2  text-spartanP text-07 dark:text-white/75">
                        <p>Item Name</p>
                        <p>QTY.</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    {user?.items.map(item => {

                        if (!item._id) {
                            // Asignar un _id único si no está definido
                            item._id = Math.random().toString(36).substring(7); // Generar un ID aleatorio
                        }
                        
                        return <article key={item._id} className="flex mt-2 justify-between w-full">
                            <div className="flex justify-between w-10/12">
                                <p className="text-08 font-bold w-1/2 dark:text-white">{item.name}</p>
                                <p className="text-07 font-bold w-1/4 mr-10 dark:text-white">{item.quantity}</p>
                                <p className="text-07 font-bold w-1/4 dark:text-white">$ {item.price}</p>
                            </div>
                            <p className="text-08 font-bold dark:text-white">$ {item.total}</p>
                        </article>
                    })}

                </div>



                <div className="flex justify-between items-center text-white rounded-b-md bg-[#373B53] text-center p-5 w-10/12 dark:bg-08">
                    <p className="text-spartanS">Grand Total</p>
                    <h1 className="text-spartanM font-bold">£ {totalPrices}</h1>
                </div>

            </section>
        )
    }

}
