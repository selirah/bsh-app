import { FC, useState, useRef } from 'react'
import { Avatar } from 'components'
import Link from 'next/link'
import { useIntl } from 'react-intl'
import { signOut } from 'next-auth/react'
import { FiUser, FiLogOut, FiKey } from 'react-icons/fi'
import { Transition } from 'components'

type Props = {
  username: string
  imageSrc?: string
}

export const UserProfile: FC<Props> = (props) => {
  const { username, imageSrc } = props
  const [isEnter, setIsEnter] = useState(false)
  const intl = useIntl()
  const nodeRef = useRef(null)

  const onMouseOver = () => {
    setIsEnter(true)
  }

  const onMouseOut = () => {
    setIsEnter(false)
  }

  return (
    <div
      className="inline-block relative cursor-pointer"
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
      onMouseOut={onMouseOut}
      onBlur={onMouseOut}
    >
      {imageSrc ? (
        <Avatar.Img size="xs" src={imageSrc} circular />
      ) : (
        <Avatar.Initals initials={username.substring(0, 2).toUpperCase()} size="xs" circular />
      )}
      <Transition.Dropdown isEnter={isEnter} nodeRef={nodeRef}>
        <div
          className="w-64 absolute right-0 rounded border border-light-border dark:border-dark-border shadow-penumbra bg-light-container dark:bg-dark-container font-montserrat transition ease-out duration-100 text-pSmall z-10"
          ref={nodeRef}
        >
          <Link
            href="/user/profile"
            className="flex w-full items-center disabled:cursor-not-allowed text-light-text dark:text-dark-text hover:text-light-btnText hover:bg-primary rounded p-[12px] common-transition"
          >
            <FiUser className="w-4 h-4 mr-2" />
            {intl.formatMessage({ defaultMessage: 'Profile', description: 'User Profile' })}
          </Link>
          <Link
            href="/user/change-password"
            className="flex w-full items-center disabled:cursor-not-allowed text-light-text dark:text-dark-text hover:text-light-btnText hover:bg-primary rounded p-[12px] common-transition"
          >
            <FiKey className="w-4 h-4 mr-2" />
            {intl.formatMessage({
              defaultMessage: 'Change Password',
              description: 'Change user password'
            })}
          </Link>
          <button
            className="flex w-full items-center disabled:cursor-not-allowed text-light-text dark:text-dark-text hover:text-light-btnText hover:bg-primary rounded p-[12px] common-transition"
            onClick={() => signOut()}
          >
            <FiLogOut className="w-4 h-4 mr-2" />
            {intl.formatMessage({
              defaultMessage: 'Logout',
              description: 'Log user out'
            })}
          </button>
        </div>
      </Transition.Dropdown>
    </div>
  )
}
