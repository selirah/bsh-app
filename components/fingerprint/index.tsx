import { MdFingerprint } from 'react-icons/md'
import classnames from 'classnames'

type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Colors =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'

interface FingerPrintProps {
  size?: Sizes
  color?: Colors
}

export const FingerPrint: React.FC<FingerPrintProps> = (props) => {
  const { size, color } = props
  return (
    <MdFingerprint
      className={classnames('', {
        'w-[50px] h-[50px]': size === 'xs',
        'w-[100px] h-[100px]': size === 'sm',
        'w-[150px] h-[150px]': size === 'md' || !size,
        'w-[200px] h-[200px]': size === 'lg',
        'w-[250px] h-[250px]': size === 'xl',
        'text-light-text dark:text-dark-text': color === 'default' || !color,
        'text-primary': color === 'primary',
        'text-secondary': color === 'secondary',
        'text-accent': color === 'accent',
        'text-success-avatar': color === 'success',
        'text-error-avatar': color === 'error',
        'text-info-avatar': color === 'info',
        'text-warning-avatar': color === 'warning'
      })}
    />
  )
}
