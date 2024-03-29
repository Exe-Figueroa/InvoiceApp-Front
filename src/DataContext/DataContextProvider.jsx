import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import { baseURL } from '../../config/config';

import { notify, loadingNotify } from '../utils/notify';

export const DataProvider = createContext();
export const DataContextProvider = ({ children }) => {
  const [seeModal, setSeeModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState();
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [userAuth, setUserAuth] = useState({ token: '' })
  const [request, setRequest] = useState('')
  const [error, setError] = useState({ error: '' })
  const [clients, setClients] = useState([])
  const navigate = useNavigate();
  const [searchValueFilter, setSearchValueFilter] = useState([]);
  const [items, setItems] = useState([]);


  useEffect(() => {
    setError({ error: '' })
  }, [userData])

  const login = async () => {
    try {
      const { data: { accessToken, refreshToken } } = await axios.post(`${baseURL}/auth`, userData);
      setUserAuth({ token: accessToken });
      localStorage.removeItem('accessToken', accessToken)

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (e) {
      console.log({ e });
      if (e.response.data.message === 'USER_NOT_FOUND') {
        setError({ error: 'Email incorrect' })
      } else if (e.response.data.message === 'PASSWORD_INCORRECT') {
        setError({ error: 'Passport incorrect' })
      } else {
        console.log('usuario correcto');
      }
    }
  }

  useEffect(() => {
    const checkAccessTokenExpiration = async () => {
      const accessTokenExpiration = localStorage.getItem('accessTokenExpiration');
      if (accessTokenExpiration && Date.now() >= parseInt(accessTokenExpiration, 10)) {
        try {
          const storedRefreshToken = localStorage.getItem('refreshToken');
          const { data: { accessToken, expiration } } = await axios.post(`${baseURL}/auth/refresh-token`, { refreshToken: storedRefreshToken });

          localStorage.setItem('accessToken', accessToken);

          localStorage.setItem('accessTokenExpiration', expiration);
        } catch (error) {
          navigate('/login')
        }
      }
    };

    const interval = setInterval(checkAccessTokenExpiration, 540000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setUserAuth({ token: storedToken });
    }
  }, []);

  useEffect(() => {
    if (userAuth.token || request) {
      Promise.all([
        axios.get(`${baseURL}/invoices`, {
          headers: { Authorization: `Bearer ${userAuth.token}` }
        }),
        axios.get(`${baseURL}/invoices/drafts`, { headers: { Authorization: `Bearer ${userAuth.token}` } })
      ]).then(([res1, res2]) => {
        setData([...res1.data, ...res2.data]);
      }).catch(e => {
        if (e.response && e.response.status === 401) {
          navigate('/login');
        }
      })
    }
  }, [userAuth.token, request]);

  const deleteInvoice = async (id) => {
    loadingNotify('Deleting invoice')
    try {
      const { status } = await axios.delete(`${baseURL}/invoices/${id}`, { headers: { Authorization: `Bearer ${userAuth.token}` } })
      navigate('/')

      setSeeModal(false);
      setRequest(`${Math.random()}`)

      if (status === 200) {
        setTimeout(() => {
          notify('Invoice deleted!!', 'success');
        }, 500);
      }
    } catch (error) {
      notify('Bad request. Please try again later', 'error');
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  }

  const deleteDraft = async (id) => {
    loadingNotify('Deleting Draft')
    try {
      const { status } = await axios.delete(`${baseURL}/invoices/drafts/${id}`, { headers: { Authorization: `Bearer ${userAuth.token}` } })
      navigate('/');
      setRequest(`${Math.random()}`)
      setSeeModal(false);
      if (status === 200) {
        setTimeout(() => {
          notify('Draft deleted!!', 'success');
        }, 200);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  }


  const createInvoice = async () => {
    loadingNotify('Creating invoice');
    try {
      console.log({ formData });
      const { status } = await axios.post(`${baseURL}/invoices`, formData, {
        headers: { Authorization: `Bearer ${userAuth.token}` }
      });
      setRequest(`${Math.random()}`)
      setIsActive(false);
      if (status === 201) {
        notify('Invoice created!!', 'success');
      }
    } catch (error) {
      console.log({ error });
      notify('Bad request. Please try again later', 'error');
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
    updateItems(items);
  }

  const updateItems = (itemList)=>{
    const itemsToUpdate = [];
    for (let i = 0; i < formData.items.length; i++) {
      const itemFiltered = itemList.find(item => formData.items[i].name === item.name);
      itemsToUpdate.push({...itemFiltered, quantity: formData.items[i].quantity});
    }
    
    console.log({itemsToUpdate, itemList});
    try {
      Promise.all(itemsToUpdate.map(item=> axios.patch(`${baseURL}/items/${item._id}`, item, {headers: {Authorization: `Bearer ${userAuth.token}`}})))
        .then(res => console.log({res}));
    } catch (error) {
      console.log({error});
    }
  }
  const updateInvoice = async () => {

    loadingNotify('Editing invoice');
    try {
      if (formData.status === 'draft') {
        const noIdData = { ...formData }
        delete noIdData._id
        delete noIdData.createdAt
        delete noIdData.status
        delete noIdData.__v
        noIdData.paymentTerms = formData.paymentTerms || 1

        const { status } = await axios.post(`${baseURL}/invoices`, noIdData, {
          headers: { Authorization: `Bearer ${userAuth.token}` }
        });
        await axios.delete(`${baseURL}/invoices/drafts/${formData._id}`, { headers: { Authorization: `Bearer ${userAuth.token}` } })
        setRequest(`${Math.random()}`);
        setIsActive(false);

        navigate('/');
        if (status === 201) {
          notify('Invoice edited!!', 'success');
        }

      } else {
        const { status } = await axios.patch(`${baseURL}/invoices/${formData._id}`, formData, {
          headers: { Authorization: `Bearer ${userAuth.token}` }
        });
        setRequest(`${Math.random()}`)
        setIsActive(false);
        if (status === 200) {
          notify('Invoice edited!!', 'success');
        }
      }



    } catch (error) {
      console.log(error);
      notify('Bad request. Please try again later', 'error');
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  }


  const createInvoiceDraft = async () => {
    loadingNotify('Creating draft');
    try {
      const { status } = await axios.post(`${baseURL}/invoices/drafts`, formData, {
        headers: { Authorization: `Bearer ${userAuth.token}` }
      }
      );
      setIsActive(false)
      setRequest(`${Math.random()}`)
      setSeeModal(false)
      if (status === 201) {
        navigate('/');
        notify('Draft created!!', 'success');
      }
    } catch (error) {
      notify('Bad request. Please try again later', 'error');
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  }

  const editFormData = (id) => {
    setIsEdit(true);
    const invoice = data.find(invoice => invoice._id === id);
    setFormData(invoice);
    setIsActive(true);
  }

  const setStatusToPaid = async (id) => {
    loadingNotify('Paying invoice');
    try {
      const invoiceToPay = await axios.get(`${baseURL}/invoices/${id}`, {
        headers: { Authorization: `Bearer ${userAuth.token}` }
      })
      if (invoiceToPay.data.status === 'pending') {
        const { status } = await axios.patch(`${baseURL}/invoices/${id}`, { status: 'paid' }, {
          headers: { Authorization: `Bearer ${userAuth.token}` }
        });
        setIsActive(false);
        setRequest(`${Math.random()}`);
        if (status === 200) {
          navigate('/');
          notify('Invoice paid!!', 'success');
        }
      } else if (invoiceToPay.data.status === 'paid') {
        notify(`Bad request. This invoice has already been paid!`, 'error');
      }

    } catch (error) {
      notify(`Bad request. You can't pay a draft!`, 'error');
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  }

  const cancelDelete = () => {
    setSeeModal(false);
  }

  const billFromChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'senderStreet':
        setFormData(prevData => ({ ...prevData, user: { ...prevData?.user, street: value } }));
        break;
      case 'senderCity':
        setFormData(prevData => ({ ...prevData, user: { ...prevData?.user, city: value } }));
        break;
      case 'senderPostCode':
        setFormData(prevData => ({ ...prevData, user: { ...prevData?.user, postCode: value } }));
        break;
      case 'senderCountry':
        setFormData(prevData => ({ ...prevData, user: { ...prevData?.user, country: value } }));
        break;
      default:
        break;
    }
  }

  const billToChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'clientName':
        setFormData(prevData => ({ ...prevData, client: { ...prevData?.client, clientName: value } }));
        break
      case 'clientStreet':
        setFormData(prevData => ({ ...prevData, client: { ...prevData?.client, street: value } }));
        break;
      case 'clientCity':
        setFormData(prevData => ({ ...prevData, client: { ...prevData?.client, city: value } }));
        break;
      case 'clientPostCode':
        setFormData(prevData => ({ ...prevData, client: { ...prevData?.client, postCode: value } }));
        break;
      case 'clientCountry':
        setFormData(prevData => ({ ...prevData, client: { ...prevData?.client, country: value } }));
        break;
      case 'clientEmail':
        setFormData(prevData => ({ ...prevData, client: { ...prevData?.client, clientEmail: value } }));
        break;
      default:
        break;
    }
  };

  const setPaymentDue = (value) => {
    setFormData(prevData => ({ ...prevData, paymentDue: value }));
  }
  const setPaymentValue = (value) => {
    setFormData(prevData => ({ ...prevData, paymentTerms: value }))
  }

  return (
    <DataProvider.Provider value={{
      isActive,
      setIsActive,
      billFromChange,
      billToChange,
      setPaymentDue,
      setPaymentValue,
      setFormData,
      data,
      formData,
      editFormData,
      deleteInvoice,
      cancelDelete,
      isEdit,
      setIsEdit,
      seeModal,
      setSeeModal,
      setData,
      createInvoice,
      setUserData,
      userData,
      login,
      createInvoiceDraft,
      deleteDraft,
      error,
      clients,
      userAuth,
      setClients,
      updateInvoice,
      setStatusToPaid,
      searchValueFilter,
      setSearchValueFilter,
      items, 
      setItems,
    }}>
      {children}
    </DataProvider.Provider>
  );
};