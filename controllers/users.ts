import { hash } from 'bcrypt'
import express from 'express'
import User from '../models/user'
import { User as IUser } from '../interfaces/User'
import { Types } from 'mongoose'
import { Request } from 'express-serve-static-core'

const usersRouter = express.Router()

usersRouter.post('/', async (request: Request, response) => {

  const body = request.body

  /*
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  */

  const { userName, name, password, blogs }: { userName: string, name: string, password: string, blogs: Types.ObjectId[] } = body

  if (userName.length < 3 || password.length < 3)
    return response.status(400).json({ error: 'user name and password must be longer than 3 characters' })

  const existingUser = await User.findOne({ userName })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await hash(password, saltRounds)

  const user = new User<IUser>({
    blogs: blogs,
    userName: userName,
    name: name,
    passwordHash,

  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (_request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
  response.json(users)
})

export default usersRouter

