import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Allproducts from '../Pages/Allproducts'
import Admin from '../Pages/Admin'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Allproducts/>}/>
        <Route path='/admin' element={<Admin/>}/>
    </Routes>
  )
}

export default Router