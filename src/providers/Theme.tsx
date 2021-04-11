import React, { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

export interface Theme {
  primaryColor: string
  primaryColorOpaque: string
  primaryColorContrast: string
  secondaryColor: string
  secondaryColorOpaque: string
  secondaryColorContrast: string
  tertiaryBlueColor: string
  tertiaryBlueColorContrast: string
  tertiaryYellowColor: string
  tertiaryYellowColorContrast: string
  breakpointXS: string
  breakpointSM: string
  breakpointM: string
  breakpointLG: string
  breakpointXL: string
}

const theme: Theme = {
  primaryColor: '#fff',
  primaryColorOpaque: 'rgba(255,255,255, 0.3)',
  primaryColorContrast: '#000',
  secondaryColor: '#000',
  secondaryColorOpaque: 'rgba(0,0,0, 0.3)',
  secondaryColorContrast: '#fff',
  tertiaryBlueColor: '#3a86ff',
  tertiaryBlueColorContrast: '#fff',
  tertiaryYellowColor: '#e9c46a',
  tertiaryYellowColorContrast: '#000',
  breakpointXS: '320px',
  breakpointSM: '425px',
  breakpointM: '768px',
  breakpointLG: '1024px',
  breakpointXL: '1440px',
}

interface Props {
  children: ReactNode
}

const ThemeProviderWrapper: React.FC<Props> = (props) => {
  const { children } = props

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeProviderWrapper
