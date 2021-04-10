import React from 'react'
import Markdown from '../Markdown'

interface Props {
  content: string
}

const PostBody: React.FC<Props> = (props) => {
  const { content } = props

  return (
    <section>
      <Markdown>{content}</Markdown>
    </section>
  )
}

export default PostBody
