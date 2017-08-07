import { Recipe } from '.'

let recipe

beforeEach(async () => {
  recipe = await Recipe.create({ name: 'test', description: 'test', category: 'test', totalTime: 'test', cookTime: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = recipe.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(recipe.id)
    expect(view.name).toBe(recipe.name)
    expect(view.description).toBe(recipe.description)
    expect(view.category).toBe(recipe.category)
    expect(view.totalTime).toBe(recipe.totalTime)
    expect(view.cookTime).toBe(recipe.cookTime)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = recipe.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(recipe.id)
    expect(view.name).toBe(recipe.name)
    expect(view.description).toBe(recipe.description)
    expect(view.category).toBe(recipe.category)
    expect(view.totalTime).toBe(recipe.totalTime)
    expect(view.cookTime).toBe(recipe.cookTime)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
