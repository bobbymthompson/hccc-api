import { ShoppingListItem } from '.'

let shoppingListItem

beforeEach(async () => {
  shoppingListItem = await ShoppingListItem.create({ description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = shoppingListItem.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shoppingListItem.id)
    expect(view.description).toBe(shoppingListItem.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = shoppingListItem.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(shoppingListItem.id)
    expect(view.description).toBe(shoppingListItem.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
