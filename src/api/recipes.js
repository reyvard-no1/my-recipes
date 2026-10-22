export async function searchRecipe(query) {
    const params = new URLSearchParams()
    params.set('q', query)
    params.set('limit', 12)

    const response = await fetch(
        `https://dummyjson.com/recipes/search?${params}`
    )

    if (!response.ok) {
        throw new Error('Erreur lors de la recherche')
    }

    return response.json()
}
export async function getRecipe(id) {
    const response = await fetch(`https://dummyjson.com/recipes/${id}`)

    if (!response.ok) {
        throw new Error('Recette introuvable')
    }

    return response.json()
}

export async function createRecipe(recipe) {
    const response = await fetch('https://dummyjson.com/recipes/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
    })
    if (!response.ok) throw new Error('Erreur lors de la création')
    return response.json()
}
