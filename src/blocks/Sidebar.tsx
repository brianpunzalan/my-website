import React from 'react'
import styled from 'styled-components'
import Avatar from '../components/Avatar'

const Container = styled.div`
  padding: 25px;
  display: flex;
  justify-content: center;
`

const SideBar: React.FC = () => {
  return (
    <Container>
      <Avatar src="/assets/avatar.jpg" />
    </Container>
  )
}

export default SideBar
