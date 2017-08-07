import mongoose, {
  Schema
} from 'mongoose'

const IngredientSchema = new Schema({
  quantity: String,
  units: String,
  description: String
})

const recipeSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },ription: {
    type: String
  },
  category: {
    type: String
  },
  subCategory: {
    type: String
  },
  totalTime: {
    type: String
  },
  cookTime: {
    type: String
  },
  prepTime: {
    type: String
  },
  yieldAmount: {
    type: String
  },
  ingredients: [IngredientSchema],
  instructions: [String],
  datePublished: Date,
  difficulty: String,
  protein: String,
  author: String,
  image: String
}, {
  timestamps: true
})

recipeSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      category: this.category,
      totalTime: this.totalTime,
      cookTime: this.cookTime,
      prepTime: this.prepTime,
      subCategory: this.subCategory,
      yieldAmount: this.yieldAmount,
      instructions: this.instructions,
      ingredients: this.ingredients,
      datePublished: this.datePublished,
      author: this.author,
      image: this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

// Duplicate the ID field.
recipeSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Ensure virtual fields are serialized.
recipeSchema.set('toJSON', {
  virtuals: true
})

recipeSchema.set('toObject', {
  virtuals: true
})

const model = mongoose.model('Recipe', recipeSchema)

export const schema = model.schema
export default model
