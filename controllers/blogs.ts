import express from 'express'
import Blog from '../models/blog'
import User from '../models/user'
import { Blog as iBlog } from '../interfaces/IBlog'
import { CallbackError, HydratedDocument } from 'mongoose'
import { User as iUser } from '../interfaces/User'

const blogsRouter = express.Router()

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { userName: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
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

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findById(request.body._id, (err: CallbackError, blog: HydratedDocument<iBlog>) => {
    if (err) {
      console.log(err)
    } else {
      blog.user?.toString()
    }
  })
})

export default blogsRouter
