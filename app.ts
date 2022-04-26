import express from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import blogsRouter from './controllers/blogs'
import usersRouter from './controllers/users'
import loginRouter from './controllers/login'
import config from './utils/config'
import logger from './utils/logger'
import middleware from './utils/middleware'

const app = express()

connect(config.MONGODB_URI as string)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .then(_result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app