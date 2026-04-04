import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CreatePage } from './pages/CreatePage'
import { DeatilsPage } from './pages/DeatilsPage'
import { Toaster } from "react-hot-toast";


export const App = () => {
  return (
    <div>
        <Routes>
           <Route path='/' element={<HomePage />} />
           <Route path='/create' element={<CreatePage />} />
           <Route path='/note/:id' element={<DeatilsPage />} />
        </Routes>
    </div>
  )
}

export default App