import { ParsedUrlQuery } from 'node:querystring'
import React from 'react'
import moment from 'moment'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPostBySlug, getAllPosts } from '../../lib/api/posts'
// import markdownToHtml from '../../lib/markdownToHtml'
import PostLayout from '../../layout/Post'
import Post from '../../components/Post'
import PostTitle from '../../components/Post/PostTitle'
import type PostType from '../../types/Post'
import type AuthorType from '../../types/Author'

type PostMain = Pick<
  PostType,
  'title' | 'author' | 'content' | 'date' | 'ogImage' | 'coverImageSrc' | 'slug'
>

interface Props {
  post: PostMain
}

const PostPage: React.FC<Props> = (props) => {
  const { post } = props
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <PostLayout>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <React.Fragment>
          <Head>
            <title>{post.title} | Brian Punzalan Personal Website</title>
            <meta property="og:image" content={post.ogImage?.url ?? ''} />
          </Head>
          <Post
            title={post.title}
            coverImageSrc={post.coverImageSrc}
            date={post.date}
            author={post.author}
            content={post.content}
          />
        </React.Fragment>
      )}
    </PostLayout>
  )
}

interface StaticPropsParams {
  post: PostMain
}
interface ParsedUrlQueryParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<
  StaticPropsParams,
  ParsedUrlQueryParams
> = async (ctx) => {
  const { params } = ctx

  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  // const content = await markdownToHtml(post.content as string || '')

  return {
    props: {
      post: {
        title: post.title as string,
        date: moment(post.date).format('lll') as string,
        slug: post.slug as string,
        author: post.author as AuthorType,
        ogImage: post.ogImage as PostType['ogImage'],
        coverImageSrc: post.coverImage as string,
        content: post.content,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths<ParsedUrlQueryParams> = async () => {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug as string,
        },
      }
    }),
    fallback: false,
  }
}

export default PostPage
