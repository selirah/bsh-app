import React from 'react'
import { CodeInput } from 'components'

const CodeInputTest = () => {
  const [codeInput, setCodeInput] = React.useState('')

  return (
    <div className="px-4 m-56">
      <CodeInput onChange={(e) => setCodeInput(e)} size="md" />

      <div className="mt-8">
        <pre>Value: {codeInput}</pre>
      </div>
    </div>
  )
}
export default CodeInputTest
