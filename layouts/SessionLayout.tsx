import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'components'
import { useIntl } from 'react-intl'

type Props = {
  isOpen: boolean
  setIsOpen: () => void
}

export const SessionLayout: React.FC<Props> = (props) => {
  const { isOpen, setIsOpen } = props
  const intl = useIntl()

  return (
    <Modal isOpen={isOpen} size="xs">
      <ModalHeader toggle={setIsOpen}>
        {intl.formatMessage({ defaultMessage: 'Information' })}
      </ModalHeader>
      <ModalBody>
        <div className="mt-2 h-full">
          <div className="font-montserrat mx-auto">
            <h4 className="text-h6 font-light mt-10 text-light-text dark:text-dark-text">
              {intl.formatMessage({
                defaultMessage: 'Your session will expire in 1 minute'
              })}
            </h4>
            <p className="mt-4 text-pNormal text-light-text font-light dark:text-dark-text">
              {intl.formatMessage({ defaultMessage: 'Click on the' })}{' '}
              <span className="text-primary font-medium">
                {intl.formatMessage({ defaultMessage: 'Close' })}
              </span>{' '}
              {intl.formatMessage({
                defaultMessage: 'button to resume'
              })}
            </p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button size="sm" color="default" outline onClick={setIsOpen}>
          {intl.formatMessage({ defaultMessage: 'Close' })}
        </Button>
      </ModalFooter>
    </Modal>
  )
}
