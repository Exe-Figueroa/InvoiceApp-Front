import { createContext, useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
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
  const [errorForm, setErrorForm] = useState(false)
  const [clients, setClients] = useState([])
  const navigate = useNavigate();
  const [searchValueFilter, setSearchValueFilter] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [intervalId, setIntervalId] = useState(null)
  useEffect(() => {
    setError({ error: '' })
  }, [userData])

  const login = async () => {
    try {
      const { data: { accessToken, refreshToken, tokenExp } } = await axios.post(`${baseURL}/auth`, userData);
      setUserAuth({ token: accessToken });
      const now = Math.floor(Date.now() / 1000);

      // Calcular el tiempo restante en segundos
      const tiempoRestanteSegundos = tokenExp.exp - now;
    
      localStorage.removeItem('accessToken', accessToken)

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('accessTokenExpiration', tiempoRestanteSegundos)

      setTimeout(() => {
        navigate('/');
        setIsLoggedIn(true)
      }, 1000);
    } catch (e) {
      if (e.response.data.message === 'USER_NOT_FOUND' || e.response.data.message === 'PASSWORD_INCORRECT') {
        setError({ error: 'Email incorrect o Passport incorrect' })
      } 
    }
  }


  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setUserAuth({ token: storedToken });
      setIsLoggedIn(true)
    }
  }, []);

  const validateToken = ()=>{
    let counter = 0;
    const checkAccessTokenExpiration = async () => {
      counter = counter + 1800;
      const accessTokenExpiration = await localStorage.getItem('accessTokenExpiration');
      let tokenParc = parseInt(accessTokenExpiration, 10);
      const now = Math.floor(Date.now() / 1000);
      if ( accessTokenExpiration && counter >=  (tokenParc - 1800) ) {
        try {
          counter = 0;
          const storedRefreshToken = await localStorage.getItem('accessToken');
          const { data: { accessToken, refreshToken, expiration } } = await axios.post(`${baseURL}/auth/refresh-token`, { token: storedRefreshToken });
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
  
          const timeTokenRefresh = expiration.exp - now;
  
          localStorage.setItem('accessTokenExpiration', timeTokenRefresh);
          clearInterval(intervalId);
        } catch (error) {
          navigate('/login');
        }
      }
    };
    const interval = setInterval(checkAccessTokenExpiration, 1800000);
    setIntervalId(interval)
  }

    
    
  useEffect(() => {
    setTimeout(() => {
      if (location.hash !== "#/login" && location.hash === "#/") {
        if (intervalId === null) {
          validateToken()
        } 
      } else if(location.hash === "#/login") {
        setIsLoggedIn(false)
        setIntervalId(null);
        clearInterval(intervalId);
      } 
    }, 1001);
  }, [location.hash]);

  

  

  const deleteInvoice = async (id) => {
    loadingNotify('Deleting invoice')
    try {
      const { status } = await axios.delete(`${baseURL}/invoices/${id}`, { headers: { Authorization: `Bearer ${userAuth.token}` } })
      navigate('/')

      setSeeModal(false);
      setRequest(`${Math.random()}`)
      setSearchValueFilter([])
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
      setSearchValueFilter([])
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
      const { status } = await axios.post(`${baseURL}/invoices`, formData, {
        headers: { Authorization: `Bearer ${userAuth.token}` }
      });
      setRequest(`${Math.random()}`)
      setIsActive(false);
      if (status === 201) {
        notify('Invoice created!!', 'success');
      }
    } catch (error) {
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
    
    try {
      Promise.all(itemsToUpdate.map(item=> axios.patch(`${baseURL}/items/${item._id}`, item, {headers: {Authorization: `Bearer ${userAuth.token}`}})));
    } catch (error) {
      console.error(error);
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
        noIdData.items.forEach((item)=> delete item._id)
        noIdData.paymentTerms = formData.paymentTerms || 1;
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
        setSearchValueFilter([])
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
      setErrorForm,
      errorForm,
      isLoggedIn,
      setUserAuth,
      setRequest,
      request,
      setData
    }}>
      {children}
    </DataProvider.Provider>
  );
};

