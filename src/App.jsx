import { Routes, Route } from 'react-router'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import Recipe from './pages/Recipe/Recipe.jsx'
import Favorites from './pages/Favorites/Favorites.jsx'
import NewRecipe from './pages/NewRecipe/NewRecipe.jsx'
import { FavoritesProvider } from './contexts/FavoritesContext'

export default function App() {
    return (
        <FavoritesProvider>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes/:id" element={<Recipe />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/new" element={<NewRecipe />} />
            </Routes>
            <Footer />
        </FavoritesProvider>
    )
}
