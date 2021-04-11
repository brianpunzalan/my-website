import React, { ReactNode } from 'react'
import { Normalize } from 'styled-normalize'
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  color: inherit;
  body {
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }
`

const RootContainer = styled.div`
  background-color: ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.secondaryColorContrast};
  min-height: 100vh;
`

interface Props {
  children: ReactNode
}

const RootLayout: React.FC<Props> = (props) => {
  const { children } = props

  return (
    <RootContainer id="root">
      <Normalize />
      <GlobalStyle />
      <main>{children}</main>
    </RootContainer>
  )
}

export default RootLayout
