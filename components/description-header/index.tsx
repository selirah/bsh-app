import { Avatar } from 'components'
import classnames from 'classnames'

type InitalsColor = 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'error' | 'warning'

type DescriptionHeaderProps = {
  title: string
  description: string
  bgGray?: boolean
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
  const { description, title, bgGray } = props
  return (
    <div
      className={classnames('p-[16px]', {
        'bg-table-cell dark:bg-dark-background': bgGray
      })}
    >
      <h6 className="text-h6 font-lato text-dark-btnText dark:text-light-btnText">{title}</h6>
      <p className="mt-[8px] font-montserrat text-light-text dark:text-dark-text">{description}</p>
    </div>
  )
}

export const HeaderAvatar: React.FC<HeaderAvatarProps> = (props) => {
  const { title, description, src, circular, bgGray } = props
  return (
    <div
      className={classnames('p-[16px] flex justify-between items-center', {
        'bg-table-cell dark:bg-dark-background': bgGray
      })}
    >
      <div>
        <h6 className="text-pSmall md:text-h6 font-lato text-dark-btnText dark:text-light-btnText">
          {title}
        </h6>
        <p className="mt-[8px] text-pSmall font-montserrat text-light-text dark:text-dark-text">
          {description}
        </p>
      </div>
      <Avatar.Img size="lg" src={src} circular={circular} />
    </div>
  )
}

export const HeaderInitials: React.FC<HeaderInitalsProps> = (props) => {
  const { title, description, initials, circular, bgColor, bgGray } = props
  return (
    <div
      className={classnames('p-[16px] flex justify-between items-center', {
        'bg-table-cell dark:bg-dark-background': bgGray
      })}
    >
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
