import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Admin from './Components/Admin'
import FashionConsultants from './components/fashionConsultants';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/admin' element={<Admin/>} />
        {/* <Route path='/admin/fashion' element={<FashionConsultants/>} /> */}
      </Routes>
    </>
  )
}

export default App