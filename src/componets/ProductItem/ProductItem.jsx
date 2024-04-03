import { InputItem } from "../InputItem/InputItem"
import { InputSection } from "../InputSection/InputSection"
import deleteIcon from "../../assets/icon-delete.svg";
import { useState } from "react";

export const ProductItem = ({ index, updateItems, item, deleteItem, filterItems, items, setRequestItems }) => {
  const [productValue, setProductValue] = useState({
    total: item.total,
    quantity: item.quantity,
    price: item.price,
    name: item.name,
    _id: '',
    maxQuantity: 0
  });


  const [nameError, setNameError] = useState(false);

  const onUpdateProduct = (e) => {
    const { name, value } = e.target;
    const validItems = items.map(item => item.name);
    if (name === "name") {
      if (value.trim() === '') {
        setRequestItems(`${Math.random()}`);
        setNameError(true);
      } else if (!validItems.includes(value)) {
        setNameError(true);
      } else {
        setNameError(false);
      }
    }

    setProductValue(prevProductValue => {
      let price = prevProductValue.price;
      let quantity = prevProductValue.quantity;
      let productName = prevProductValue.name;
      let maxQuantity = prevProductValue.maxQuantity;
      let _id = prevProductValue._id;

      let selectedItem;
      if (name === 'name') {
        productName = value;
        selectedItem = items.find(i => i.name === value);
        _id = selectedItem?._id

        if (selectedItem) {
          price = parseFloat(selectedItem.price);
          maxQuantity = Number(selectedItem.quantity);
        }
      } else if (name === 'price') {
        price = parseFloat(value);
      } else if (name === 'quantity') {
        if (parseInt(value) > maxQuantity) {
          quantity = parseInt(value);
        } else {
          quantity = value === '' ? 0 : parseInt(value);
        }
      }

      let total = price * quantity;
      total = parseInt(total.toFixed(2));
      updateItems(index, { price, quantity, total, name: productName });

      return {
        ...prevProductValue,
        price,
        quantity,
        maxQuantity,
        total,
        _id,
        name: productName,
      };
    });
  };

  return (
    <>
      <InputSection name={'name'} error={nameError} messageValidatorList={"Item does not exist"} index={index} placeholder={'Insert Item'} textLabel={'Item Name'} value={item.name} onChange={onUpdateProduct} list={"items"} filterItems={() => filterItems(items)} />
      <datalist id="items">
        {items.map((itemD) => {
          return (
            <option value={itemD.name} id={itemD._id} key={itemD._id} >
              {` $${itemD.price}`}
            </option>
          )
        })}
      </datalist>

      <section className="flex items-center justify-between gap-2">
        <InputItem name={'quantity'} placeholder={'Qty'} textLabel={'Qty.'} value={item.quantity} onUpdateProduct={onUpdateProduct} max={productValue.maxQuantity} />
        <InputItem name={'price'} placeholder={'Price'} textLabel={'Price'} value={item.price} onUpdateProduct={onUpdateProduct} />
        <div className='w-full flex flex-col gap-1 mb-6'>
          <span className='label-input'>Total</span>
          <div className="w-full flex justify-between items-center py-2">
            <span className='font-bold text-spartanS border-0 text-06 pt-2'>{productValue.total}</span>
            <button type="button" onClick={() => deleteItem(index)}>
              <img src={deleteIcon} alt="Delete button Image" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
