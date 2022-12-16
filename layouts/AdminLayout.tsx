import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getSession, signOut } from 'next-auth/react'
import { Navbar, Sidebar, Footer, SessionLayout } from 'layouts'
import { Routes } from 'routes'
import { ActionObject } from 'components'
import { Breadcrumb, BreadcrumbItem } from 'components'
import { HiOutlineHomeModern } from 'react-icons/hi2'

type Props = {
  pageTitle: string
  children: React.ReactNode
  breadcrumbActions?: ActionObject[]
}

type Breadcrumb = {
  href: string
  label: string
  isCurrent: boolean
}

const TIME = process.env.NEXT_PUBLIC_SESSION_TIME_MINUTES
  ? parseInt(process.env.NEXT_PUBLIC_SESSION_TIME_MINUTES)
  : 30

export const AdminLayout: React.FC<Props> = (props) => {
  const { children, pageTitle, breadcrumbActions } = props
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])
  const [username, setUsername] = useState('')
  const activeRoute =
    router.asPath.split('?')[0].split('/')[1] + '/' + router.asPath.split('?')[0].split('/')[2]
  const [isOpen, setIsOpen] = useState(false)
  const [signOutTime] = useState(TIME * 60 * 1000) // 30 minutes
  const [warningTime] = useState((TIME - 2) * 60 * 1000) // 28 minutes
  let warnTimeOut: any
  let logoutTimeOut: any

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split('?')[0]
    let pathArray = pathWithoutQuery.split('/')
    pathArray.shift()
    pathArray = pathArray.filter((path) => path !== '')
    const breadcrumbs = pathArray.map((path, index) => {
      let href = ''
      let label = path.charAt(0).toUpperCase() + path.slice(1)
      if (path === 'admin') {
        href = '/'
      } else {
        href = '/' + pathArray.slice(0, index + 1).join('/')
      }
      return {
        href,
        label: label.replace('-', ' '),
        isCurrent: index === pathArray.length - 1
      }
    })
    setBreadcrumbs(breadcrumbs)
    getSession().then((session) => {
      const { user } = session
      setUsername(user.username)
    })
  }, [router.asPath])

  const warn = () => {
    setIsOpen(true)
  }

  const logoutSession = () => {
    signOut()
  }

  const setTimeOuts = () => {
    warnTimeOut = setTimeout(warn, warningTime)
    logoutTimeOut = setTimeout(logoutSession, signOutTime)
  }

  const clearTimeOuts = () => {
    if (warnTimeOut) clearTimeout(warnTimeOut)
    if (logoutTimeOut) clearTimeout(logoutTimeOut)
  }

  const getUserSession = async () => {
    const session = await getSession()
    return session
  }

  useEffect(() => {
    const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress']
    const session = getUserSession()
    if (session) {
      const resetTimeOut = () => {
        clearTimeOuts()
        setTimeOuts()
      }
      for (const i in events) {
        window.addEventListener(events[i], resetTimeOut)
      }
      setTimeOuts()
      return () => {
        for (const i in events) {
          window.removeEventListener(events[i], resetTimeOut)
          clearTimeOuts()
        }
      }
    }
  }, [])

  return (
    <div className="flex w-full animate__animated animate__fadeIn">
      <Head>
        <title>{`${pageTitle} | Branch Service Hub`}</title>
      </Head>
      <Sidebar routes={Routes} activeRoute={'/' + activeRoute} />
      <div className="flex-1">
        <Navbar username={username ?? 'User'} />
        <div className="mt-9 px-[16px]">
          <Breadcrumb actions={breadcrumbActions}>
            <BreadcrumbItem isCurrent={router.asPath === '/'} href="/">
              <HiOutlineHomeModern className="w-5 h-5 mr-2 text-light-text hover:text-primary md:ml-2 dark:text-dark-text common-transition hover:delay-150 dark:hover:text-light-text" />
            </BreadcrumbItem>
            {breadcrumbs &&
              breadcrumbs.map((breadcrumb) => (
                <BreadcrumbItem
                  key={breadcrumb.href}
                  href={breadcrumb.href}
                  isCurrent={breadcrumb.isCurrent}
                >
                  {breadcrumb.label}
                </BreadcrumbItem>
              ))}
          </Breadcrumb>
          <div className="mt-8 relative w-full">
            {children}
            <Footer />
          </div>
        </div>
      </div>
      <SessionLayout isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
    </div>
  )
}
