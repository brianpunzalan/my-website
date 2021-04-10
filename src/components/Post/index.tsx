import React from 'react'
import styled from 'styled-components'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import type Author from '../../types/Author'

interface Props {
  title: string
  content: string
  date: string
  coverImageSrc: string
  author: Author
}

const PostArticle = styled.article`
  display: block;
`

const Post: React.FC<Props> = (props) => {
  const { title, content, date, coverImageSrc, author } = props

  return (
    <PostArticle>
      <PostHeader
        title={title}
        date={date}
        coverImageSrc={coverImageSrc}
        author={author}
      />
      <PostBody content={content} />
    </PostArticle>
  )
}

export default Post
