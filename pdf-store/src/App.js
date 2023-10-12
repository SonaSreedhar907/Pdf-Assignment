import React from 'react'
import Header from './components/Header'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import AddBook from './components/AddBook'
import About from './components/About'

function App() {
  return (
    <>
     <header>
      <Header/>
     </header>
     <main>
      <Routes>
        <Route path="/" element={<Home/>} exact/>
        <Route path="/add" element={<AddBook/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
     </main>
    </>
  )
}

export default App