import mongoose, { Schema } from 'mongoose'

const shoppingListItemSchema = new Schema({
  description: {
    type: String
  }
}, {
  timestamps: true
})

shoppingListItemSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('ShoppingListItem', shoppingListItemSchema)

export const schema = model.schema
export default model
