import { Types } from 'mongoose'

export interface Blog {
  title: string,
  author: string,
  url: string,
  likes?: number,
  user?: Types.ObjectId,
  id?: string
}

