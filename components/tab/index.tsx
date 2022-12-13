import React, { useEffect } from 'react'
import classnames from 'classnames'

type TabContainerProps = {
  children: React.ReactNode
}

type TabMenuProps = {
  children: React.ReactNode
}

type TabMenuItemProps = {
  children: React.ReactNode
  activeTab: string
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  badge?: number
  tabId: string
  onSetActiveTab: (tabId: string) => void
}

type TabContentProps = {
  children: React.ReactNode
  activeTab: string
  tabId: string
}

export const TabContainer: React.FC<TabContainerProps> = (props) => {
  const { children } = props

  useEffect(() => {
    let tabs = document.querySelectorAll('.tab')
    let indicator = (document.querySelector('.indicator') as HTMLElement) || null
    let panels = document.querySelectorAll('.tab-panel')

    indicator.style.width = tabs[0].getBoundingClientRect().width + 'px'
    indicator.style.left =
      tabs[0].getBoundingClientRect().left -
      tabs[0].parentElement.getBoundingClientRect().left +
      'px'
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tab.classList.remove('text-primary')
        let tabTarget = tab.getAttribute('aria-controls')
        indicator.style.width = tab.getBoundingClientRect().width + 'px'
        indicator.style.left =
          tab.getBoundingClientRect().left - tab.parentElement.getBoundingClientRect().left + 'px'

        panels.forEach((panel) => {
          let panelId = panel.getAttribute('id')
          if (tabTarget === panelId) {
            panel.classList.remove('invisible', 'opacity-0')
            panel.classList.add('visible', 'opacity-100')
          } else {
            panel.classList.add('invisible', 'opacity-0')
          }
        })
      })
    })
  }, [])

  return <div className="w-full">{children}</div>
}

export const TabMenu: React.FC<TabMenuProps> = (props) => {
  const { children } = props
  return (
    <div className="text-center border-b border-light-border dark:border-dark-border">
      <ul className="flex flex-wrap -mb-px relative font-lato" role="tablist" aria-label="tabs">
        <div className="absolute top-0 left-0 my-auto bottom-0 border-b-2 border-primary p-4 indicator"></div>
        {children}
      </ul>
    </div>
  )
}

export const TabMenuItem: React.FC<TabMenuItemProps> = (props) => {
  const { children, IconSVG, badge, tabId, activeTab, onSetActiveTab } = props
  return (
    <li
      className={classnames(
        'inline-flex items-center mr-2 tab p-4 hover:text-primary hover:border-primary common-transition cursor-pointer disabled:cursor-not-allowed',
        {
          'text-light-text dark:text-dark-text': tabId !== activeTab,
          'text-primary': tabId === activeTab
        }
      )}
      role="tab"
      aria-selected="true"
      id={`tab-${tabId}`}
      tabIndex={0}
      aria-controls={`panel-${tabId}`}
      onClick={() => onSetActiveTab(tabId)}
    >
      {IconSVG ? <IconSVG className="w-5 h-5 mr-[8px]" /> : null}
      {badge ? (
        <div className="bg-light-background dark:bg-dark-background rounded-full px-[12px] py-0 ml-[8px] text-center">
          <span className="text-pSmall">{badge}</span>
        </div>
      ) : null}
      {children}
    </li>
  )
}

export const TabContent: React.FC<TabContentProps> = (props) => {
  const { children, activeTab, tabId } = props

  return (
    <div className="mt-2 relative font-montserrat">
      <div
        role="tabpanel"
        id={`panel-${tabId}`}
        className={classnames('tab-panel px-[12px] py-[12px] transition duration-300', {
          'absolute top-0 invisible': tabId !== activeTab
        })}
      >
        {children}
      </div>
    </div>
  )
}
