import React from 'react'
import styled from 'styled-components'

interface Props {
  src: string
}

const Container = styled.div`
  overflow: hidden;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  border-radius: 50%;
`

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  text-align: center;
  color: transparent;
`

const Avatar: React.FC<Props> = (props) => {
  const { src } = props

  return (
    <Container>
      <Image src={src} alt="Avatar" />
    </Container>
  )
}

export default Avatar
