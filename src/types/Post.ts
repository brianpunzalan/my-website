import type Author from './Author'

export interface Post {
  slug: string
  title: string
  date: string
  coverImageSrc: string
  author: Author
  excerpt: string
  ogImage?: {
    url: string
  }
  content: string
}

export type PostExcerpt = Pick<
  Post,
  'title' | 'date' | 'slug' | 'author' | 'excerpt' | 'coverImageSrc'
>

export default Post
