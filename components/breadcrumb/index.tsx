import { Children, Fragment } from 'react'
import { FiChevronRight, FiChevronDown } from 'react-icons/fi'
import { Menu } from '@headlessui/react'
import HeadlessFloat from 'components/HeadlessFloat'
import Link from 'next/link'
import { useIntl } from 'react-intl'
import classnames from 'classnames'

export type ActionObject = {
  title: string
  link: string
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
}

type BreadcrumbProps = {
  actions?: ActionObject[]
  children: React.ReactNode
}

type BreadcrumbItemProps = {
  children: React.ReactNode
  href: string
  isCurrent: boolean
}

export const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const { children, actions } = props
  const intl = useIntl()
  const childrenArray = Children.toArray(children)

  const childrenWtihSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index}>
          {child}
          <div className="hidden md:flex items-center">
            <FiChevronRight className="w-5 h-5 text-light-text dark:text-dark-text" />
          </div>
        </Fragment>
      )
    }
    return child
  })

  return (
    <div
      className="flex justify-between p-[16px] bg-light-container dark:bg-dark-container shadow-penumbra rounded"
      aria-label="breadcrumb"
    >
      <ol className="hidden md:inline-flex items-center space-x-1 md:space-x-3 font-lato">
        {childrenWtihSeperator}
      </ol>
      {actions && actions.length ? (
        <div className="w-56 text-right relative">
          <Menu as="div" className="relative inline-block text-left">
            <HeadlessFloat placement="bottom-end">
              <div>
                <Menu.Button className="inline-flex w-full justify-center px-4 text-sm font-medium common-transition text-light-text dark:text-dark-text focus:outline-none hover:text-primary">
                  {intl.formatMessage({
                    defaultMessage: 'Useful Links',
                    description: 'Actions that can be performed on a visited page'
                  })}
                  <FiChevronDown
                    className="ml-2 -mr-1 mt-0.5 h-5 w-5 text-violet-200 hover:text-violet-100"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
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
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </HeadlessFloat>
          </Menu>
        </div>
      ) : null}
    </div>
  )
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  href,
  isCurrent,
  ...props
}) => {
  return (
    <li {...props} className="inline-flex items-center">
      <Link
        href={href}
        passHref
        className={classnames(
          'ml-2 text-pNormal text-light-text hover:text-primary dark:text-dark-text common-transition hover:delay-150 dark:hover:text-light-text',
          {
            'font-bold': !isCurrent,
            'font-normal': isCurrent
          }
        )}
        aria-current={isCurrent ? 'page' : 'false'}
      >
        {children}
      </Link>
    </li>
  )
}
