import { model, Schema } from 'mongoose'
import { Blog } from '../interfaces/IBlog'

const blogSchema = new Schema<Blog>({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  getters: false,
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) { delete ret._id }

})
/*
blogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})*/

export default model('Blog', blogSchema)