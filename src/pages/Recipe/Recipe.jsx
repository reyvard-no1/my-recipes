import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { getRecipe } from '../../api/recipes'
import styles from './Recipe.module.css'
import { useFavorites } from '../../contexts/FavoritesContext'

export default function Recipe() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { addFavorite, removeFavorite, isFavorite } = useFavorites()

    useEffect(() => {
        let cancelled = false
        async function loadRecipe() {
            try {
                setLoading(true)
                setError(null)
                const data = await getRecipe(id)
                if (!cancelled) {
                    setRecipe(data)
                    setLoading(false)
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message)
                    setLoading(false)
                }
            }
        }
        loadRecipe()
        return () => {
            cancelled = true
        }
    }, [id])

    if (loading) return <p>Chargement...</p>
    if (error) return <p>{error}</p>
    if (!recipe) return null

    return (
        <main className={styles.page}>
            <img src={recipe.image} alt={recipe.name} />
            <h1>{recipe.name}</h1>
            <button
              className="btn"
              onClick={() => isFavorite(recipe.id)
              ? removeFavorite(recipe.id)
              : addFavorite(recipe)
             }
              >
           {isFavorite(recipe.id) ? '❤️ Retirer des favoris' : '🤍 Ajouter aux favoris'}
              </button>
            <p>Difficulté : {recipe.difficulty}</p>
            <p>Temps de préparation : {recipe.prepTimeMinutes} min</p>
            <p>Temps de cuisson : {recipe.cookTimeMinutes} min</p>
            <h2>Ingrédients</h2>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h2>Instructions</h2>
            <ol>
                {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </main>
    )
}
