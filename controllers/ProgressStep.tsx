import { Fragment } from 'react'
import { Step } from 'components'
import { useIntl } from 'react-intl'

type Props = {
  totalSteps: number
  titles?: string[]
  active?: number
  success?: boolean
}

export const ProgressStep: React.FC<Props> = (props) => {
  const { totalSteps, active, titles, success } = props
  const intl = useIntl()

  const renderSteps = () => {
    let stepContainer: React.ReactNode[] = []
    for (let i = 1; i <= totalSteps; i++) {
      stepContainer.push(
        <Fragment key={i}>
          {i === active ? (
            !success ? (
              <Step.Active
                step={i}
                title={
                  titles.length
                    ? titles[i - 1]
                    : `${intl.formatMessage({ defaultMessage: 'Step' })} ${i}`
                }
                leftBorder
              />
            ) : (
              <Step.Completed
                title={
                  titles.length
                    ? titles[i - 1]
                    : `${intl.formatMessage({ defaultMessage: 'Step' })} ${i}`
                }
                leftBorder
              />
            )
          ) : active > i ? (
            <Step.Completed
              title={
                titles.length
                  ? titles[i - 1]
                  : `${intl.formatMessage({ defaultMessage: 'Step' })} ${i}`
              }
              leftBorder
            />
          ) : (
            <Step.UnAttended
              step={i}
              title={
                titles.length
                  ? titles[i - 1]
                  : `${intl.formatMessage({ defaultMessage: 'Step' })} ${i}`
              }
              leftBorder
            />
          )}
        </Fragment>
      )
    }
    return stepContainer
  }

  return (
    <div
      className={`${
        totalSteps ? 'grid grid-cols-' + totalSteps : 'flex'
      } border border-light-border dark:border-dark-border`}
    >
      {renderSteps()}
    </div>
  )
}
