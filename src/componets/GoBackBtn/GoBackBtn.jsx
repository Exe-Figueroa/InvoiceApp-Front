import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { DataProvider } from "../../DataContext/DataContextProvider"

export const GoBackBtn = ({canGoHome}) => {
    const { setIsActive,setSearchValueFilter } = useContext(DataProvider);
    const navigate = useNavigate();
    const clickBackBtn = () => {    
        setSearchValueFilter([])
        if (!canGoHome) {
            setIsActive(false)
        } else {
            navigate('/');
            setIsActive(false)
        }

    }
    return (
            <div className="flex px-6 md:w-[730px] md:mx-auto mb-7 items-center cursor-pointer" onClick={clickBackBtn}>
                <svg className="mb-1" width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none" fillRule="evenodd" /></svg>
                <p className="ml-3 text-08 font-bold dark:text-white">Go Back</p>
            </div>
    )
}