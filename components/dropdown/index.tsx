import React, { Fragment, useEffect, useState } from 'react'
import { Menu } from '@headlessui/react'
import { FiChevronDown, FiMoreVertical } from 'react-icons/fi'
import { Float } from '@headlessui-float/react'
import classnames from 'classnames'
import Link from 'next/link'

export type DropdownList = {
  title: string
  link?: string
  onClick?: (value?: unknown) => void
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  inaccessible?: boolean
}

type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonColor = 'primary' | 'error' | 'success' | 'accent'

type DropdownProps = {
  actions: DropdownList[]
}

type BottonProps = DropdownProps & {
  btnTitle: string
  size?: ButtonSize
  outline?: boolean
  pill?: boolean
  color?: ButtonColor
}

type KhebabProps = DropdownProps & {
  size?: ButtonSize
}

export const Button: React.FC<BottonProps> = (props) => {
  const { actions, btnTitle, size, outline, pill, color } = props
  const [mounted, setMounted] = useState(false)
  const [rippling, setRippling] = useState(false)
  const [coords, setCoords] = useState({ x: -1, y: -1 })

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (mounted) {
      if (coords.x !== -1 && coords.y !== -1) {
        setRippling(true)
        setTimeout(() => setRippling(false), 500)
      } else {
        setRippling(false)
      }
    }
  }, [coords, mounted])

  useEffect(() => {
    if (mounted) {
      if (!rippling) setCoords({ x: -1, y: -1 })
    }
  }, [rippling, mounted])

  return (
    <div className="flex justify-center items-center">
      <Menu>
        <Float
          placement="bottom-end"
          offset={8}
          flip
          shift={6}
          portal
          enter="transition duration-200 ease-out"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition duration-150 ease-in"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
          tailwindcssOriginClass
        >
          <Menu.Button
            className={classnames(
              'flex justify-center items-center px-[24px] py-[10px] font-lato common-transition text-center rounded',
              {
                rounded: !pill,
                'rounded-full': pill,
                'h-[40px] text-pSmall': size === 'sm',
                'h-[45px] text-pNormal': size === 'md' || !size,
                'h-[50px] text-pLarge': size === 'lg',
                'text-light-btnText': !outline,
                'bg-primary hover:bg-primary-dark': (!color || color === 'primary') && !outline,
                'bg-error hover:bg-error-dark': color === 'error' && !outline,
                'bg-success hover:bg-success-dark': color === 'success' && !outline,
                'bg-accent hover:bg-accent-dark': color === 'accent' && !outline,
                'border-2 font-bold': outline,
                'border-primary text-primary': outline && color === 'primary',
                'border-error text-error': outline && color === 'error',
                'border-success text-success': outline && color === 'success',
                'border-accent text-accent': outline && color === 'accent'
              }
            )}
            onClick={(e: any) => {
              const rect = e.target as HTMLFormElement
              const r = rect.getBoundingClientRect()
              setCoords({ x: e.clientX - r.left, y: e.clientY - r.top })
            }}
          >
            {btnTitle}
            <FiChevronDown
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
            {rippling ? (
              <span className="waves-ripple" style={{ left: coords.x, top: coords.y }}></span>
            ) : null}
          </Menu.Button>

          <Menu.Items className="border border-light-border dark:border-dark-border mt-2 w-64 rounded shadow-penumbra focus:outline-none bg-light-container dark:bg-dark-container overflow-hidden">
            {actions.map((action) => (
              <Fragment key={action.title}>
                {!action.inaccessible ? (
                  <Menu.Item key={action.title}>
                    {({ active }) =>
                      action.link ? (
                        <Link href={action.link}>
                          <button
                            className={classnames(
                              'group flex w-full items-center rounded px-[12px] py-[12px] text-sm font-montserrat font-regular text-pSmall',
                              {
                                'bg-primary text-light-btnText': active,
                                'text-light-text dark:text-dark-text': !active
                              }
                            )}
                          >
                            {action.IconSVG ? (
                              <action.IconSVG className="mr-2 h-4 w-4" aria-hidden="true" />
                            ) : null}
                            {action.title}
                          </button>
                        </Link>
                      ) : (
                        <button
                          className={classnames(
                            'group flex w-full items-center rounded px-[12px] py-[12px] text-sm font-montserrat font-regular text-pSmall disabled:text-accentLight',
                            {
                              'bg-primary text-light-btnText': active,
                              'text-light-text dark:text-dark-text': !active
                            }
                          )}
                          onClick={action.onClick}
                        >
                          {action.IconSVG ? (
                            <action.IconSVG className="mr-2 h-4 w-4" aria-hidden="true" />
                          ) : null}
                          {action.title}
                        </button>
                      )
                    }
                  </Menu.Item>
                ) : null}
              </Fragment>
            ))}
          </Menu.Items>
        </Float>
      </Menu>
    </div>
  )
}

export const Khebab: React.FC<KhebabProps> = (props) => {
  const { actions, size } = props

  return (
    <div className="relative flex justify-center items-center">
      <Menu>
        <Float
          placement="bottom-end"
          offset={8}
          flip
          shift={6}
          portal
          enter="transition duration-200 ease-out"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition duration-150 ease-in"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
          tailwindcssOriginClass
        >
          <Menu.Button className={classnames('flex justify-center items-center text-center')}>
            <FiMoreVertical
              className={classnames(
                'text-light-text dark:text-dark-text hover:text-dark-btnText dark:hover:text-light-btnText common-transition',
                {
                  'w-3 h-3': size === 'sm',
                  'w-4 h-4': size === 'md' || !size,
                  'w-5 h-5': size === 'lg'
                }
              )}
              aria-hidden="true"
            />
          </Menu.Button>
          <Menu.Items className="border border-light-border dark:border-dark-border mt-2 w-64 rounded shadow-penumbra focus:outline-none bg-light-container dark:bg-dark-container overflow-hidden">
            {actions.map((action) => (
              <Fragment key={action.title}>
                {!action.inaccessible ? (
                  <Menu.Item key={action.title}>
                    {({ active }) =>
                      action.link ? (
                        <Link href={action.link}>
                          <button
                            className={classnames(
                              'group flex w-full items-center rounded px-[12px] py-[12px] text-sm font-montserrat font-regular text-pSmall',
                              {
                                'bg-primary text-light-btnText': active,
                                'text-light-text dark:text-dark-text': !active
                              }
                            )}
                          >
                            {action.IconSVG ? (
                              <action.IconSVG className="mr-2 h-4 w-4" aria-hidden="true" />
                            ) : null}
                            {action.title}
                          </button>
                        </Link>
                      ) : (
                        <button
                          className={classnames(
                            'group flex w-full items-center rounded px-[12px] py-[12px] text-sm font-montserrat font-regular text-pSmall disabled:text-accentLight',
                            {
                              'bg-primary text-light-btnText': active,
                              'text-light-text dark:text-dark-text': !active
                            }
                          )}
                          onClick={action.onClick}
                        >
                          {action.IconSVG ? (
                            <action.IconSVG className="mr-2 h-4 w-4" aria-hidden="true" />
                          ) : null}
                          {action.title}
                        </button>
                      )
                    }
                  </Menu.Item>
                ) : null}
              </Fragment>
            ))}
          </Menu.Items>
        </Float>
      </Menu>
    </div>
  )
}
