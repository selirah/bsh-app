import React, { useState } from 'react'
import { Input } from 'components'

export default function Home() {
  const [password, setPassword] = useState('')

  console.log(password)

  return (
    <div className="px-8 mt-10 m-56">
      <Input.Phone
        onSetPhone={setPassword}
        value={password}
        label="Phone"
        placeholder="Enter Phone"
        size="md"
      />
    </div>
  )
}
