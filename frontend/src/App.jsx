import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './assets/HomePage'
import { CreatePage } from './assets/CreatePage'
import { DeatilsPage } from './assets/DeatilsPage'
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