/* eslint-disable no-console */
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import okaidia from 'react-syntax-highlighter/dist/cjs/styles/prism/okaidia'

interface Props {
  value: string
  language: string
}

const Code: React.FC<Props> = (props) => {
  const { value, language } = props

  return (
    <SyntaxHighlighter style={okaidia} language={language}>
      {value}
    </SyntaxHighlighter>
  )
}

export default Code
