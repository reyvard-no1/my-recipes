import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        try {
            const stored = localStorage.getItem('favorites')
            return stored ? JSON.parse(stored) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites))
        } catch {}
    }, [favorites])

    function addFavorite(recipe) {
        setFavorites((prev) => [...prev, recipe])
    }

    function removeFavorite(id) {
        setFavorites((prev) => prev.filter((r) => r.id !== id))
    }

    function isFavorite(id) {
        return favorites.some((r) => r.id === id)
    }

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite, isFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    return useContext(FavoritesContext)
}
