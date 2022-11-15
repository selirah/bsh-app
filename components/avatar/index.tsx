import React from 'react'
import Image from 'next/image'
import classnames from 'classnames'

type AvatarTypes = 'image' | 'initials'
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type AvatarState = 'success' | 'error' | 'warning' | 'info'

interface AvatarProps {
  type: AvatarTypes
  size: AvatarSize
  src: string
  circular?: boolean
  state?: AvatarState
  initials?: string
}

const AvatarSizes = {
  xs: 40,
  sm: 50,
  md: 60,
  lg: 70,
  xl: 80
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { type, src, size, circular, state, initials } = props

  const renderAvatar = () => {
    switch (type) {
      case 'image':
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

      default:
        return (
          <div className="relative">
            <div
              className={classnames(
                'inline-flex overflow-hidden relative justify-center items-center bg-light-form-placeholder',
                {
                  'rounded-full': circular,
                  rounded: !circular,
                  'w-[40px] h-[40px]': size === 'xs',
                  'w-[50px] h-[50px]': size === 'sm',
                  'w-[60px] h-[60px]': size === 'md',
                  'w-[70px] h-[7px]': size === 'lg',
                  'w-[80px] h-[80px]': size === 'xl'
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
  }

  return renderAvatar()
}
