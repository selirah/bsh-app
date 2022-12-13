import { useContext, FC } from 'react'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { LanguageSwitcher, ThemeSwitcher, UserProfile, ColorSwitcher } from 'controllers'
import { LayoutContext } from 'contexts'
import classnames from 'classnames'

type Props = {
  username: string
}

export const Navbar: FC<Props> = (props) => {
  const { username } = props
  const { onSetOpenSideNav, openSideNav, layout } = useContext(LayoutContext)

  return (
    <nav className="w-full flex justify-between px-[16px] py-[12px] bg-light-container dark:bg-dark-container shadow-umbra">
      {openSideNav ? (
        <AiOutlineMenuFold
          className={classnames(
            'w-[30px] h-[30px] text-light-text dark:text-dark-text cursor-pointer',
            {
              invisible: layout === 'mobile'
            }
          )}
          onClick={onSetOpenSideNav}
        />
      ) : (
        <AiOutlineMenuUnfold
          className={classnames(
            'w-[30px] h-[30px] text-light-text dark:text-dark-text cursor-pointer',
            {
              invisible: layout === 'mobile'
            }
          )}
          onClick={onSetOpenSideNav}
        />
      )}
      <div className="flex items-center gap-x-4">
        <LanguageSwitcher />
        {process.env.NODE_ENV === 'development' ? <ColorSwitcher /> : null}
        <div className="flex items-center gap-x-4">
          <ThemeSwitcher />
          <UserProfile username={username} />
        </div>
      </div>
    </nav>
  )
}
