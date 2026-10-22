import { useState } from 'react'
import { useNavigate } from 'react-router'
import { createRecipe } from '../../api/recipes'
import styles from './NewRecipe.module.css'

export default function NewRecipe() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [form, setForm] = useState({
        name: '',
        difficulty: 'Easy',
        prepTimeMinutes: '',
        cookTimeMinutes: '',
        ingredients: '',
        instructions: ''
    })

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            setError(null)
            await createRecipe({
                ...form,
                prepTimeMinutes: Number(form.prepTimeMinutes),
                cookTimeMinutes: Number(form.cookTimeMinutes),
                ingredients: form.ingredients.split('\n'),
                instructions: form.instructions.split('\n')
            })
            setSuccess(true)
            setTimeout(() => navigate('/'), 3000)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    return (
        <main className={styles.page}>
            <h1>Nouvelle recette</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Nom
                    <input name="name" value={form.name} onChange={handleChange} required />
                </label>
                <label>Difficulté
                    <select name="difficulty" value={form.difficulty} onChange={handleChange}>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </label>
                <label>Temps de préparation (min)
                    <input name="prepTimeMinutes" type="number" min="0" value={form.prepTimeMinutes} onChange={handleChange} required />
                </label>
                <label>Temps de cuisson (min)
                    <input name="cookTimeMinutes" type="number" min="0" value={form.cookTimeMinutes} onChange={handleChange} required />
                </label>
                <label>Ingrédients (un par ligne)
                    <textarea name="ingredients" value={form.ingredients} onChange={handleChange} required />
                </label>
                <label>Instructions (une par ligne)
                    <textarea name="instructions" value={form.instructions} onChange={handleChange} required />
                </label>
                <button className="btn btn-outline" type="submit" disabled={loading}>
                    {loading ? 'Envoi...' : 'Créer la recette'}
                </button>
            </form>
              {success && (
            <div className="toast">✅ Recette créée avec succès !</div>
              )}
        </main>
    )
}
