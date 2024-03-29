import { useContext, useState } from "react"
import { ProductItem } from "../ProductItem/ProductItem";
import { DataProvider } from "../../DataContext/DataContextProvider";

export const ItemsContainer = () => {
  const { setFormData, formData, setIsCorrect, items, setItems } = useContext(DataProvider);
  
  let itemList = formData?.items ? formData.items : []; // Refactorizar
  const generateItem = () => {
    const item = {
      name: '',
      total: 0,
      quantity: 0,
      price: 0,
    }
    itemList.push(item);
    setFormData(prevData => ({...prevData, items: [...itemList]}));
  }
  const updateItems = (index, data) => {
    const updatedList = [...itemList];
    updatedList[index] = { ...updatedList[index], ...data };
    const total = itemList.reduce((acumulator, currentItem) => acumulator + currentItem.total, 0);
    setTimeout(()=> {
      setFormData(prevData => ({...prevData, items: updatedList, total}));
    }, 100)
  }
  const deleteItem = (index)=> {
    const updatedList = [...itemList];
    updatedList.splice(index, 1);
    setFormData(prevData => ({ ...prevData, items: updatedList }));
  }

  return (
    <div className="px-6">
      <h3 className="text-[#777F98] font-bold text-xl ">Item List</h3>
      {/* Lista de items */}
      {formData?.items?.map((item, index) => (
        <ProductItem
          key={index}
          id={index}
          setItems={setItems}
          items={items}
          setIsCorrect={setIsCorrect}
          updateItems={updateItems}
          index={index}
          item={item}
          deleteItem={deleteItem}
        />
      ))}
      <button
        className="w-full h-12 text-07 font-bold text-spartanS w-8/10 bg-[#F9FAFE] dark:bg-04 dark:text-05"
        onClick={generateItem}
        type="button"
      >+Add New Item</button>
    </div>
  )
}

