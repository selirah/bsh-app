import { useState, useContext } from 'react'
import { Formik, Form } from 'formik'
import { LayoutContext } from 'contexts'
import { Textarea } from 'examples/formik-controls'
import { InferGetServerSidePropsType } from 'next'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import { useFetchAgentByCode, useUnblockAgent } from 'hooks/agency-banking'
import { useSearchCustomer } from 'hooks/customer'
import {
  AgentObject,
  ErrorResponse,
  SuccessResponse,
  Customer,
  CustomerSearchPayload,
  AgentFormValues,
  AgentPayload
} from 'types'
import { Alert, BasicLoader, ToastBox, Button, AppleLoader } from 'components'
import { onAxiosError } from 'utils'
import { useRouter } from 'next/router'
import { useToast } from 'hooks'
import { reasonValidation } from 'validation-schema/agency-banking'
import { HiCheckBadge, HiLockOpen } from 'react-icons/hi2'

const UnblockAgentPage = ({
  agentCode
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl()
  const { layout } = useContext(LayoutContext)
  const [agent, setAgent] = useState<AgentObject>(null)
  const [error, setError] = useState(null)
  const [customer, setCustomer] = useState<Customer>(null)
  const router = useRouter()
  const createToast = useToast()
  const initialValues: AgentFormValues = {
    reason: ''
  }

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

  const onUnblockAgentSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      createToast(
        <ToastBox.Basic
          IconSVG={HiCheckBadge}
          color="success"
          title={intl.formatMessage({ defaultMessage: 'Nice!!' })}
          description={intl.formatMessage({
            defaultMessage: 'Agent has been unblocked successfully'
          })}
        />
      )
      router.push('/admin/agency-banking/agents-list')
    }
  }

  const { mutate: blockAgent, isLoading: isSubmitting } = useUnblockAgent(
    onUnblockAgentSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onSubmit = (values: AgentFormValues) => {
    const { reason } = values
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
      reason: reason
    }
    blockAgent(payload)
  }

  return (
    <AdminLayout pageTitle="Unblock Agent" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="py-[16px] border-b border-light-border dark:border-dark-border">
          <h4 className="text-h6 font-lato text-dark-btnText dark:text-light-btnText">
            {intl.formatMessage({ defaultMessage: 'Unblock Agent' })}
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
              {({ isValid }) => {
                return (
                  <Form>
                    <div className="w-1/2">
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
                            {isSubmitting ? <AppleLoader size="md" /> : <HiLockOpen />}
                            <span>
                              {isSubmitting
                                ? intl.formatMessage({ defaultMessage: 'Processing...' })
                                : intl.formatMessage({ defaultMessage: 'Unblock' })}
                            </span>
                          </div>
                        </Button>
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

export default authorizationHOC('AgencyBanking:Block', UnblockAgentPage, true)
