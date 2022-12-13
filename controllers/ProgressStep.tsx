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
              <div className="w-1/6">
                <Step.Active
                  step={i}
                  title={
                    titles.length
                      ? titles[i - 1]
                      : `${intl.formatMessage({ defaultMessage: 'Step' })} ${i}`
                  }
                />
              </div>
            ) : (
              <div className="w-1/6">
                <Step.Completed
                  title={
                    titles.length
                      ? titles[i - 1]
                      : `${intl.formatMessage({ defaultMessage: 'Step' })} ${i}`
                  }
                />
              </div>
            )
          ) : active > i ? (
            <div className="w-1/6">
              <Step.Completed
                title={
                  titles.length
                    ? titles[i - 1]
                    : `${intl.formatMessage({ defaultMessage: 'Step' })} ${i}`
                }
              />
            </div>
          ) : (
            <div className="w-1/6">
              <Step.UnAttended
                step={i}
                title={
                  titles.length
                    ? titles[i - 1]
                    : `${intl.formatMessage({ defaultMessage: 'Step' })} ${i}`
                }
              />
            </div>
          )}
        </Fragment>
      )
    }
    return stepContainer
  }

  return (
    <div className="flex justify-start border border-light-border dark:border-dark-border">
      {renderSteps()}
    </div>
  )
}
