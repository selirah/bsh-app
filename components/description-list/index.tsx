import classnames from 'classnames'

type Props = {
  bgGray?: boolean
  longText?: boolean
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
  const { title, value, bgGray, longText } = props
  return (
    <div
      className={classnames(
        'p-[16px] block md:flex md:justify-between items-center font-montserrat font-regular',
        {
          'bg-table-cell dark:bg-dark-background': bgGray
        }
      )}
    >
      <div className="text-pNormal text-dark-btnText dark:text-light-btnText mb-2 md:mb-0">
        {title}
      </div>
      <div
        className={classnames('text-light-text dark:text-dark-text md:text-right block', {
          'text-pNormal': !longText,
          'text-pSmall': longText
        })}
      >
        {value}
      </div>
    </div>
  )
}

export const TwoColumn: React.FC<TwoColumnProps> = (props) => {
  const { title1, value1, title2, value2, bgGray, longText } = props
  return (
    <div
      className={classnames(
        'p-[16px] block md:flex md:justify-between items-center font-montserrat font-regular',
        {
          'bg-table-cell dark:bg-dark-background': bgGray
        }
      )}
    >
      <div className="">
        <div className="text-pSmall text-dark-btnText dark:text-light-btnText">{title1}</div>
        <div className="text-pNormal text-light-text dark:text-dark-text mb-2 md:mb-0">
          {value1}
        </div>
      </div>
      {title2 && value2 ? (
        <div>
          <div className="text-pSmall text-dark-btnText dark:text-light-btnText md:text-right">
            {title2}
          </div>
          <div
            className={classnames(
              'text-light-text dark:text-dark-text md:text-right mb-2 md:mb-0',
              {
                'text-pNormal': !longText,
                'text-pSmall': longText
              }
            )}
          >
            {value2}
          </div>
        </div>
      ) : null}
    </div>
  )
}
