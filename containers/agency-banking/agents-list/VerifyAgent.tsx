import { useIntl } from 'react-intl'
import { AppleLoader, Button } from 'components'
import { HiCheckBadge } from 'react-icons/hi2'

type Props = {
  isSubmitting: boolean
  onVerifyAgent: () => void
}

export const VerifyAgent: React.FC<Props> = (props) => {
  const { isSubmitting, onVerifyAgent } = props
  const intl = useIntl()

  return (
    <div className="flex justify-end animate__animated animate__fadeIn">
      <Button size="sm" onClick={onVerifyAgent} disabled={isSubmitting}>
        <div className="flex items-center space-x-2">
          {isSubmitting ? <AppleLoader size="md" /> : <HiCheckBadge />}
          <span>
            {isSubmitting
              ? intl.formatMessage({ defaultMessage: 'Verifying agent...' })
              : intl.formatMessage({ defaultMessage: 'Verify Agent' })}
          </span>
        </div>
      </Button>
    </div>
  )
}
