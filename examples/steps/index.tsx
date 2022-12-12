import { useState } from 'react'
import { ProgressStep } from 'controllers'
import { Button } from 'components'

const Steps = () => {
  const [active, setActive] = useState(1)
  const totalSteps = 4
  const [success, setSuccess] = useState(false)

  const decrement = () => {
    if (active > 1) {
      setSuccess(false)
      setActive((prev) => prev - 1)
    }
  }

  const increment = () => {
    if (active < totalSteps) {
      setActive((prev) => prev + 1)
    }
  }

  return (
    <div className="block bg-light-container dark:bg-dark-container shadow-penumbra rounded">
      <ProgressStep
        totalSteps={totalSteps}
        active={active}
        titles={['Customer Search', 'Form', 'Documents', 'Preview']}
        success={success}
      />

      <Button onClick={decrement}>Prev</Button>
      <Button onClick={increment}>Next</Button>
      <Button onClick={() => setSuccess(!success)}>Success</Button>
    </div>
  )
}

export default Steps
