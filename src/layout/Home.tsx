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

const SideSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  transition: padding-top 0.3s;

  h1 {
    font-size: calc(24px + 8 * ((100vw - 320px) / 708));
    line-height: 1.5;
  }
  p {
    font-size: calc(20px + 8 * ((100vw - 320px) / 708));
    line-height: 2.5;
    text-align: center;
    max-width: 370px;
    margin: auto;

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
  }

  @media screen and (min-width: ${(props) => props.theme.breakpointM}) {
    p {
      max-width: 420px;
    }
  }

  @media screen and (min-width: ${(props) => props.theme.breakpointLG}) {
    display: block;
    width: 435px;
    padding-top: 50px;

    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 1.75rem;
      text-align: left;
      margin: unset;
    }
  }
`

const AnimationSection = styled.div`
  display: none;
  @media screen and (min-width: ${(props) => props.theme.breakpointLG}) {
    display: block;
    width: 45%;
  }
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
          <p>
            I build <span>software</span> applications focusing on the{' '}
            <span>Web</span>
          </p>
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
