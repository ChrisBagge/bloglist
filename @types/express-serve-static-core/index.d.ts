
import { Request } from 'express-serve-static-core'
import { Types } from 'mongoose'

declare module 'express-serve-static-core' {
  export interface Request {
    token: string
    userId: Types.ObjectId

  }
}


