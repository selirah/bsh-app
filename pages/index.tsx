import React, { useState } from 'react'
import { Input } from 'components'

export default function Home() {
  const [value, setValue] = useState('')

  return (
    <div className="px-8 mt-10 m-56">
      <Input.Textarea
        label="Default Range"
        name="value"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder="type something . . ."
        size="md"
      />
    </div>
  )
}
