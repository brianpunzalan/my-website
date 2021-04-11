/* eslint-disable no-console */
import React from 'react'
import moment from 'moment'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { getAllPosts } from '../lib/api/posts'
import HomeLayout from '../layout/Home'
import type AuthorType from '../types/Author'
import Sidebar from '../blocks/Sidebar'
import BlogPosts from '../blocks/BlogPosts'
import type { PostExcerpt as PostExcerptType } from '../types/Post'

interface Props {
  allPosts: PostExcerptType[]
}

const Container = styled.div`
  margin-top: 4em;
`

const HomePage: React.FC<Props> = (props) => {
  const { allPosts } = props

  return (
    <HomeLayout sidebar={<Sidebar />}>
      <Head>
        <title>Brian Punzalan Personal Website</title>
      </Head>
      <Container>
        <BlogPosts posts={allPosts} />
      </Container>
    </HomeLayout>
  )
}

interface StaticPropsParams {
  allPosts: PostExcerptType[]
}

export const getStaticProps: GetStaticProps<StaticPropsParams> = async () => {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
    'coverImage',
  ])

  return {
    props: {
      allPosts: posts.map<PostExcerptType>((post) => ({
        title: post.title as string,
        date: moment(post.date).format('lll') as string,
        slug: post.slug as string,
        author: post.author as AuthorType,
        excerpt: post.excerpt as string,
        coverImageSrc: post.coverImage as string,
      })),
    },
  }
}

export default HomePage
