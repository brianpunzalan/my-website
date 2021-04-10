import React, { ReactNode } from 'react'
import styled from 'styled-components'
import DefaultLayout from './Default'

interface Props {
  children: ReactNode
}

const Container = styled.div`
  display: block;
  max-width: 720px;
  margin: auto;
`

const ContentSection = styled.section`
  display: block;
  width: 100%;
`

const PostLayout: React.FC<Props> = (props) => {
  const { children } = props

  return (
    <DefaultLayout>
      <Container>
        <ContentSection>{children}</ContentSection>
      </Container>
    </DefaultLayout>
  )
}

export default PostLayout
