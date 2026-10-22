import { Link } from 'react-router'
import styles from './RecipeCard.module.css'
import { useFavorites } from '../../contexts/FavoritesContext'

export default function RecipeCard({ recipe }) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites()
    return (
        <Link className={styles.recipeCard} to={`/recipes/${recipe.id}`}>
            <img
                className={styles.recipeImage}
                src={recipe.image}
                alt={recipe.name}
            />
            <div className={styles.info}>
                <h3 className={styles.recipeName}>{recipe.name}</h3>
                <span className={styles.difficulty}>{recipe.difficulty}</span>
                <time>{recipe.cookTimeMinutes} min</time>
            </div>
        </Link>
    )
}
