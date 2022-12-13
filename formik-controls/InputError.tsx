import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import classnames from 'classnames'

type Props = {
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

const InputError: React.FC<Props> = (props) => {
  const { size, children } = props
  return (
    <div className="mt-[8px] items-center flex">
      <FiAlertCircle
        className={classnames('flex-shrink-0 inline mr-[4px] text-error', {
          'w-4 h-4': size === 'sm',
          'w-5 h-5': size === 'md' || !size || size === 'lg'
        })}
      />
      <span
        className={classnames('font-montserrat font-regular text-error', {
          'text-pSmall': size === 'sm',
          'text-pNormal': size === 'md' || !size || size === 'lg'
        })}
      >
        {children}
      </span>
    </div>
  )
}

export default InputError
