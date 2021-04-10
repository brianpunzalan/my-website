/* eslint-disable no-console */
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

interface Props {
  value: string
  language: string
}

const Code: React.FC<Props> = (props) => {
  const { value, language } = props

  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>
}

export default Code
