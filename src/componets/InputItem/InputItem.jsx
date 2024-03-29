export const InputItem = ({ name, placeholder, textLabel, value, onUpdateProduct, max }) => {
  return (
    <div className='w-full flex flex-col gap-1 mb-6 '>
      <label
        // htmlFor={name}
        className='label-input dark:text-05'
      >{textLabel}</label>
      <input
        type="number"
        // id={name}
        name={name}
        disabled = {name === "price"}
        className='input dark:bg-04 dark:outline-none dark:text-white/75'
        placeholder={placeholder}
        onChange={onUpdateProduct}
        value={value}
        min={0}
        max={max}
      />
    </div>
  );
}