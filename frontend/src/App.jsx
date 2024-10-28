import './App.css'
// import Footer from './components/Footer'
import Header from './components/Header'
import { Route, Routes, useLocation } from "react-router-dom"
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
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Bloquear from './pages/Bloquear/Bloquear'

function App() {
  const location = useLocation();
  const ocultarElementos = location.pathname === '/login' || location.pathname === '/cadastro';
  const isLoginOrCadastro = location.pathname === '/login' || location.pathname === '/cadastro';
  return (
    <AuthProvider>
      <div className={isLoginOrCadastro ? 'login-background' : 'default-background'}>
        {!ocultarElementos && <Header />}
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route element={<PrivateRoute />}>
                <Route path="/categoria" element={<CardCategoria/>}></Route>
                <Route path="/diario" element={<CardDiario/>}></Route>
                <Route path="/aleatorio" element={<CardAleatorio/>}></Route>
                <Route path="/mensal" element={<CardMensal/>}></Route>
                <Route path="/conselho" element={<Conselho/>}></Route>
                <Route path='/bloquear' element={<Bloquear/>}></Route>
                <Route path="/sobre" element={<Sobre />} />
              </Route>
          </Routes>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ width: '50%' }}
        />
        {!ocultarElementos && <Footer />}
      </div>
    </AuthProvider>
  )
}
export default App;