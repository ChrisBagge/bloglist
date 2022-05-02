import express from 'express'
import Blog from '../models/blog'
import User from '../models/user'
import { Blog as iBlog } from '../interfaces/IBlog'
import { CallbackError, HydratedDocument } from 'mongoose'
import { User as iUser } from '../interfaces/User'
import middleware from '../utils/middleware'

const blogsRouter = express.Router()

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { userName: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body

  User.findById(request.userId, async (err: CallbackError, user: HydratedDocument<iUser>) => {
    if (err) {
      next(err)
    } else {
      const blog = new Blog<iBlog>({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
      })
      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id)
      User.findByIdAndUpdate(user.id, { blogs: user.blogs }, function (err, docs) {
        if (err) {
          next(err)
        } else {
          console.log('updated :', docs)
        }
      })
      response.status(201).json(savedBlog)
    }
  })
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blogToDelete = await Blog.findById(request.params.id).exec()
    if (blogToDelete) {
      if (blogToDelete.user?.toString() === request.userId.toString()) {
        Blog.findByIdAndDelete(request.params.id, function (err: CallbackError, docs: HydratedDocument<iBlog>) {
          if (err)
            next(err)
          else {
            console.log('Deleted : ', docs)
            response.status(204).end()
          }
        })
      }
      else
        response.status(401).json('user not authorized')
    }
    else
      response.json('blog not found')
  }
  catch (err) {
    next(err)
  }

})

export default blogsRouter
