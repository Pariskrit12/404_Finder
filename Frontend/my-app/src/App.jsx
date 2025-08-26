import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './Page/Home'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </>
  )
}
