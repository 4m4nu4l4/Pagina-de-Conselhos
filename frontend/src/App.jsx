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
import Login from './pages/Login/login'
import Cadastro from './pages/Cadastro/cadastro'
import { AuthProvider } from './auth/Context'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Header/>
        <Routes>
          <Route path="/" element={<CardDiario/>}></Route>
          {/* rotas privadas que precisam de token para acessar, caso não esteja com o token - o sistema volta para tela de login */}
          <Route element={<PrivateRoute/>}>
            <Route path="/categoria" element={<CardCategoria/>}></Route>
            <Route path="/aleatorio" element={<CardAleatorio/>}></Route>
            <Route path="/mensal" element={<CardMensal/>}></Route>
            <Route path="/conselho" element={<Conselho/>}></Route>
          </Route>
          <Route path="/sobre" element={<Sobre/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/cadastro' element={<Cadastro/>}></Route>
        </Routes>
      <Footer/>
    </AuthProvider>
  )
}
export default App;