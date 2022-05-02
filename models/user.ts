import { model, Schema } from 'mongoose'
import { User } from '../interfaces/User'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema<User>({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(mongooseUniqueValidator)

export default model('User', userSchema)


