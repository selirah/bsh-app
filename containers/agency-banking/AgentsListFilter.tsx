import { Accordion, Button, AppleLoader } from 'components'
import { useIntl } from 'react-intl'
import { HiOutlineFilter } from 'react-icons/hi'
import { FiUploadCloud } from 'react-icons/fi'
import { BsFilter } from 'react-icons/bs'
import { Formik, Form } from 'formik'
import { Input, SelectInput } from 'formik-controls'
import { Option } from 'types'

type Props = {
  onHandleFilter: (values: FilterValues) => void
  agentTypes: Option[]
  agentStatus: Option[]
  branches: Option[]
  loadingAgentTypes: boolean
  loadingAgentStatus: boolean
  loadingBranches: boolean
  onClick?: () => void
  btnLoading?: boolean
}

export type FilterValues = {
  branches: Option[]
  agentTypes: Option[]
  agentStatus: Option[]
  keyword: string
}

export const AgentsListFilter: React.FC<Props> = (props) => {
  const {
    agentStatus,
    agentTypes,
    branches,
    onHandleFilter,
    loadingAgentStatus,
    loadingAgentTypes,
    loadingBranches,
    onClick,
    btnLoading
  } = props
  const intl = useIntl()
  const initialValues: FilterValues = {
    agentStatus: [],
    agentTypes: [],
    branches: [],
    keyword: ''
  }
  return (
    <Accordion.ActionButton
      btnText={intl.formatMessage({ defaultMessage: 'Filter' })}
      IconSVG={HiOutlineFilter}
      extraBtnColor="accent"
      extraBtnText={intl.formatMessage({ defaultMessage: 'Export' })}
      IconSVGExtra={FiUploadCloud}
      extraBtnAction={onClick}
      borderBottom
      btnLoading={btnLoading}
    >
      <Formik initialValues={initialValues} onSubmit={onHandleFilter}>
        {({ dirty, isSubmitting }) => (
          <Form>
            <div className="w-full mb-[16px]">
              <Input
                name="keyword"
                placeholder={intl.formatMessage({ defaultMessage: 'Enter agent code' })}
                size="sm"
              />
            </div>
            <div className="w-full block md:flex md:space-x-4">
              <div className="w-full mb-[16px] md:w-1/3">
                <SelectInput
                  name="agentTypes"
                  options={agentTypes}
                  size="sm"
                  isMulti
                  disabled={isSubmitting}
                  loading={loadingAgentTypes}
                />
              </div>
              <div className="w-full mb-[16px] md:w-1/3">
                <SelectInput
                  name="agentStatus"
                  options={agentStatus}
                  size="sm"
                  isMulti
                  disabled={isSubmitting}
                  loading={loadingAgentStatus}
                />
              </div>
              <div className="w-full mb-[16px] md:w-1/3">
                <SelectInput
                  name="branches"
                  options={branches}
                  size="sm"
                  isMulti
                  disabled={isSubmitting}
                  loading={loadingBranches}
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
