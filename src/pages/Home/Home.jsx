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
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let cancelled = false
        async function loadRecipes() {
            try {
                setLoading(true)
                setError(null)
                const data = await searchRecipe(query, page)
                if (!cancelled) {
                    setRecipes(data.recipes || [])
                    setTotal(data.total || 0)
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
        return () => { cancelled = true }
    }, [query, page])

    const handleSubmit = (e) => {
        e.preventDefault()
        setPage(0)
        setQuery(search.trim())
    }

    const handleErase = () => {
        setSearch('')
        setQuery('')
        setPage(0)
        searchRef.current.focus()
    }

    return (
        <main className={styles.page}>
            <h1>Mes Recettes</h1>
            <p>Découvrez des recettes du monde entier et trouvez votre prochain plat favori.</p>
            <form onSubmit={handleSubmit}>
                <input
                    ref={searchRef}
                    type="search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Rechercher une recette..."
                />
                <button type="button" className="btn btn-outline" onClick={handleErase}>Effacer</button>
                <button type="submit" className="btn">Rechercher</button>
            </form>
            {loading && <p>Chargement...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && recipes.length === 0 && query && (
                <p>Aucune recette trouvée pour "{query}".</p>
            )}
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <RecipeCard recipe={recipe} />
                    </li>
                ))}
            </ul>
            <div className={styles.pagination}>
                <button className="btn" onClick={() => setPage(p => p - 1)} disabled={page === 0}>
                    Précédent
                </button>
                <span>Page {page + 1}</span>
                <button className="btn" onClick={() => setPage(p => p + 1)} disabled={(page + 1) * 12 >= total}>
                    Suivant
                </button>
            </div>
        </main>
    )
}
