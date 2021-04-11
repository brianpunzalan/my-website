import React, { ReactNode } from 'react'
// import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import styled from 'styled-components'
import RootLayout from './Root'

interface Props {
  children: ReactNode
}

const Container = styled.div`
  margin: auto;
  padding-top: 1.875em;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1.875em;
  @media screen and (min-width: ${(props) => props.theme.breakpointLG}) {
    padding-top: 1.875em;
    padding-left: 4.6875em;
    padding-right: 4.6875em;
    padding-bottom: 3.125em;
    max-width: ${(props) => props.theme.breakpointLG};
  }
`

const Branding = styled.div`
  padding: 10px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.secondaryColorContrast};
  color: ${(props) => props.theme.secondaryColor};
  transition: transform 0.3s;

  :hover {
    transform: translateY(4px);
  }
`

const BrandingAnchor = styled.a`
  text-decoration: none;
  font-weight: 700;
  font-size: 1.75rem;
  color: inherit;
`

const Navigation = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: inherit;
  margin-bottom: 25px;

  @media screen and (min-width: ${(props) => props.theme.breakpointLG}) {
    justify-content: space-between;
  }
`

// const Nav = styled.nav`
//   display: flex;
//   justify-content: space-evenly;
//   align-items: center;
// `

// const NavAnchor = styled.a`
//   padding: 10px;
//   text-decoration: none;
//   color: inherit;
//   font-weight: 700;
//   border-radius: 4px;

//   &.active {
//     border: 4px solid ${(props) => props.theme.primaryColor};
//   }
// `

const BrandingLink: React.FC<LinkProps> = (props) => {
  const { as, href, children } = props

  return (
    <Link as={as} href={href} passHref>
      <BrandingAnchor>{children}</BrandingAnchor>
    </Link>
  )
}

// interface NavLinkProps extends LinkProps {
//   active?: boolean
// }

// const NavLink: React.FC<NavLinkProps> = (props) => {
//   const { as, href, children, active } = props

//   return (
//     <Link as={as} href={href} passHref>
//       <NavAnchor className={clsx(active && 'active')}>{children}</NavAnchor>
//     </Link>
//   )
// }

const DefaultLayout: React.FC<Props> = (props) => {
  const { children } = props

  return (
    <RootLayout>
      <Container>
        <Navigation>
          <Branding>
            <BrandingLink href="/">{'/brian.punzalan/'}</BrandingLink>
          </Branding>
          {/* <Nav>
            <NavLink href="/blog">Blog</NavLink>
          </Nav> */}
        </Navigation>
        {children}
      </Container>
    </RootLayout>
  )
}

export default DefaultLayout
