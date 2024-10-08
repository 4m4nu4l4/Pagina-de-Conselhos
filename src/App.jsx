import './App.css'
// import Footer from './components/Footer'
import Header from './components/Header'
import {Routes, Route} from "react-router-dom"
import CardDiario from './pages/Card-Diario'
import CardCategoria from './pages/Card-Categoria'
import CardAleatorio from './pages/Card-Aleatorio'
import CardMensal from './pages/Card-Mensal'
import Conselho from './pages/Conselho'
import Sobre from './pages/Sobre'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<CardDiario/>}></Route>
      <Route path="/categoria" element={<CardCategoria/>}></Route>
      <Route path="/aleatorio" element={<CardAleatorio/>}></Route>
      <Route path="/mensal" element={<CardMensal/>}></Route>
      <Route path="/conselho" element={<Conselho/>}></Route>
      <Route path="/sobre" element={<Sobre/>}></Route>
    </Routes>
    <Footer/>
    </>
  )
}
export default App;