
import { useContext } from "react";
import { FilterStatus } from "./FilterStatus";
import { NewInvBtn } from "./NewInvBtn";
import { TitleHeader } from "./TitleHeader";
import { DataProvider } from "../../DataContext/DataContextProvider";

export const Header = () => {
  const {searchValueFilter, setSearchValueFilter} = useContext(DataProvider)
  
  return (
    <>
    <header className="flex justify-between items-center h-20 px-4 md:px-12 pt-[120px] mb-16">
      <div>
        <TitleHeader searchValueFilter={searchValueFilter}/>
      </div>
      <div className="flex items-center">
        <FilterStatus setSearchValueFilter={setSearchValueFilter}/>
          <NewInvBtn/>
      </div>
    </header>
    </>
  )
}

