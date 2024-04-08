import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { ProductItem } from "../ProductItem/ProductItem";
import { DataProvider } from "../../DataContext/DataContextProvider";
import { baseURL } from "../../../config/config";

export const ItemsContainer = () => {
  const { setFormData, formData, setIsCorrect, items, setItems, userAuth } = useContext(DataProvider);
  const [requestItems, setRequestItems] = useState('')
  const [itemDB, setItemDB] = useState([])
  const navigate = useNavigate();
  let itemList = formData?.items ? formData.items : []; // Refactorizar
  
  
  const generateItem = () => {
    setRequestItems(`${Math.random()}`);
    const item = {
      name: '',
      total: 0,
      quantity: 0,
      price: 0,
    }
    itemList.push(item);
    setFormData(prevData => ({...prevData, items: [...itemList]}));
  }
  const filterItems = (data)=>{
    const itemsFiltered = data.filter(item => !formData?.items?.some(itemForm => itemForm.name === item.name));
    setItems(itemsFiltered)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/items`, { headers: { Authorization: `Bearer ${userAuth.token}` } });
        filterItems(data);
        setItemDB(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
        console.error({error});
      }
    }
    if (userAuth.token || requestItems) {
      fetchData();
    }
  }, [userAuth.token, requestItems])

  
  const updateItems = (index, data) => {
    const updatedList = [...itemList];
    updatedList[index] = { ...updatedList[index], ...data };
    const total = itemList.reduce((acumulator, currentItem) => acumulator + currentItem.total, 0);
    setTimeout(()=> {
      setFormData(prevData => ({...prevData, items: updatedList, total}));
    }, 10)
  }
  const deleteItem = (index)=> {
    setRequestItems(`${Math.random()}`);
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
          filterItems={filterItems}
          setRequestItems={setRequestItems}
        />
      ))}
      <button
        className={`w-full lg:w-[616px] h-12 text-07 font-bold text-spartanS w-8/10 bg-[#F9FAFE] dark:bg-04 dark:text-05 ${itemDB.length <= itemList.length  ? 'hidden' : ''}`}
        onClick={generateItem}
        type="button"
      >+Add New Item</button>
    </div>
  )
}

