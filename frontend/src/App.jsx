import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './assets/HomePage'
import { CreatePage } from './assets/CreatePage'
import { DeatilsPage } from './assets/DeatilsPage'


export const App = () => {
  return (
    <div>
        <Routes>
           <Route path='/' element={<HomePage />} />
        </Routes>
    </div>
  )
}

export default App