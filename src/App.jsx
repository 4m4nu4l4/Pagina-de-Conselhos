import { useState } from 'react'
import './App.css'
// import Footer from './components/Footer'
import Header from './components/Header'
// import Home from './pages/Home'
// import About from './pages/About'
import {Routes, Route} from "react-router-dom"
// import ApiRickAndMorty from './pages/ApiRickAndMorty'


function App() {
  return (
    <>
    <Header/>
    <Routes>
      {/* <Route></Route> */}
      {/* <Route path="/" element={<ApiRickAndMorty/>}></Route>
      <Route path="/about" element={<About/>}></Route> */}
    </Routes>
    {/* <Footer/> */}
    </>
  )
}
export default App;