import { useState, useContext, ChangeEvent, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { LayoutContext } from 'contexts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Formik, Form } from 'formik'
import { SelectInput, Input } from 'examples/formik-controls'
import {
  Branch,
  Option,
  SuccessResponse,
  CustomerAccount,
  AgentFormValues,
  Customer,
  ErrorResponse,
  CustomerSearchPayload,
  AgentObject,
  AgentTypes,
  SchemeCodes
} from 'types'
import { useFetchBranches } from 'hooks/common'
import { useConfirmAgentExistence } from 'hooks/agency-banking'
import { Button } from 'components'
import { outletStepOneValidation } from 'validation-schema/agency-banking'
import { useSearchCustomer } from 'hooks/customer'
import { onAxiosError } from 'utils'

type Props = {
  data: AgentFormValues
  handleNextStep: (values: AgentFormValues, final?: boolean) => void
  setError: (error: string) => void
  setCustomer: (customer: Customer) => void
  setAgent: (agent: AgentObject) => void
  agent: AgentObject
}

export const StepOne: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { layout } = useContext(LayoutContext)
  const { data, handleNextStep, setError, setCustomer, setAgent, agent } = props
  const [isAgentConfirmed, setIsAgentConfirmed] = useState(false)
  const [isError, setIsError] = useState(false)
  const [branches, setBranches] = useState<Option[]>([])
  const [usdCommissionAccounts, setUsdCommissionAccounts] = useState<Option[]>([])
  const [cdfCommissionAccounts, setCdfCommissionAccounts] = useState<Option[]>([])
  const [usdTradingAccounts, setUsdTradingAccounts] = useState<Option[]>([])
  const [cdfTradingAccounts, setCdfTradingAccounts] = useState<Option[]>([])
  const [customerAccounts, setCustomerAccounts] = useState<CustomerAccount[]>([])

  const onFetchBranchesSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      const actualData = data as Branch[]
      let arr: Option[] = []
      actualData.map((d) => {
        return arr.push({ label: d.name, value: JSON.stringify(d) })
      })
      setBranches(arr)
    }
  }

  const { isLoading: loadingBranches } = useFetchBranches(onFetchBranchesSuccess)

  const onCustomerSearchSuccess = (response: SuccessResponse) => {
    const { data, status } = response
    if (status === 200 && data) {
      const obj = data as Customer
      setCustomer(obj)
      let accountArr: CustomerAccount[] = []
      obj.accountDetails.map((a) => {
        return accountArr.push({
          name: `${a.currency} - ${a.schemeType} - ${a.accountNumber}`,
          ...a
        })
      })
      setCustomerAccounts(accountArr)
    }
  }

  const { mutate: searchCustomer, isLoading: searchingCustomer } = useSearchCustomer(
    onCustomerSearchSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onFetchAgentSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      setIsAgentConfirmed(true)
      const obj = data as AgentObject
      setAgent(obj)
      const payload: CustomerSearchPayload = {
        searchProperty: { label: 'CIF', value: 'CIF' },
        propertyData: obj.externalId
      }
      searchCustomer(payload)
    } else {
      setIsError(true)
      setError(
        intl.formatMessage({
          defaultMessage: 'Master/Sub Agent code cannot be found in the system'
        })
      )
    }
  }

  const { mutate: confirmAgentExistence } = useConfirmAgentExistence(
    onFetchAgentSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onSubmit = (values: AgentFormValues) => {
    handleNextStep(values)
  }

  const onHandleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setIsError(false)
    confirmAgentExistence(e.target.value)
  }

  useEffect(() => {
    if (customerAccounts.length && agent) {
      let trUsdArr: Option[] = []
      let trCdfArr: Option[] = []
      let commUsdArr: Option[] = []
      let commCdfArr: Option[] = []

      customerAccounts.map((acc) => {
        if (
          acc.currency === 'USD' &&
          agent.agentType === AgentTypes.MASTERAGENT &&
          acc.schemeCode === SchemeCodes.CA233
        ) {
          return trUsdArr.push({ label: acc.name, value: JSON.stringify(acc) })
        } else if (
          acc.currency === 'USD' &&
          agent.agentType === AgentTypes.SUBAGENT &&
          acc.schemeCode === SchemeCodes.CA234
        ) {
          return trUsdArr.push({ label: acc.name, value: JSON.stringify(acc) })
        } else if (
          acc.currency === 'USD' &&
          agent.agentType === AgentTypes.ORDINARYAGENT &&
          (acc.schemeCode === SchemeCodes.CA213 || acc.schemeCode === SchemeCodes.CA268)
        ) {
          return trUsdArr.push({ label: acc.name, value: JSON.stringify(acc) })
        }
        if (
          acc.currency === 'CDF' &&
          agent.agentType === AgentTypes.MASTERAGENT &&
          acc.schemeCode === SchemeCodes.CA233
        ) {
          return trCdfArr.push({ label: acc.name, value: JSON.stringify(acc) })
        } else if (
          acc.currency === 'CDF' &&
          agent.agentType === AgentTypes.SUBAGENT &&
          acc.schemeCode === SchemeCodes.CA234
        ) {
          return trCdfArr.push({ label: acc.name, value: JSON.stringify(acc) })
        } else if (
          acc.currency === 'CDF' &&
          agent.agentType === AgentTypes.ORDINARYAGENT &&
          (acc.schemeCode === SchemeCodes.CA213 || acc.schemeCode === SchemeCodes.CA268)
        ) {
          return trCdfArr.push({ label: acc.name, value: JSON.stringify(acc) })
        }
      })
      setUsdTradingAccounts(trUsdArr)
      setCdfTradingAccounts(trCdfArr)
      customerAccounts.map((acc) => {
        if (acc.currency === 'USD') {
          return commUsdArr.push({ label: acc.name, value: JSON.stringify(acc) })
        }
        if (acc.currency === 'CDF') {
          return commCdfArr.push({ label: acc.name, value: JSON.stringify(acc) })
        }
      })
      setUsdCommissionAccounts(commUsdArr)
      setCdfCommissionAccounts(commCdfArr)
    } else if (data.agentCode) {
      confirmAgentExistence(data.agentCode)
    }
  }, [customerAccounts, agent])

  return (
    <Formik
      initialValues={data}
      onSubmit={onSubmit}
      validationSchema={outletStepOneValidation(intl)}
    >
      {({ isValid }) => (
        <Form>
          <div className="h-[32rem] relative animate__animated animate__fadeIn">
            <PerfectScrollbar className="px-1">
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <Input
                    name="agentCode"
                    label={intl.formatMessage({ defaultMessage: 'Master/Sub agent code' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: "Enter master/sub agent's code"
                    })}
                    onBlur={onHandleBlur}
                    success={isAgentConfirmed}
                    disabled={isAgentConfirmed}
                    error={isError}
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <SelectInput
                    options={branches}
                    name="branch"
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    label={intl.formatMessage({ defaultMessage: 'Select Branch' })}
                    loading={loadingBranches}
                  />
                </div>
              </div>
              <h4 className="text-pLarge font-lato text-dark-btnText dark:text-light-btnText">
                {intl.formatMessage({ defaultMessage: 'Trading Accounts' })}
              </h4>
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <SelectInput
                    options={usdTradingAccounts}
                    name="usdTradingAccount"
                    label={intl.formatMessage({ defaultMessage: 'USD' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    loading={searchingCustomer}
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <SelectInput
                    options={cdfTradingAccounts}
                    name="cdfTradingAccount"
                    label={intl.formatMessage({ defaultMessage: 'CDF' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    loading={searchingCustomer}
                  />
                </div>
              </div>
              <h4 className="text-pLarge font-lato text-dark-btnText dark:text-light-btnText">
                {intl.formatMessage({ defaultMessage: 'Commission Accounts' })}
              </h4>
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <SelectInput
                    options={usdCommissionAccounts}
                    name="usdCommissionAccount"
                    label={intl.formatMessage({ defaultMessage: 'USD' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    loading={searchingCustomer}
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <SelectInput
                    options={cdfCommissionAccounts}
                    name="cdfCommissionAccount"
                    label={intl.formatMessage({ defaultMessage: 'CDF' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    loading={searchingCustomer}
                  />
                </div>
              </div>
            </PerfectScrollbar>
          </div>
          <div className="mt-8 py-6 flex justify-end border-t border-light-border dark:border-dark-border">
            <Button
              size="sm"
              disabled={!isValid || loadingBranches || !isAgentConfirmed}
              type="submit"
            >
              {intl.formatMessage({ defaultMessage: 'Next' })}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
