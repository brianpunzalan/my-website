import React from 'react'
import Link, { LinkProps } from 'next/link'
import styled from 'styled-components'
import type Author from '../../types/Author'

interface Props {
  title: string
  excerpt: string
  date: string
  coverImageSrc: string
  author: Author
  slug: string
}

const ArticleCard = styled.article`
  border: 4px solid ${(props) => props.theme.primaryColor};
  border-radius: 4px;
  width: 250px;
  height: 460px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(4px);
  }

  .cover-image {
    background-color: ${(props) => props.theme.primaryColor};
    overflow: hidden;
    padding: 0;
    width: 100%;
    height: 200px;
    > img {
      max-width: 100%;
      height: auto;
    }
  }

  .body {
    padding: 20px;

    header {
      margin-bottom: 10px;
      h1 {
        margin-top: 0;
        font-size: 1.25rem;
      }
      i {
        font-size: 0.875rem;
        font-style: italic;
      }
      span {
        margin-left: 10px;
        font-size: 0.875rem;
      }
    }

    section {
      p {
        max-height: 110px;
        overflow: hidden;
        font-size: 1rem;
      }
    }
  }
`

const Anchor = styled.a`
  text-decoration: none;
  color: inherit;
`

const ArticleLink: React.FC<LinkProps> = (props) => {
  const { as, href, children } = props

  return (
    <Link as={as} href={href} passHref>
      <Anchor>{children}</Anchor>
    </Link>
  )
}

const PostExcerpt: React.FC<Props> = (props) => {
  const { title, excerpt, date, coverImageSrc, slug } = props

  return (
    <ArticleLink href="/posts/[slug]" as={`/posts/${slug}`}>
      <ArticleCard>
        <div className="cover-image">
          <img src={coverImageSrc} alt={title} />
        </div>
        <div className="body">
          <header>
            <h1>{title}</h1>
            <i>{date}</i>
          </header>
          <section>
            <p>{excerpt}</p>
          </section>
        </div>
      </ArticleCard>
    </ArticleLink>
  )
}

export default PostExcerpt
