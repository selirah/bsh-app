import React from 'react'
import Image from 'next/image'
import classnames from 'classnames'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AvatarState = 'success' | 'error' | 'warning' | 'info'
type IconColor = 'success' | 'error' | 'warning' | 'info'
type InitalsColor = 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'error' | 'warning'

type AvatarProps = {
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

type ImgProps = AvatarProps & {
  src: string
  state?: AvatarState
}

type InitialsProps = AvatarProps & {
  initials: string
  state?: AvatarState
  bgColor?: InitalsColor
}

type IconProps = AvatarProps & {
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
          'w-[30px] h-[30px]': size === 'xs',
          'w-[40px] h-[40px]': size === 'sm',
          'w-[50px] h-[50px]': size === 'md',
          'w-[60px] h-[60px]': size === 'lg',
          'w-[70px] h-[70px]': size === 'xl'
        })}
        src={src}
        alt="avatar"
        width={AvatarSizes[size]}
        height={AvatarSizes[size]}
        unoptimized
        priority
      />
      {state ? (
        <span
          className={classnames(
            'bottom-0 left-9 absolute border-2 border-light-btnText dark:border-gray-800 rounded-full',
            {
              'bg-success': state === 'success',
              'bg-error': state === 'error',
              'bg-warning': state === 'warning',
              'bg-info': state === 'info',
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
            'w-[30px] h-[30px]': size === 'xs',
            'w-[40px] h-[40px]': size === 'sm',
            'w-[50px] h-[50px]': size === 'md',
            'w-[60px] h-[60px]': size === 'lg',
            'w-[70px] h-[70px]': size === 'xl',
            'bg-primary': bgColor === 'primary' || !bgColor,
            'bg-secondary': bgColor === 'secondary',
            'bg-accent': bgColor === 'accent',
            'bg-success': bgColor === 'success',
            'bg-error': bgColor === 'error',
            'bg-info': bgColor === 'info',
            'bg-warning': bgColor === 'warning'
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
              'bg-success': state === 'success',
              'bg-error': state === 'error',
              'bg-warning': state === 'warning',
              'bg-info': state === 'info',
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
        'bg-success-light': color === 'success',
        'bg-error-light': color === 'error',
        'bg-info-light': color === 'info',
        'bg-warning-light': color === 'warning'
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
            'text-success': color === 'success',
            'text-error': color === 'error',
            'text-info': color === 'info',
            'text-warning': color === 'warning'
          })}
          aria-hidden="true"
        />
      </span>
    </div>
  )
}
