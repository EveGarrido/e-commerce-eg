import './App.css'
import { HashRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Purchases from './pages/Purchases';
import NavBar from './components/NavBar';
import LoadingScreen from './components/LoadingScreen';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {

 const isLoading = useSelector((state)=> state.isLoading);

 return (
    <div className="App">
     <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Container className='my-4'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/product/:id' element={<ProductDetail />}/>
            <Route element={<ProtectedRoutes />}>
              <Route path='/purchases' element={<Purchases />}/>
            </Route>
            <Route path='/login' element={<Login />}/>
          </Routes>
      </Container>
     </HashRouter>
    </div>
  )
}

export default App
