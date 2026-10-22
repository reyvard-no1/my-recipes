import styles from './Home.module.css'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import { useState, useRef, useEffect } from 'react'
import { searchRecipe } from '../../api/recipes'

export default function Home() {
    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')
    const searchRef = useRef(null)
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false

        async function loadRecipes() {
            try {
                setLoading(true)
                setError(null)
                const data = await searchRecipe(query)
                if (!cancelled) {
                    setRecipes(data.recipes || [])
                    setLoading(false)
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message)
                    setLoading(false)
                }
            }
        }
        loadRecipes()

        return () => {
            cancelled = true
        }
    }, [query])

    const handleSubmit = (e) => {
        e.preventDefault()
        setQuery(search.trim())
    }

    const handleErase = () => {
        setSearch('')
        setQuery('')
        searchRef.current.focus()
    }

    return (
        <main className={styles.page}>
            <h1>Mes Recettes</h1>
            <p>
                Découvrez des recettes du monde entier et trouvez votre prochain
                plat favori.
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    ref={searchRef}
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher une recette..."
                />
                <button type="button" onClick={handleErase}>
                    Effacer
                </button>
                <button className="btn btn-outline" type="submit">Rechercher</button>
            </form>

            {loading && <p>Chargement...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && recipes.length === 0 && query && (
             <p>Aucune recette trouvée pour "{query}".</p>
)}

            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <RecipeCard recipe={recipe} />
                    </li>
                ))}
            </ul>
        </main>
    )
}
