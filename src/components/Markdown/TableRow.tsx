import styled from 'styled-components'

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${(props) => props.theme.primaryColorOpaque};
    color: ${(props) => props.theme.primaryColor};
  }
`

export default TableRow
