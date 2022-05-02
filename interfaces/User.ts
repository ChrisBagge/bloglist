import { Types } from 'mongoose'

export interface User {
  blogs: Types.ObjectId[],
  username: string,
  name: string,
  passwordHash: string
}

export interface UserForToken {
  username: string,
  id: Types.ObjectId
}