import React, { useEffect, useState } from 'react'
import classnames from 'classnames'

type Nav = {
  title: string
  active?: boolean
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  badge?: number
}

type TabObject = {
  nav: Nav
  content: React.ReactNode
}

interface TabProps {
  data: TabObject[]
}

export const Tab: React.FC<TabProps> = (props) => {
  const { data } = props
  const [addClass, setAddClass] = useState(0)

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

  return (
    <div className="w-full">
      <div className="text-center border-b border-light-border dark:border-dark-border">
        <ul className="flex flex-wrap -mb-px relative font-lato" role="tablist" aria-label="tabs">
          <div className="absolute top-0 left-0 my-auto bottom-0 border-b-2 border-primary p-4 indicator"></div>
          {data.map((d, i) => (
            <li
              className={classnames(
                'inline-flex items-center mr-2 tab p-4 hover:text-primary hover:border-primary common-transition cursor-pointer disabled:cursor-not-allowed',
                {
                  'text-light-text dark:text-dark-text': i !== addClass,
                  'text-primary': i === addClass
                }
              )}
              role="tab"
              aria-selected="true"
              id={`tab-${i}`}
              tabIndex={0}
              aria-controls={`panel-${i}`}
              key={i}
              onClick={() => setAddClass(i)}
            >
              {d.nav.IconSVG ? <d.nav.IconSVG className="w-5 h-5 mr-[8px]" /> : null}
              {d.nav.title}
              {d.nav.badge ? (
                <div className="bg-light-background dark:bg-dark-background rounded-full px-[12px] py-0 ml-[8px] text-center">
                  <span className="text-pSmall">{d.nav.badge}</span>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-2 relative font-montserrat">
        {data.map((d, i) => (
          <div
            role="tabpanel"
            id={`panel-${i}`}
            className={classnames('tab-panel p-6 transition duration-300', {
              'absolute top-0 invisible': !d.nav.active
            })}
            key={i}
          >
            {d.content}
          </div>
        ))}
      </div>
    </div>
  )
}
