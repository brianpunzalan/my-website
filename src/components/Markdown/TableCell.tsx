import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  isHeader: boolean
  align: 'right' | 'left' | 'center'
  children: ReactNode
}

const TableCell = styled.td`
  padding: 5px;
  text-align: ${(props) => {
    if (props.align === 'right') return 'right'
    else if (props.align === 'left') return 'left'
    else return 'center'
  }};
`
const TableCellHead = styled.th`
  padding: 5px;
  border-bottom: 0.125rem solid ${(props) => props.theme.tertiaryBlueColor};
  text-align: ${(props) => {
    if (props.align === 'right') return 'right'
    else if (props.align === 'left') return 'left'
    else return 'center'
  }};
`

const TableCellWrapper: React.FC<Props> = (props) => {
  const { children, align, isHeader } = props

  if (isHeader) {
    return <TableCellHead align={align}>{children}</TableCellHead>
  } else {
    return <TableCell align={align}>{children}</TableCell>
  }
}

export default TableCellWrapper
