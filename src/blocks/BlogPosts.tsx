import React from 'react'
import styled from 'styled-components'
import PostExcerpt from '../components/Post/PostExcerpt'
import { PostExcerpt as PostExcerptType } from '../types/Post'

interface Props {
  posts: PostExcerptType[]
}

const Container = styled.div`
  > h1 {
    font-size: 1.5rem;
    text-align: center;
  }

  .container {
    padding-top: 10px;
    padding-bottom: 10px;

    .wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-left: -20px;
      margin-top: -20px;

      .item {
        margin-left: 20px;
        margin-top: 20px;
      }
    }
  }

  @media screen and (min-width: ${(props) => props.theme.breakpointLG}) {
    > h1 {
      text-align: left;
    }

    .container {
      .wrapper {
        justify-content: flex-start;
      }
    }
  }
`

const BlogPosts: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <Container id="latest-posts">
      <h1>Latest Posts</h1>
      <div className="container">
        <div className="wrapper">
          {posts.map((post) => {
            return (
              <div key={post.slug} className="item">
                <PostExcerpt
                  slug={post.slug}
                  title={post.title}
                  author={post.author}
                  coverImageSrc={post.coverImageSrc}
                  date={post.date}
                  excerpt={post.excerpt}
                />
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

export default BlogPosts
