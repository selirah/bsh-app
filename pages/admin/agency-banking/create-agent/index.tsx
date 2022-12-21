import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import { RadioGroup } from 'formik-controls'
import { Button } from 'components'
import { Option } from 'types'
import { agentTypeValidation } from 'validation-schema'

const options = [
  {
    label: 'Master agent',
    value: 'create-agent/master-agent'
  },
  {
    label: 'Ordinary agent',
    value: 'create-agent/ordinary-agent'
  },
  {
    label: 'Sub agent',
    value: 'create-agent/sub-agent'
  },
  {
    label: 'Outlet',
    value: 'create-agent/outlet'
  }
] as Option[]

const CreateAgentPage = () => {
  const intl = useIntl()
  const initialValues = {
    agentType: ''
  }
  const router = useRouter()

  const onSubmit = (values: { agentType: string }) => {
    router.push(values.agentType)
  }

  return (
    <AdminLayout pageTitle="Create Agent" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="border-b border-light-border dark:border-dark-border py-[16px] font-lato text-h6 text-dark-btnText dark:text-light-btnText">
          <h4>{intl.formatMessage({ defaultMessage: 'Select an agent type' })}</h4>
        </div>
        <div className="w-full">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={agentTypeValidation(intl)}
          >
            {({ isValid }) => (
              <Form>
                <div className="mb-10">
                  <RadioGroup options={options} name="agentType" direction="right" space />
                </div>

                <Button type="submit" disabled={!isValid}>
                  {intl.formatMessage({ defaultMessage: 'Go' })}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </BasicContainer>
    </AdminLayout>
  )
}

export default authorizationHOC('AgencyBanking:Create', CreateAgentPage, true)
