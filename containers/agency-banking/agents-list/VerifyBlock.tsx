import { useIntl } from 'react-intl'
import { AppleLoader, Button } from 'components'
import { HiCheck } from 'react-icons/hi2'

type Props = {
  isSubmitting: boolean
  onVerifyBlock: () => void
}

export const VerifyBlock: React.FC<Props> = (props) => {
  const { isSubmitting, onVerifyBlock } = props
  const intl = useIntl()

  return (
    <div className="flex justify-end animate__animated animate__fadeIn">
      <Button size="sm" onClick={onVerifyBlock} disabled={isSubmitting}>
        <div className="flex items-center space-x-2">
          {isSubmitting ? <AppleLoader size="md" /> : <HiCheck />}
          <span>
            {isSubmitting
              ? intl.formatMessage({ defaultMessage: 'Approving...' })
              : intl.formatMessage({ defaultMessage: 'Approve Changes' })}
          </span>
        </div>
      </Button>
    </div>
  )
}
