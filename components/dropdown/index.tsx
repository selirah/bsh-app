import React, { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiChevronDown, FiMoreVertical } from 'react-icons/fi'
import classnames from 'classnames'
import Link from 'next/link'

type DropdownList = {
  title: string
  link?: string
  onClick?: (value?: unknown) => void
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  inaccessible?: boolean
}

type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonColor = 'primary' | 'error' | 'success' | 'accent'

interface DropdownProps {
  actions: DropdownList[]
}

interface BottonProps extends DropdownProps {
  btnTitle: string
  size?: ButtonSize
  outline?: boolean
  pill?: boolean
  color?: ButtonColor
}

interface KhebabProps extends DropdownProps {
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
    <div className="relative">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={classnames(
              'relative inline-flex justify-center items-center overflow-hidden px-[24px] py-[10px] font-lato common-transition text-center',
              {
                rounded: !pill,
                'rounded-full': pill,
                'h-[40px] text-pSmall': size === 'sm',
                'h-[45px] text-pNormal': size === 'md' || !size,
                'h-[50px] text-pLarge': size === 'lg',
                'text-light-btnText': !outline,
                'bg-primary hover:bg-primaryDark': (!color || color === 'primary') && !outline,
                'bg-error-card hover:bg-error-hovered': color === 'error' && !outline,
                'bg-success-card hover:bg-success-hovered': color === 'success' && !outline,
                'bg-accent hover:bg-accentDark': color === 'accent' && !outline,
                'border-2 font-bold': outline,
                'border-primary text-primary': outline && color === 'primary',
                'border-error-card text-error-card': outline && color === 'error',
                'border-success-card text-success-card': outline && color === 'success',
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
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute border-light-border dark:border-dark-border right-0 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded shadow-penumbra focus:outline-none bg-light-container dark:bg-dark-container">
            <div className="px-1 py-1 ">
              {actions.map((action) => (
                <Menu.Item key={action.title}>
                  {({ active }) =>
                    action.link ? (
                      <Link href={action.link}>
                        <button
                          className={classnames(
                            'group flex w-full items-center rounded px-[12px] py-[12px] text-sm font-montserrat font-regular text-pSmall',
                            {
                              'bg-primary text-light-btnText': active,
                              'text-light-text': !active
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
                          'group flex w-full items-center rounded px-[12px] py-[12px] text-sm font-montserrat font-regular text-pSmall disabled:text-accentLight disabled:cursor-not-allowed',
                          {
                            'bg-primary text-light-btnText': active,
                            'text-light-text dark:text-dark-text': !active
                          }
                        )}
                        onClick={action.onClick}
                        disabled={action.inaccessible}
                      >
                        {action.IconSVG ? (
                          <action.IconSVG className="mr-2 h-4 w-4" aria-hidden="true" />
                        ) : null}
                        {action.title}
                      </button>
                    )
                  }
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export const Khebab: React.FC<KhebabProps> = (props) => {
  const { actions, size } = props

  return (
    <div className="relative">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={classnames('relative inline-flex justify-center items-center text-center')}
          >
            <FiMoreVertical
              className={classnames('text-light-text dark:text-dark-text', {
                'w-3 h-3': size === 'sm',
                'w-4 h-4': size === 'md' || !size,
                'w-5 h-5': size === 'lg'
              })}
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute border-light-border dark:border-dark-border right-0 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded shadow-penumbra focus:outline-none bg-light-container dark:bg-dark-container">
            <div className="px-1 py-1 ">
              {actions.map((action) => (
                <Menu.Item key={action.title}>
                  {({ active }) =>
                    action.link ? (
                      <Link href={action.link}>
                        <button
                          className={classnames(
                            'group flex w-full items-center rounded px-[12px] py-[12px] text-sm font-montserrat font-regular text-pSmall',
                            {
                              'bg-primary text-light-btnText': active,
                              'text-light-text': !active
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
                          'group flex w-full items-center rounded px-[12px] py-[12px] text-sm font-montserrat font-regular text-pSmall disabled:text-accentLight disabled:cursor-not-allowed',
                          {
                            'bg-primary text-light-btnText': active,
                            'text-light-text dark:text-dark-text': !active
                          }
                        )}
                        onClick={action.onClick}
                        disabled={action.inaccessible}
                      >
                        {action.IconSVG ? (
                          <action.IconSVG className="mr-2 h-4 w-4" aria-hidden="true" />
                        ) : null}
                        {action.title}
                      </button>
                    )
                  }
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
