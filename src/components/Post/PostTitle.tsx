import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const PostTitle: React.FC<Props> = (props) => {
  const { children } = props

  return <h1>{children}</h1>
}

export default PostTitle
