import React, { Fragment } from 'react'
import { HomeIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import classnames from 'classnames'
import { useIntl } from 'react-intl'

interface BreadcrumbProps {
  links: Array<{ title: string; link: string; active: boolean }>
  actions?: Array<{ title: string; link: string; IconSVG?: any }>
}

export const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const { links, actions } = props
  const intl = useIntl()

  return (
    <nav className="flex justify-between p-[16px] shadow-penumbra rounded" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 font-lato">
        <li className="inline-flex items-center">
          <Link href="#" className="inline-flex">
            <HomeIcon className="w-5 h-5 mr-2 text-light-text hover:text-primary md:ml-2 dark:text-dark-text common-transition hover:delay-150 dark:hover:text-light-text" />
          </Link>
        </li>
        {links.map((link) => (
          <li key={link.link}>
            <div className="flex items-center">
              <ChevronRightIcon className="w-5 h-5 text-light-text dark:text-dark-text" />
              {!link.active ? (
                <Link
                  href="#"
                  className="ml-2 font-bold text-pNormal text-light-text hover:text-primary dark:text-dark-text common-transition hover:delay-150 dark:hover:text-light-text"
                >
                  {link.title}
                </Link>
              ) : (
                <span className="ml-2 font-regular text-pNormal text-light-text dark:text-dark-text">
                  {link.title}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
      {actions && actions.length ? (
        <div className="w-56 text-right">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium common-transition text-light-text dark:text-dark-text focus:outline-none hover:text-primary">
                {intl.formatMessage({
                  defaultMessage: 'Actions',
                  description: 'Actions that can be performed on a visited page'
                })}
                <ChevronDownIcon
                  className="ml-2 -mr-1 mt-0.5 h-5 w-5 text-violet-200 hover:text-violet-100"
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
                <div className="px-1 py-1">
                  {actions.map((action) => (
                    <Menu.Item key={action.link}>
                      {({ active }) => (
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
                              active ? (
                                <action.IconSVG className="mr-2 h-5 w-5" aria-hidden="true" />
                              ) : (
                                <action.IconSVG className="mr-2 h-5 w-5" aria-hidden="true" />
                              )
                            ) : null}
                            {action.title}
                          </button>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : null}
    </nav>
  )
}
