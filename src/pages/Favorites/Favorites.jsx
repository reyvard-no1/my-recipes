import styles from './Favorites.module.css'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import { useFavorites } from '../../contexts/FavoritesContext'

export default function Favorites() {
    const { favorites } = useFavorites()

    return (
        <main className={styles.page}>
            <h1>Mes Favoris</h1>
            {favorites.length === 0 ? (
                <p>Aucun favori pour le moment.</p>
            ) : (
                <ul>
                    {favorites.map((recipe) => (
                        <li key={recipe.id}>
                            <RecipeCard recipe={recipe} />
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}
