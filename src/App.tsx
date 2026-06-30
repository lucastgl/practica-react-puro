import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Characters from './pages/Characters'
import Locations from './pages/Locations'
import Episodes from './pages/Episodes'
import Favorites from './pages/Favorites'
import './App.css'
import { FavoritesProvider } from './context/Context'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Navigate to='/Characters' />} />
            <Route path='/characters' element={<Characters />} />
            <Route path='/Locations' element={<Locations />} />
            <Route path='/Episodes' element={<Episodes />} />
            <Route path='/Favorites' element={<Favorites />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App
