import { verify } from 'jsonwebtoken'
import express from 'express'

import logger from './logger'
import config from './config'
import { User as iUser, UserForToken } from '../interfaces/User'
import User from '../models/user'
import { CallbackError, HydratedDocument } from 'mongoose'

const requestLogger = (request: express.Request, _response: express.Response, next: express.NextFunction) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}
const errorHandler = (error: Error, _request: express.Request, response: express.Response, next: express.NextFunction) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  logger.error(error.message)

  next(error)
}

const unknownEndpoint = (_request: express.Request, response: express.Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request: express.Request, _response: express.Response, next: express.NextFunction) => {

  const authorization: string = request.get('authorization') as string
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
  }
  else
    request.token = ''
  next()
}

const userExtractor = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  try {

    const decodedToken = verify(request.token, config.SECRET) as UserForToken
    const user = await User.findById(decodedToken.id).exec()
    if (user)
      request.userId = user.id
  }
  catch (e) {
    console.log(e)
    next(e)
  }
  next()
}
export default {
  requestLogger, errorHandler, unknownEndpoint, tokenExtractor, userExtractor
}