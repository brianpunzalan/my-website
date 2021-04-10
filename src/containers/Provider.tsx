import React, { ReactNode } from 'react'
import ThemeProvider from '../providers/Theme'

interface Props {
  children: ReactNode
}

const Provider: React.FC<Props> = (props) => {
  const { children } = props

  return (
    <div id="provider">
      <ThemeProvider>{children}</ThemeProvider>
    </div>
  )
}

export default Provider
