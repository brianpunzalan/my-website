import React, { ReactNode } from 'react'
import { Normalize } from 'styled-normalize'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  color: inherit;
  body {
    font-family: 'M PLUS Rounded 1c', sans-serif;
  }
`

interface Props {
  children: ReactNode
}

const RootLayout: React.FC<Props> = (props) => {
  const { children } = props

  return (
    <div id="root">
      <Normalize />
      <GlobalStyle />
      <main>{children}</main>
    </div>
  )
}

export default RootLayout
