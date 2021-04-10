import React, { ReactNode } from 'react'
import styled from 'styled-components'
import DeveloperActivity from '../svgs/DeveloperActivity'
import DefaultLayout from './Default'

interface Props {
  sidebar: ReactNode
  children: ReactNode
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: inherit;
  margin-bottom: 20px;
`

const SideSection = styled.aside`
  display: block;
  padding-top: 50px;
  width: 45%;

  h1 {
    font-size: 2rem;
    line-height: 1.5;
  }
  h2 {
    font-size: 1.75rem;
    line-height: 2.5;
  }
  span {
    padding: 5px;
    border-radius: 4px;
    border: 4px solid ${(props) => props.theme.tertiaryBlueColor};
    color: ${(props) => props.theme.tertiaryBlueColor};
    font-size: inherit;
    font-weight: inherit;

    :hover {
      cursor: default;
      transition: color 0.3s, border-color 0.3s;
      border-color: ${(props) => props.theme.tertiaryYellowColor};
      color: ${(props) => props.theme.tertiaryYellowColor};
    }
  }
`

const AnimationSection = styled.section`
  display: block;
  width: 55%;
`

const ContentSection = styled.section`
  display: block;
  width: 100%;
  color: inherit;
`

const HomeLayout: React.FC<Props> = (props) => {
  const { children } = props

  return (
    <DefaultLayout>
      <FlexContainer>
        <SideSection>
          <h1>Welcome to my Website!</h1>
          <h2>
            I build <span>software</span> applications focusing on the{' '}
            <span>Web</span>
          </h2>
        </SideSection>
        <AnimationSection>
          <DeveloperActivity />
        </AnimationSection>
      </FlexContainer>
      <ContentSection>{children}</ContentSection>
    </DefaultLayout>
  )
}

export default HomeLayout
