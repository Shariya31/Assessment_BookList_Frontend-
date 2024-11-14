import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Suspense fallback={<h1>Loading</h1>}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/new' element={<Home/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App