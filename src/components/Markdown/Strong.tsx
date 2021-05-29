import styled from 'styled-components'

const Strong = styled.strong`
  padding-left: 2px;
  padding-right: 2px;
  background-color: ${(props) => props.theme.tertiaryYellowColor};
  color: ${(props) => props.theme.tertiaryYellowColorContrast};
`

export default Strong
