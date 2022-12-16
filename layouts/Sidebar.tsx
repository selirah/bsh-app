import { FC, useContext, useState } from 'react'
import classnames from 'classnames'
import { LayoutContext } from 'contexts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { NavMenu } from 'components'
import Image from 'next/image'
import { MenuTypes } from 'routes'

type Props = {
  routes: MenuTypes[]
  activeRoute?: string
}

export const Sidebar: FC<Props> = (props) => {
  const { openSideNav } = useContext(LayoutContext)
  const [hoverActive, setHoverActive] = useState(false)
  const { routes, activeRoute } = props

  const renderMenu = () => (
    <div className={classnames('px-[16px]', {})}>
      <div
        className={classnames('py-[12px]', {
          'inline-flex items-center': openSideNav,
          'flex justify-center': !openSideNav
        })}
      >
        <Image
          src="/logo.png"
          width={30}
          height={30}
          alt="logo"
          unoptimized
          style={{ width: 30, height: 30 }}
          className={classnames('cursor-pointer duration-500', {
            'rotate-[360deg] mr-2': openSideNav,
            '': !openSideNav
          })}
          priority
        />
        <h6
          className={classnames(
            'text-dark-btnText dark:text-light-btnText origin-left text-h6 common-transition font-lato',
            {
              hidden: !openSideNav
            }
          )}
        >
          EquityBCDC
        </h6>
      </div>

      <ul className="mt-8 relative">
        {routes.map((route) => (
          <div key={route.id}>
            {route.subLinks && route.subLinks.length ? (
              <NavMenu.SubLink
                menuTitle={route.menuTitle}
                IconSVG={route.IconSVG}
                subLinks={route.subLinks}
                hideTitle={!openSideNav}
                spacing={route.spacing}
                setHoverActive={setHoverActive}
                activeRoute={activeRoute}
              />
            ) : (
              <NavMenu.Basic
                menuTitle={route.menuTitle}
                IconSVG={route.IconSVG}
                link={route.link}
                hideTitle={!openSideNav}
                spacing={route.spacing}
                activeRoute={activeRoute}
              />
            )}
          </div>
        ))}
      </ul>
    </div>
  )

  return (
    <nav
      className={classnames(
        'h-full fixed z-10 bg-light-container dark:bg-dark-container duration-300 shadow-umbra',
        {
          'w-72': openSideNav,
          'w-20': !openSideNav
        }
      )}
    >
      {hoverActive ? renderMenu() : <PerfectScrollbar>{renderMenu()}</PerfectScrollbar>}
    </nav>
  )
}
