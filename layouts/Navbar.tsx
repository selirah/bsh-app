import { useContext, FC } from 'react'
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import { LanguageSwitcher, ThemeSwitcher, UserProfile } from 'controllers'
import { LayoutContext } from 'contexts'
import classnames from 'classnames'

interface Props {
  username: string
}

export const Navbar: FC<Props> = (props) => {
  const { username } = props
  const { onSetOpenSideNav, openSideNav, layout } = useContext(LayoutContext)

  return (
    <nav className="w-full flex justify-between px-[16px] py-[12px] bg-light-container dark:bg-dark-container shadow-umbra">
      <BsArrowLeftCircleFill
        className={classnames('w-[30px] h-[30px] text-accent duration-300 cursor-pointer', {
          'rotate-180': !openSideNav,
          invisible: layout === 'mobile'
        })}
        onClick={onSetOpenSideNav}
      />
      <div className="flex items-center gap-x-4">
        <LanguageSwitcher />
        <div className="flex items-center gap-x-4">
          <ThemeSwitcher />
          <UserProfile username={username} />
        </div>
      </div>
    </nav>
  )
}
