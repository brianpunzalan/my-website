---
title: Creating my Next.js Blog with Netlify CMS
excerpt: Here I would show you the steps on how I created my Next.js Blog website integrated with Netlify CMS.
date: 2021-04-10T13:08:45.423Z
author:
  name: Brian Punzalan
ogImage:
  url: /assets/blog1-image.jpg
coverImage: /assets/blog1-image.jpg
content: |-
  ## Introduction

  I have just recently recreate my website on [Next.js](https://nextjs.org/) from [Gatsby](https://www.gatsbyjs.org/) due to personal preference. Next.js like Gatsby could be used as a static-site generator for React although it's much more popular as SSR framework for React (or you could leverage both at the same time!).

  In this post, I will show you how I created my blog website using Next.js integrated with Netlify CMS.

  ## Overview

  Firstly, we need to understand the stack and the flow of communication between components. For this, I prepared a diagram for easy consumption.
  
  ![mywebsite-stack.jpg](/assets/mywebsite-stack.jpg "Next.js + Netlify")

  Github would trigger the build on Netlify whenever there are changes on your specified branch, e.g *master*. 
  Netlify would then execute your specified build command and deploy the output directory to be hosted as a static website.
  As you could see, Netlify already provides you the convenience of automatic deployment without any other tools needed, you just need to grant them authorization to your Github repository.

  Now, let's talk about our application. Since its a blog website, we need to have a way of managing our blog posts.
  With this we will use Netlify CMS, an open source CMS tool that provides us the interface for managing contents. 
  This tool does not have any database or backend where you can store your content just like any other CMS out there.
  It just provides you a user interface to manage content with added functionality of customizing your own content types.

  You may be wondering on how are we going to persist our content if we do not have any database.

  The answer is **"Markdown"**.

  Markdown files are just text files with specified format that could be parsed and transformed into any other object type.
  These files would serve as medium for our contents.

  Remember that our application will be built staticly, meaning we do not have any web server backend that could handle dynamic resource request. 
  The whole website was prebuilt into HTML files before serving to the internet.
  If our application was prebuilt, therefore the contents of our website was also prebuilt.
  This would imply that our content was prefetched or included in the source code during build time.

  Now, what Netlify CMS allows us to do is to have a possiblity to manage content and transform it into Markdown files.
  It would also automatically create a commit to our Git repository since any content changes will also be considered 
  as a code change due to the nature of our stack. 
  
  Our repository would serve as the persistence layer for our content with Markdown files as the medium.
  
  All of these tools perfectly fits our requirement of having a blog website with no backend maintenance even though we kinda have *"dynamic"* content.
  Also with the added benefit of static websites for being fast, secure and virtually no cost to maintain.

  ---

  ## Let's talk about some code!

  For starters, we need to understand Next.js APIs since we are going to use it to build static content.

  Next.js have a *file-system based routing*. In the root directory of your project, the **page** folder would contain all pages for your application.

  Each `pages` could export utility functions **getStaticProps** and **getServerSideProps**.

  `getServerSideProps` are being used for server-side rendering, using it would opt-out to Automatic Static Optimization feature of Next.js.
  For our use case, we will use `getStaticProps` to build static pages with prefetched data from our CMS.

  ### `getStaticProps`

  This function could be used to fetch data at build-time and generate HTML pages. For dynamic pages, we need to use `getStaticProps` with `getStaticPaths` to explicitly specify the list of paths that have to be rendered to HTML at build-time. `getStaticPaths` function should also be exported in the `page`.

  Assuming that you have a dynamic blog post page at `pages/posts/[slug].jsx`.

  Here is a sample code on how these functions could be used to generate static blog post pages.
  ```js
  // pages/posts/[slug].jsx
  import React from 'react';
  import getPostBySlug from './api/getPostBySlug';
  import getAllPosts from './api/getAllPosts';

  // Blog Post Page Component
  const PostPage = (props) => {
    const { post } = props;
    const { title, author, content } = post;

    return (
      <div>
        <span>{title}</span>
        <span>{author}</span>
        <p>{content}</p>
      </div>
    )
  };

  // compile paths for each post with params object containing the post slug.
  // note that in `[slug].jsx`, the `slug` key was defined to be read in the params object.  
  export const getStaticPaths = async () => {
    // fetch all posts
    const posts = getAllPosts();

    const postsPaths = posts.map((post) => ({
      params: {
        slug: posts.slug,
      },
    }));

    return {
      paths: postsPaths,
      fallback: false,
    };
  };

  // For each post context, map its contents to the blog post component
  export const getStaticProps = async (ctx) => {
    const { params } = ctx

    // fetch post content by its slug
    const post = getPostBySlug(params.slug);

    return {
      props: {
        post: {
          title: post.title,
          author: post.author,
          content: post.content,
        },
      },
    }
  };

  export default PostPage;
  ```

  For the functions `getPostBySlug` and `getAllPosts`, we read content files from e.g `contents/posts` in order to transform it with `gray-matter` to convert contents of the markdown file into JSON data.

  ```js
  import fs from 'fs'
  import { join } from 'path'
  import matter from 'gray-matter'

  const postsDirectory = join(process.cwd(), 'contents/posts')

  export const getPostSlugs = () => {
    return fs.readdirSync(postsDirectory)
  }

  export const getPostBySlug = (slug, fields = []) => {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(postsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // This is the output data after parsing the markdown file contents.
    const { data, content } = matter(fileContents)

    const items = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = realSlug
      }
      if (field === 'content') {
        items[field] = content
      }

      if (data[field]) {
        items[field] = data[field]
      }
    })

    return items
  }

  export const getAllPosts = (fields = []) => {
    const slugs = getPostSlugs()
    const posts = slugs
      .map((slug) => getPostBySlug(slug, fields))
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

    return posts
  }
  ```

  ### Markdown

  Here is a sample markdown content which contains `data` and `content`. The `data` corresponds to the upper section of the file while the `content` corresponds in the bottom section.
  ```md
  ---
  title: Hello World
  author: John Doe
  ---
  # Hello World
  This is markdown string content.
  ```

  The `content` is the string that is still in markdown format. We need to parse this `content` into HTML format string so that we could 
  render it and inject styling.

  We could use `react-markdown`. We just need to pass the `content` as props in the component and it would already parsed it into HTML and renders it. What so good about this is that you could actually extend and override the styling for some HTML components.

  ### Integrating Netlify CMS into codebase
  
  Netlify CMS only requires us to expose certain files publicly.
  - `public/admin/config.yml`
  - `public/admin/index.html`

  For more information you could check this [link](https://www.netlifycms.org/docs/add-to-your-site/#app-file-structure)

  The `config.yml` is where we configure the CMS. These includes the widgets, content types, media folders, backend information, etc.

  For our use case, we will follow the [Github](https://www.netlifycms.org/docs/github-backend/) integration process since its free to use and very common.

  Here is a sample `config.yml`.
  ```yaml
  backend:
    name: github
    repo: owner/my-website
    branch: master
    commit_messages:
      create: Create {{collection}} “{{slug}}”
      update: Update {{collection}} “{{slug}}”
      delete: Delete {{collection}} “{{slug}}”
      uploadMedia: Upload “{{path}}”
      deleteMedia: Delete “{{path}}”
      openAuthoring: '{{message}}'
  media_folder: public/assets
  public_folder: public
  collections:
    - name: "blog-post"
      label: "Blog Posts"
      create: true
      folder: /contents/posts
      fields:
        - label: "Title"
          name: "title"
          widget: "string"
        - label: "Author"
          name: "author"
          widget: "string"
        - label: "Content"
          name: "content"
          widget: "markdown"
  ```
  As you could see, the configuration is very intuitive. Looking at the configuration, we know that we are using github as backend with specified repository and branch. The repository and branch specified would represent the website source code and any changes that will occur would trigger a build in Netlify.

  `collections` are the content types of the CMS which in our case were the blog posts. Each content types has its own `fields` and each `field` should have a `widget` that would also determine its data type. It also specified the source folder of the markdown files where it stores the created blog posts data.

  After the configuration, the codebase should be ready.

  ## Create Site in Netlify

  First, you need to have a Netlify account to be able to create site.

  Connect your repository hosted on Github and configure the site settings. Make sure to specify the branch e.g *master*, build command and the output directory of the build where Netlify will serve the contents of the website.

  Once you have created your site, it would automatically pull the source code and starts the build. Once the build is finished, the site is now live.

  ### Note:

  In order for us to authenticate into our CMS, we need to add Github as OAuth2 authentication provider by supplying `Client ID` and `Client Secret` to our Netlify Site. You could follow the steps provided on [here](https://docs.netlify.com/visitor-access/oauth-provider-tokens/).

  ## Accessing Netlify CMS

  We could access the CMS through this route `/admin/index.html` but it would require us to authenticate first on Github before we could proceed.

  Once logged in, it would look something like this.

  ![netlify-cms-snapshot.jpg](/assets/netlify-cms-snap.jpg "Netlify CMS - Dashboard")

  We can create, update, delete blog posts. We could also attach media files that we could later use for our blog posts. Any changes would automatically push a commit to our Github, thus trigger a build in Netlify, redeploying our website with new changes/contents.

  # Congratulations!

  We have finally created our Next.js website utilizing Netlify CMS and Github with the added benefits of static websites. 
  
  The stack follows the concept of **Jamstack**. If you want to learn more, check out its website at [https://jamstack.org/](https://jamstack.org/).
  
  You could view the full source code of my website on my [Github](https://github.com/brianpunzalan/my-website).

---
