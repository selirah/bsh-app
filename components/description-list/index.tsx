import React from 'react'

type OneColumnProps = {
  title: React.ReactNode
  value: React.ReactNode
}

type TwoColumnProps = {
  title1: React.ReactNode
  value1: React.ReactNode
  title2?: React.ReactNode
  value2?: React.ReactNode
}

export const OneColumn: React.FC<OneColumnProps> = (props) => {
  const { title, value } = props
  return (
    <div className="flex justify-between items-center font-montserrat font-regular">
      <div className="text-pNormal text-dark-btnText dark:text-light-btnText">{title}</div>
      <div className="text-pNormal text-light-text dark:text-dark-text">{value}</div>
    </div>
  )
}

export const TwoColumn: React.FC<TwoColumnProps> = (props) => {
  const { title1, value1, title2, value2 } = props
  return (
    <div className="flex justify-between items-center font-montserrat font-regular">
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
