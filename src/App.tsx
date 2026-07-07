import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from './components/shared/ErrorBoundary'
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
            <Route path='/characters' element={<ErrorBoundary><Characters /></ErrorBoundary>} />
            <Route path='/Locations' element={<ErrorBoundary><Locations /></ErrorBoundary>} />
            <Route path='/Episodes' element={<ErrorBoundary><Episodes /></ErrorBoundary>} />
            <Route path='/Favorites' element={<ErrorBoundary><Favorites /></ErrorBoundary>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

export default App
