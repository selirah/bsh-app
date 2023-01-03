import { useState } from 'react'
import { Formik, Form } from 'formik'
import { RadioGroup } from 'examples/formik-controls'
import { InferGetServerSidePropsType } from 'next'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import { useFetchAgentByCode, useVerifyAgent } from 'hooks/agency-banking'
import { useSearchCustomer } from 'hooks/customer'
import {
  AgentObject,
  ErrorResponse,
  SuccessResponse,
  Customer,
  CustomerSearchPayload,
  AgentFormValues,
  AgentPayload,
  Option
} from 'types'
import { Alert, BasicLoader, ToastBox } from 'components'
import { VerifyEdit, ReferAgent } from 'containers/agency-banking'
import { onAxiosError } from 'utils'
import { useRouter } from 'next/router'
import { useToast } from 'hooks'
import { reasonValidation } from 'validation-schema/agency-banking'
import { HiCheckBadge } from 'react-icons/hi2'

const VerifyEditPage = ({ agentCode }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl()
  const [agent, setAgent] = useState<AgentObject>(null)
  const [error, setError] = useState(null)
  const [customer, setCustomer] = useState<Customer>(null)
  const router = useRouter()
  const createToast = useToast()
  const initialValues: AgentFormValues = {
    action: '',
    reason: ''
  }

  const options = [
    {
      label: intl.formatMessage({ defaultMessage: 'Approve Changes' }),
      value: 'approve',
      helpText: intl.formatMessage({ defaultMessage: 'Click on the button to approve changes' })
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Refer to Maker' }),
      value: 'refer',
      helpText: intl.formatMessage({ defaultMessage: 'Refer agent to maker by providing reason' })
    }
  ] as Option[]

  const onCustomerSearchSuccess = (response: SuccessResponse) => {
    const { data, status } = response
    if (status === 200 && data) {
      const obj = data as Customer
      setCustomer(obj)
    }
  }

  const { mutate: searchCustomer, isLoading: searchingCustomer } = useSearchCustomer(
    onCustomerSearchSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onFetchAgentSuccess = (response: SuccessResponse) => {
    const { data, status } = response
    if (status === 200 && data) {
      const obj = data as AgentObject
      setAgent(obj)
      const payload: CustomerSearchPayload = {
        searchProperty: { label: 'CIF', value: 'CIF' },
        propertyData: obj.externalId
      }
      searchCustomer(payload)
    }
  }

  const { isLoading } = useFetchAgentByCode(
    agentCode,
    onFetchAgentSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onApproveEditSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      createToast(
        <ToastBox.Basic
          IconSVG={HiCheckBadge}
          color="success"
          title={intl.formatMessage({ defaultMessage: 'Nice!!' })}
          description={intl.formatMessage({
            defaultMessage: 'Action on agent has been performed successfully'
          })}
        />
      )
      router.push('/admin/agency-banking/agents-list')
    }
  }

  const { mutate: verifyAgent, isLoading: isSubmitting } = useVerifyAgent(
    onApproveEditSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onVerifyEdit = () => {
    const payload: AgentPayload = {
      agentStatusId: 1,
      agentId: agent?.agentId,
      agentAccounts: agent?.agentAccounts,
      agentName: agent?.agentName,
      msisdn: agent?.msisdn,
      externalId: agent?.externalId,
      parentAgentId: agent?.parentAgentId,
      agentTypeId: agent?.agentTypeId,
      logo: agent?.logo,
      branchId: agent?.branchId,
      agentDocuments: agent?.agentDocuments,
      agentCode: agent?.agentCode,
      idNumber: agent?.idNumber,
      agencyPOSMachine: agent?.agencyPOSMachine,
      agencyRegion: agent?.agencyRegion,
      agencyManagerPhone: agent?.agencyManagerPhone,
      agencyBranch: agent?.agencyBranch,
      agencyTerritory: agent?.agencyTerritory,
      agencySector: agent?.agencySector,
      agencyManagerName: agent?.agencyManagerName,
      agencyProvince: agent?.agencyProvince,
      agencyCommune: agent?.agencyCommune,
      agencyStreet: agent?.agencyStreet,
      agencyBuilding: agent?.agencyBuilding,
      latitude: agent?.latitude,
      longitude: '',
      clientDetails: customer
    }
    verifyAgent(payload)
  }

  const onSubmit = (values: AgentFormValues) => {
    const { reason } = values
    const payload: AgentPayload = {
      agentStatusId: 6,
      agentId: agent?.agentId,
      agentAccounts: agent?.agentAccounts,
      agentName: agent?.agentName,
      msisdn: agent?.msisdn,
      externalId: agent?.externalId,
      parentAgentId: agent?.parentAgentId,
      agentTypeId: agent?.agentTypeId,
      logo: agent?.logo,
      branchId: agent?.branchId,
      agentDocuments: agent?.agentDocuments,
      agentCode: agent?.agentCode,
      idNumber: agent?.idNumber,
      agencyPOSMachine: agent?.agencyPOSMachine,
      agencyRegion: agent?.agencyRegion,
      agencyManagerPhone: agent?.agencyManagerPhone,
      agencyBranch: agent?.agencyBranch,
      agencyTerritory: agent?.agencyTerritory,
      agencySector: agent?.agencySector,
      agencyManagerName: agent?.agencyManagerName,
      agencyProvince: agent?.agencyProvince,
      agencyCommune: agent?.agencyCommune,
      agencyStreet: agent?.agencyStreet,
      agencyBuilding: agent?.agencyBuilding,
      latitude: agent?.latitude,
      longitude: '',
      reason: reason
    }
    verifyAgent(payload)
  }

  return (
    <AdminLayout pageTitle="Verify Edit" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="py-[16px] border-b border-light-border dark:border-dark-border">
          <h4 className="text-h6 font-lato text-dark-btnText dark:text-light-btnText">
            {intl.formatMessage({ defaultMessage: 'Verify Edit' })}
          </h4>
        </div>
        <div className="mb-2">{error && <Alert color="error">{error}</Alert>}</div>
        <div className="mt-8">
          {isLoading || searchingCustomer ? <BasicLoader spinColor="primary" size="md" /> : null}
          {agent && customer && (
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={reasonValidation(intl)}
            >
              {({ values, isValid }) => {
                const { action } = values
                return (
                  <Form>
                    <div className="md:grid md:grid-cols-2">
                      <div className="mb-2">
                        <RadioGroup options={options} name="action" space direction="right" />
                      </div>
                      <div className="block">
                        {action === 'approve' && (
                          <VerifyEdit isSubmitting={isSubmitting} onVerifyEdit={onVerifyEdit} />
                        )}
                        {action === 'refer' && (
                          <ReferAgent isSubmitting={isSubmitting} isValid={isValid} />
                        )}
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          )}
        </div>
      </BasicContainer>
    </AdminLayout>
  )
}

export async function getServerSideProps({ query }) {
  const agentCode = query.agentCode as string
  return {
    props: {
      agentCode
    }
  }
}

export default authorizationHOC('AgencyBanking:Verify', VerifyEditPage, true)
