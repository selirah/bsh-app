import React from 'react'
import { Avatar } from 'components'
type InitalsColor = 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'error' | 'warning'

type DescriptionHeaderProps = {
  title: string
  description: string
}

type HeaderAvatarProps = DescriptionHeaderProps & {
  src: string
  circular?: boolean
}

type HeaderInitalsProps = DescriptionHeaderProps & {
  initials: string
  circular?: boolean
  bgColor?: InitalsColor
}

export const Basic: React.FC<DescriptionHeaderProps> = (props) => {
  const { description, title } = props
  return (
    <div className="p-[16px]">
      <h6 className="text-h6 font-lato text-dark-btnText dark:text-light-btnText">{title}</h6>
      <p className="mt-[8px] font-montserrat text-light-text dark:text-dark-text">{description}</p>
    </div>
  )
}

export const HeaderAvatar: React.FC<HeaderAvatarProps> = (props) => {
  const { title, description, src, circular } = props
  return (
    <div className="p-[16px] flex justify-between items-center">
      <div>
        <h6 className="text-h6 font-lato text-dark-btnText dark:text-light-btnText">{title}</h6>
        <p className="mt-[8px] font-montserrat text-light-text dark:text-dark-text">
          {description}
        </p>
      </div>
      <Avatar.Img size="lg" src={src} circular={circular} />
    </div>
  )
}

export const HeaderInitials: React.FC<HeaderInitalsProps> = (props) => {
  const { title, description, initials, circular, bgColor } = props
  return (
    <div className="p-[16px] flex justify-between items-center">
      <div>
        <h6 className="text-h6 font-lato text-dark-btnText dark:text-light-btnText">{title}</h6>
        <p className="mt-[8px] font-montserrat text-light-text dark:text-dark-text">
          {description}
        </p>
      </div>
      <Avatar.Initals size="lg" initials={initials} circular={circular} bgColor={bgColor} />
    </div>
  )
}
