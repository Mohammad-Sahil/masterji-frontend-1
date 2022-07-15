import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Admin from './Components/Admin/Admin'
import FashionConsultants from './Components/Admin/fashionConsultants';

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path='/admin' element={<Admin/>} >
        <Route exact path='fashion' element={<FashionConsultants/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App