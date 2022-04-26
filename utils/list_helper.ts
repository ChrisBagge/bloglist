import { Blog } from '../interfaces/IBlog'

const dummy = (blogs: Blog[]) => {
  return 1
}

const totalLikes = (blogs: Blog[]) => {
  const reducer = (likes: number, blog: Blog) => {
    return likes + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs: Blog[]) => {
  const reducer = (max: Blog, obj: Blog) => {
    return obj.likes > max.likes? obj : max
  }
  const favBlog = blogs.reduce(reducer)
  return favBlog
}

export default { dummy, totalLikes, favoriteBlog }