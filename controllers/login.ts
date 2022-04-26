import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import express from 'express'
import User from '../models/user'
import config from '../utils/config'
import { UserForToken } from '../interfaces/User'

const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ userName: body.userName })
  const passwordCorrect = user === null
    ? false
    : await compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken: UserForToken = {
    userName: user.userName,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.SECRET)

  response
    .status(200)
    .send({ token, username: user.userName, name: user.name })
})

export default loginRouter