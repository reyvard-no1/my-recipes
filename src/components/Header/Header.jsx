import { Link, NavLink } from 'react-router'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                🍽️ Mes Recettes
            </Link>
            <nav>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    Accueil
                </NavLink>
                <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    Favoris
                </NavLink>
                <NavLink
                    to="/new"
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    Nouvelle recette
                </NavLink>
            </nav>
        </header>
    )
}
