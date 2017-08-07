import { WeeklyMenu } from '.'

let weeklyMenu

beforeEach(async () => {
  weeklyMenu = await WeeklyMenu.create({ date: 'test', recipe_id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = weeklyMenu.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(weeklyMenu.id)
    expect(view.date).toBe(weeklyMenu.date)
    expect(view.recipe_id).toBe(weeklyMenu.recipe_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = weeklyMenu.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(weeklyMenu.id)
    expect(view.date).toBe(weeklyMenu.date)
    expect(view.recipe_id).toBe(weeklyMenu.recipe_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
