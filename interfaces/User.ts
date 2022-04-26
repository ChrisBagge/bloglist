import { Types } from 'mongoose'

export interface User {
  blogs: Types.ObjectId[],
  userName: string,
  name: string,
  passwordHash: string
}

export interface UserForToken {
  userName: string,
  id: Types.ObjectId
}