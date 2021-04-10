import React, { FunctionComponent } from 'react'
import ReactMarkdown, { NodeType } from 'react-markdown'
import gfm from 'remark-gfm'
import Blockquote from './Blockquote'
import Code from './Code'
import Emphasis from './Emphasis'
import ImageReference from './ImageReference'
import InlineCode from './InlineCode'
import LinkReference from './LinkReference'
import Paragraph from './Paragraph'
import Strong from './Strong'
import ThematicBreak from './ThematicBreak'
import Image from './Image'
import Link from './Link'
import Table from './Table'
import TableCellWrapper from './TableCell'
import TableRow from './TableRow'

interface Props {
  children: string
}

const markdownPlugins = [gfm]

type Renderers = {
  [type in NodeType]: FunctionComponent
}

const renderers: Partial<Renderers> = {
  blockquote: Blockquote,
  thematicBreak: ThematicBreak,
  code: Code,
  inlineCode: InlineCode,
  emphasis: Emphasis,
  linkReference: LinkReference,
  paragraph: Paragraph,
  strong: Strong,
  imageReference: ImageReference,
  image: Image,
  link: Link,
  table: Table,
  tableCell: TableCellWrapper,
  tableRow: TableRow,
}

const Markdown: React.FC<Props> = (props) => {
  const { children } = props

  return (
    <ReactMarkdown skipHtml renderers={renderers} plugins={markdownPlugins}>
      {children}
    </ReactMarkdown>
  )
}

export default Markdown
