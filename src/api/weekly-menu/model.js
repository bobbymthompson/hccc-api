import mongoose, { Schema } from 'mongoose'

const weeklyMenuSchema = new Schema({
  date: {
    type: Date
  },
  _recipe: {
    type: Schema.Types.ObjectId, ref: 'Recipe'
  }
}, {
  timestamps: true
})

weeklyMenuSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      date: this.date,
      recipe: this._recipe,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('WeeklyMenu', weeklyMenuSchema)

export const schema = model.schema
export default model
