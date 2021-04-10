import React from 'react'
import styled from 'styled-components'
import type Author from '../../types/Author'

interface Props {
  title: string
  coverImageSrc: string
  date: string
  author: Author
}

const Header = styled.header`
  .header-top {
    margin-bottom: 20px;
    text-align: center;
  }

  .header-cover {
    display: flex;
    justify-content: center;
    width: 100%;
    > img {
      max-width: 100%;
      height: auto;
    }
  }
`

const PostHeader: React.FC<Props> = (props) => {
  const { title, coverImageSrc, date } = props

  return (
    <Header>
      <div className="header-top">
        <h1>{title}</h1>
        <span>{date}</span>
      </div>
      <div className="header-cover">
        <img src={coverImageSrc} />
      </div>
    </Header>
  )
}

export default PostHeader
