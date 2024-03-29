import { HashRouter, Route, Routes } from 'react-router-dom'
import { Home } from './routes/Home'
import { InvoiceDetails } from './routes/InvoiceDetails.jsx'
import { DataContextProvider } from './DataContext/DataContextProvider.jsx'
import { Login } from './routes/login.jsx'

function App() {
  return (
    <div className='lg:pl-[103px]'>
      <HashRouter>
        <DataContextProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/details/:id' element={<InvoiceDetails />} />
          </Routes>
        </DataContextProvider>
      </HashRouter>
    </div>

  )
}

export default App
