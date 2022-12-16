import classnames from 'classnames'

type Props = {
  bgGray?: boolean
}

type OneColumnProps = Props & {
  title: React.ReactNode
  value: React.ReactNode
}

type TwoColumnProps = Props & {
  title1: React.ReactNode
  value1: React.ReactNode
  title2?: React.ReactNode
  value2?: React.ReactNode
}

export const OneColumn: React.FC<OneColumnProps> = (props) => {
  const { title, value, bgGray } = props
  return (
    <div
      className={classnames(
        'p-[16px] flex justify-between items-center font-montserrat font-regular',
        {
          'bg-table-cell dark:bg-dark-background': bgGray
        }
      )}
    >
      <div className="text-pNormal text-dark-btnText dark:text-light-btnText">{title}</div>
      <div className="text-pNormal text-light-text dark:text-dark-text">{value}</div>
    </div>
  )
}

export const TwoColumn: React.FC<TwoColumnProps> = (props) => {
  const { title1, value1, title2, value2, bgGray } = props
  return (
    <div
      className={classnames(
        'p-[16px] flex justify-between items-center font-montserrat font-regular',
        {
          'bg-table-cell dark:bg-dark-background': bgGray
        }
      )}
    >
      <div>
        <div className="text-pSmall text-dark-btnText dark:text-light-btnText">{title1}</div>
        <div className="text-pNormal text-light-text dark:text-dark-text">{value1}</div>
      </div>
      {title2 && value2 ? (
        <div>
          <div className="text-pSmall text-dark-btnText dark:text-light-btnText text-right">
            {title2}
          </div>
          <div className="text-pNormal text-light-text dark:text-dark-text text-right">
            {value2}
          </div>
        </div>
      ) : null}
    </div>
  )
}
