import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { Routes } from 'routes'
import { ActionObject } from 'components'
import { Breadcrumb, BreadcrumbItem } from 'components'
import { HiOutlineHomeModern } from 'react-icons/hi2'

interface Props {
  pageTitle: string
  children: React.ReactNode
  breadcrumbActions?: ActionObject[]
  username?: string
}

type Breadcrumb = {
  href: string
  label: string
  isCurrent: boolean
}

export const AdminLayout: React.FC<Props> = (props) => {
  const { children, pageTitle, breadcrumbActions, username } = props
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split('?')[0]
    let pathArray = pathWithoutQuery.split('/')
    pathArray.shift()
    pathArray = pathArray.filter((path) => path !== '')
    const breadcrumbs = pathArray.map((path, index) => {
      const href = '/' + pathArray.slice(0, index + 1).join('/')
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        isCurrent: index === pathArray.length - 1
      }
    })

    setBreadcrumbs(breadcrumbs)
  }, [router.asPath])

  return (
    <div className="flex h-screen w-full animate__animated ">
      <Head>
        <title>{`${pageTitle} | Branch Service Hub`}</title>
      </Head>
      <Sidebar routes={Routes} activeRoute={router.pathname} />
      <div className="flex-1">
        <Navbar username={username ?? 'User'} />
        <div className="mt-10 px-[16px]">
          <Breadcrumb actions={breadcrumbActions}>
            <BreadcrumbItem isCurrent={router.pathname === '/'} href="/">
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
          <div className="mt-8 relative h-full w-full">{children}</div>
        </div>
      </div>
    </div>
  )
}
