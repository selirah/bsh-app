import React from 'react'
import Image from 'next/image'
import classnames from 'classnames'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AvatarState = 'success' | 'error' | 'warning' | 'info'
type IconColor = 'success' | 'error' | 'warning' | 'info'
type InitalsColor = 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'error' | 'warning'

interface AvatarProps {
  size: AvatarSize
  circular?: boolean
}

const AvatarSizes = {
  xs: 40,
  sm: 50,
  md: 60,
  lg: 70,
  xl: 80
}

interface ImgProps extends AvatarProps {
  src: string
  state?: AvatarState
}

interface InitialsProps extends AvatarProps {
  initials: string
  state?: AvatarState
  bgColor?: InitalsColor
}

interface IconProps extends AvatarProps {
  IconSVG: React.FC<React.SVGProps<SVGSVGElement>>
  color: IconColor
}

export const Img: React.FC<ImgProps> = (props) => {
  const { src, size, circular, state } = props

  return (
    <div className="relative">
      <Image
        className={classnames('object-cover', {
          'rounded-full': circular,
          rounded: !circular,
          'w-[40px] h-[40px]': size === 'xs',
          'w-[50px] h-[50px]': size === 'sm',
          'w-[60px] h-[60px]': size === 'md',
          'w-[70px] h-[70px]': size === 'lg',
          'w-[80px] h-[80px]': size === 'xl'
        })}
        src={src}
        alt="avatar"
        width={AvatarSizes[size]}
        height={AvatarSizes[size]}
        unoptimized
      />
      {state ? (
        <span
          className={classnames(
            'bottom-0 left-9 absolute border-2 border-light-btnText dark:border-gray-800 rounded-full',
            {
              'bg-success-avatar': state === 'success',
              'bg-error-avatar': state === 'error',
              'bg-warning-avatar': state === 'warning',
              'bg-info-avatar': state === 'info',
              'left-7 w-3 h-3': size === 'xs',
              'left-8 w-3 h-3': size === 'sm',
              'left-10 w-4 h-4': size === 'md',
              'left-12 w-4 h-4': size === 'lg',
              'left-14 w-5 h-5': size === 'xl'
            }
          )}
        ></span>
      ) : null}
    </div>
  )
}

export const Initals: React.FC<InitialsProps> = (props) => {
  const { initials, size, circular, state, bgColor } = props

  return (
    <div className="relative">
      <div
        className={classnames(
          'inline-flex overflow-hidden relative justify-center items-center text-light-btnText',
          {
            'rounded-full': circular,
            rounded: !circular,
            'w-[40px] h-[40px]': size === 'xs',
            'w-[50px] h-[50px]': size === 'sm',
            'w-[60px] h-[60px]': size === 'md',
            'w-[70px] h-[70px]': size === 'lg',
            'w-[80px] h-[80px]': size === 'xl',
            'bg-primary': bgColor === 'primary' || !bgColor,
            'bg-secondary': bgColor === 'secondary',
            'bg-accent': bgColor === 'accent',
            'bg-success-avatar': bgColor === 'success',
            'bg-error-avatar': bgColor === 'error',
            'bg-info-avatar': bgColor === 'info',
            'bg-warning-avatar': bgColor === 'warning'
          }
        )}
      >
        <span className="font-medium text-light-btnText font-lato">{initials}</span>
      </div>
      {state ? (
        <span
          className={classnames(
            'bottom-0 left-9 absolute w-4 h-4 border-2 border-light-btnText dark:border-gray-800 rounded-full',
            {
              'bg-success-avatar': state === 'success',
              'bg-error-avatar': state === 'error',
              'bg-warning-avatar': state === 'warning',
              'bg-info-avatar': state === 'info',
              'left-7 w-3 h-3': size === 'xs',
              'left-8 w-3 h-3': size === 'sm',
              'left-10 w-4 h-4': size === 'md',
              'left-12 w-4 h-4': size === 'lg',
              'left-14 w-5 h-5': size === 'xl'
            }
          )}
        ></span>
      ) : null}
    </div>
  )
}

export const Icon: React.FC<IconProps> = (props) => {
  const { IconSVG, size, circular, color } = props

  return (
    <div
      className={classnames('inline-flex overflow-hidden relative justify-center items-center', {
        'rounded-full': circular,
        rounded: !circular,
        'w-[10px] h-[10px]': size === 'xs',
        'w-[20px] h-[20px]': size === 'sm',
        'w-[30px] h-[30px]': size === 'md',
        'w-[40px] h-[40px]': size === 'lg',
        'w-[50px] h-[50px]': size === 'xl',
        'bg-success-container': color === 'success',
        'bg-error-container': color === 'error',
        'bg-info-container': color === 'info',
        'bg-warning-container': color === 'warning'
      })}
    >
      <span className="font-medium text-light-btnText font-lato">
        <IconSVG
          className={classnames('', {
            'w-4 h-4': size === 'xs',
            'w-5 h-5': size === 'sm',
            'w-6 h-6': size === 'md',
            'w-7 h-7': size === 'lg',
            'w-8 h-8': size === 'xl',
            'text-success-avatar': color === 'success',
            'text-error-avatar': color === 'error',
            'text-info-text': color === 'info',
            'text-warning-text': color === 'warning'
          })}
          aria-hidden="true"
        />
      </span>
    </div>
  )
}
