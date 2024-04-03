import { useContext, useEffect } from "react";
import { DataProvider } from "../../DataContext/DataContextProvider";
import { InputSection } from "../InputSection/InputSection";
import axios from "axios";
import { baseURL } from "../../../config/config";
import { useNavigate } from "react-router-dom";


export const BillToFrom = () => {
  const navigate = useNavigate();
  const { billToChange, formData, clients, setFormData, setClients } = useContext(DataProvider);

  const storedToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/clients`, { headers: { Authorization: `Bearer ${storedToken}` } });
        setClients(data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    }
    fetchClients()
  }, [])
  


  const filterClient = (e)=>{
    const selectedClient = clients.find(client =>  client.clientName === e.target.value);
    if (!selectedClient) {
      billToChange(e)
    }else{
      const cleanClient = {
        city: selectedClient.city,
        clientEmail: selectedClient.clientEmail,
        clientName: selectedClient.clientName,
        country: selectedClient.country,
        street: selectedClient.street,
        postCode: selectedClient.postCode,
      }
      setFormData(prevData => ({...prevData, client: cleanClient}));
    }
  }
  return (
    <div className="px-6">
      <h3 className='text-01 text-spartanM font-bold'>Bill To</h3>
      <InputSection
        name={'clientName'}
        placeholder={"Client's Name"}
        textLabel={"Client's Name"}
        onChange={filterClient}
        value={formData?.client?.clientName || ''}
        messageValidator={'Cannot contain numbers in name.'}
        list={'clientNameList'}
      />
      <datalist id="clientNameList">
        {clients.map(client => (
          <option
            key={client._id}
            value={client.clientName}
          >
            {client.clientName}
          </option>
        ))}
      </datalist>
      <InputSection
        name={'clientEmail'}
        placeholder={"Client's Email"}
        textLabel={"Client's Email"}
        onChange={billToChange}
        value={formData?.client?.clientEmail || ''}
        messageValidator={'Please enter a valid email.'}
      />
      <InputSection
        name={'clientStreet'}
        placeholder={"Street Address"}
        textLabel={"Street Address"}
        onChange={billToChange}
        value={formData?.client?.street || ''}
        messageValidator={'Cannot contain symbols,it starts with numbers followed by letters.'}
      />
      <div className='w-full flex gap-x-6'>
        <InputSection
          name={'clientCity'}
          placeholder={'City'}
          textLabel={'City'}
          onChange={billToChange}
          value={formData?.client?.city || ''}
          messageValidator={'Cannot contain numbers.'}
        />
        <InputSection
          name={'clientPostCode'}
          placeholder={'Post code'}
          textLabel={'PostCode'}
          onChange={billToChange}
          value={formData?.client?.postCode || ''}
          messageValidator={'Can´t contain lowercase letters'}
        />
      </div>
      <InputSection
        name={'clientCountry'}
        placeholder={'Insert your country'}
        textLabel={'Country'}
        onChange={billToChange}
        value={formData?.client?.country || ''}
        messageValidator={'It cannot contain numbers or symbols.'}
      />
    </div>
  )
}