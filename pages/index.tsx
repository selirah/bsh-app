import React, { useState } from 'react'
import { Checkbox } from 'components'

export default function Home() {
  const [check, setCheck] = useState(false)

  console.log(check)

  return (
    <div className="px-8 mt-10 m-56">
      {/* <Checkbox.Simple
        size="md"
        label="Free shipping via Flowbite"
        name="check"
        onChange={(e) => setCheck(e.target.checked)}
        value={check}
        direction="right"
      /> */}

      <Checkbox.HelpText
        size="md"
        label="Free shipping via Flowbite"
        name="check"
        onChange={(e) => setCheck(e.target.checked)}
        helpText="For orders shipped from $25 in books or $29 in other categories"
        direction="left"
        value="yes"
      />
    </div>
  )
}
