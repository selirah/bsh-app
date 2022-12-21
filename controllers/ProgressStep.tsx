import { Fragment } from 'react'
import { Step } from 'components'
import { useIntl } from 'react-intl'

type Props = {
  totalSteps: number
  titles?: string[]
  active?: number
  success?: boolean
}

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10'
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
              <div className="w-full">
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
              <div className="w-full">
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
            <div className="w-full">
              <Step.Completed
                title={
                  titles.length
                    ? titles[i - 1]
                    : `${intl.formatMessage({ defaultMessage: 'Step' })} ${i}`
                }
              />
            </div>
          ) : (
            <div className="w-full">
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
    <div
      className={`md:grid ${gridCols[totalSteps]} border border-light-border dark:border-dark-border rounded block`}
    >
      {renderSteps()}
    </div>
  )
}
