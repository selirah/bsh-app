import { Accordion, Button, AppleLoader } from 'components'
import { useIntl } from 'react-intl'
import { HiOutlineFilter } from 'react-icons/hi'
import { MdCreate } from 'react-icons/md'
import { BsFilter } from 'react-icons/bs'
import { Formik, Form } from 'formik'
import { Input } from 'formik-controls'
import { AgencyBankingFilterValues } from 'types'

type Props = {
  onHandleFilter: (values: AgencyBankingFilterValues) => void
  onClick?: () => void
  btnLoading?: boolean
}

export const OutletUsersFilter: React.FC<Props> = (props) => {
  const { onHandleFilter, btnLoading, onClick } = props
  const intl = useIntl()
  const initialValues: AgencyBankingFilterValues = {
    keyword: ''
  }

  return (
    <Accordion.ActionButton
      btnText={intl.formatMessage({ defaultMessage: 'Filter' })}
      IconSVG={HiOutlineFilter}
      extraBtnColor="primary"
      extraBtnText={intl.formatMessage({ defaultMessage: 'Add New User' })}
      IconSVGExtra={MdCreate}
      extraBtnAction={onClick}
      borderBottom
      btnLoading={btnLoading}
    >
      <Formik initialValues={initialValues} onSubmit={onHandleFilter}>
        {({ dirty, isSubmitting }) => (
          <Form>
            <div className="w-full block md:flex md:space-x-4">
              <div className="w-full mb-[16px] md:w-5/6">
                <Input
                  name="keyword"
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Search user with their phone number, id or name'
                  })}
                  size="sm"
                />
              </div>
              <div className="w-full mb-[16px] md:w-1/6">
                <Button size="sm" type="submit" disabled={isSubmitting || !dirty} block>
                  <div className="flex items-center space-x-2">
                    {isSubmitting ? <AppleLoader size="md" /> : <BsFilter />}
                    <span>
                      {isSubmitting
                        ? intl.formatMessage({ defaultMessage: 'Filtering...' })
                        : intl.formatMessage({ defaultMessage: 'Filter' })}
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Accordion.ActionButton>
  )
}
