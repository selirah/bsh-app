import React, { useState } from 'react'
import { Input } from '../components'

type Option = {
  label: string
  value: string | number
}

const list: Option[] = [
  {
    label: 'USD',
    value: 'USD'
  },
  {
    label: 'GHS',
    value: 'GHS'
  }
]

export default function Home() {
  const [value, setValue] = useState('')
  const [data, setData] = useState<Option>(list[0])

  return (
    <div className="px-8 mt-10">
      <Input.Dropdown
        label="Amount"
        name="name"
        type="number"
        value={value}
        placeholder="Input name"
        onChange={(e) => setValue(e.target.value)}
        size="md"
        setSelected={setData}
        list={list}
        selected={data}
      />
    </div>
  )
}
