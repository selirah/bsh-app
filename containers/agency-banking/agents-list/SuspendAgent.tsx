import { useContext } from 'react'
import { useIntl } from 'react-intl'
import { LayoutContext } from 'contexts'
import { Textarea } from 'formik-controls'
import { Button, AppleLoader } from 'components'

type Props = {
  isSubmitting: boolean
  isValid: boolean
}

export const SuspendAgent: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { layout } = useContext(LayoutContext)
  const { isSubmitting, isValid } = props

  return (
    <div className="flex justify-end animate__animated animate__fadeIn">
      <div className="block w-2/3">
        <div className="mb-4">
          <Textarea
            name="reason"
            label={intl.formatMessage({ defaultMessage: 'Enter reason' })}
            size={layout === 'mobile' ? 'sm' : 'md'}
            placeholder={intl.formatMessage({
              defaultMessage: 'type reason . . .'
            })}
            rows={4}
          />
        </div>
        <div className="mt-4">
          <Button size="sm" disabled={!isValid || isSubmitting} type="submit">
            <div className="flex items-center space-x-2">
              {isSubmitting && <AppleLoader size="md" />}
              <span>
                {isSubmitting
                  ? intl.formatMessage({ defaultMessage: 'Processing...' })
                  : intl.formatMessage({ defaultMessage: 'Suspend Agent' })}
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
