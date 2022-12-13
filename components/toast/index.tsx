import React, { Fragment } from 'react'
import { Avatar } from 'components'

type ColorTypes = 'success' | 'error' | 'warning' | 'info'

type ToastProps = {
  title: string
}

type BasicProps = ToastProps & {
  color: ColorTypes
  IconSVG: React.FC<React.SVGProps<SVGSVGElement>>
  description?: string
}

type ActionProps = ToastProps & {
  actionText: string
  onClick?: () => void
}

type WithAvatarProps = ToastProps & {
  src: string
  actionText?: string
  onClick?: () => void
  description?: string
}

export const Basic: React.FC<BasicProps> = (props) => {
  const { IconSVG, color, title, description } = props

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Avatar.Icon size="sm" color={color} IconSVG={IconSVG} circular />
          <h6 className="text-dark-btnText dark:text-light-btnText font-bold ml-[8px] text-pNormal font-lato">
            {title}
          </h6>
        </div>
      </div>
      <div className="text-light-text dark:text-dark-text pl-[26px] text-pSmall font-montserrat">
        {description}
      </div>
    </Fragment>
  )
}

export const Action: React.FC<ActionProps> = (props) => {
  const { title, actionText, onClick } = props

  return (
    <Fragment>
      <div className="flex justify-between items-center w-full">
        <h6 className="text-dark-btnText dark:text-light-btnText font-bold ml-[8px] text-pNormal font-lato">
          {title}
        </h6>
        <h6 className="font-regular ml-[8px] text-pNormal font-lato text-primary" onClick={onClick}>
          {actionText}
        </h6>
      </div>
    </Fragment>
  )
}

export const WithAvatar: React.FC<WithAvatarProps> = (props) => {
  const { title, description, src, onClick, actionText } = props

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <div className="flex justify-between space-x-4">
          <Avatar.Img size="sm" circular src={src} />
          <div className="block">
            <h6 className="text-dark-btnText dark:text-light-btnText font-bold text-pNormal font-lato">
              {title}
            </h6>
            <div className="text-light-text dark:text-dark-text text-pSmall font-montserrat">
              {description}
            </div>
          </div>
        </div>
        <h6 className="font-regular ml-[8px] text-pNormal font-lato text-primary" onClick={onClick}>
          {actionText}
        </h6>
      </div>
    </Fragment>
  )
}
