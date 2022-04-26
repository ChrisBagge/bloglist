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

export default model('Blog', blogSchema)