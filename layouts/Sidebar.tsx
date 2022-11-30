import React from 'react'
import classnames from 'classnames'
import { LayoutContext } from 'contexts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { NavMenu } from 'components'
import Image from 'next/image'
import { Routes } from 'routes'

export const Sidebar = () => {
  const { openSideNav } = React.useContext(LayoutContext)
  const [hoverActive, setHoverActive] = React.useState(false)

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
        {Routes.map((route) => (
          <div key={route.menuTitle}>
            {route.subLinks && route.subLinks.length ? (
              <NavMenu.SubLink
                menuTitle={route.menuTitle}
                IconSVG={route.IconSVG}
                subLinks={route.subLinks}
                hideTitle={!openSideNav}
                spacing={route.spacing}
                setHoverActive={setHoverActive}
              />
            ) : (
              <NavMenu.Basic
                menuTitle={route.menuTitle}
                IconSVG={route.IconSVG}
                link={route.link}
                hideTitle={!openSideNav}
                spacing={route.spacing}
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
        'h-screen bg-light-container dark:bg-dark-container duration-300 shadow-penumbra',
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
