import { useState, useContext, ChangeEvent } from 'react'
import { useIntl } from 'react-intl'
import { LayoutContext } from 'contexts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Formik, Form } from 'formik'
import { SelectInput, Input, PhoneInput } from 'formik-controls'
import {
  Branch,
  Option,
  SuccessResponse,
  CustomerAccount,
  AgentFormValues,
  Customer,
  ErrorResponse
} from 'types'
import { useFetchBranches } from 'hooks/common'
import { useConfirmAgentExistence } from 'hooks/agency-banking'
import { Button } from 'components'
import { subAgentStepTwoValidation } from 'validation-schema/agency-banking'
import { onAxiosError } from 'utils'

type Props = {
  data: AgentFormValues
  customerAccounts: CustomerAccount[]
  handleNextStep: (values: AgentFormValues, final?: boolean) => void
  handlePrevStep: (values: AgentFormValues) => void
  customer: Customer
  setError: (error: string) => void
}

export const StepTwo: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { layout } = useContext(LayoutContext)
  const { customerAccounts, handleNextStep, handlePrevStep, data, customer, setError } = props
  const [branches, setBranches] = useState<Option[]>([])
  const [usdCommissionAccounts, setUsdCommissionAccounts] = useState<Option[]>([])
  const [cdfCommissionAccounts, setCdfCommissionAccounts] = useState<Option[]>([])
  const [isAgentConfirmed, setIsAgentConfirmed] = useState(false)
  const [isError, setIsError] = useState(false)

  const onFetchBranchesSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      const actualData = data as Branch[]
      let arr: Option[] = []
      actualData.map((d) => {
        return arr.push({ label: d.name, value: JSON.stringify(d) })
      })
      setBranches(arr)
      let usdArr: Option[] = []
      let cdfArr: Option[] = []
      customerAccounts.map((a) => {
        if (a.currency === 'USD') {
          return usdArr.push({ label: a.name, value: JSON.stringify(a) })
        }
        if (a.currency === 'CDF') {
          return cdfArr.push({ label: a.name, value: JSON.stringify(a) })
        }
      })
      setUsdCommissionAccounts(usdArr)
      setCdfCommissionAccounts(cdfArr)
    }
  }

  const { isLoading: loadingBranches } = useFetchBranches(onFetchBranchesSuccess)

  const onFetchAgentSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      setIsAgentConfirmed(true)
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

  return (
    <Formik
      initialValues={data}
      onSubmit={onSubmit}
      validationSchema={subAgentStepTwoValidation(intl)}
    >
      {({ isValid, values }) => (
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
                {intl.formatMessage({ defaultMessage: 'Commission Accounts' })}
              </h4>
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <SelectInput
                    options={usdCommissionAccounts}
                    name="usdCommissionAccount"
                    label={intl.formatMessage({ defaultMessage: 'USD' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <SelectInput
                    options={cdfCommissionAccounts}
                    name="cdfCommissionAccount"
                    label={intl.formatMessage({ defaultMessage: 'CDF' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                  />
                </div>
              </div>
              <div className="mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <Input
                    name="agentName"
                    label={intl.formatMessage({ defaultMessage: 'Sub agent name' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: "Enter sub-agent's name"
                    })}
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <PhoneInput
                    name="phoneNumber"
                    label={intl.formatMessage({ defaultMessage: 'Phone number' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    value={customer.phoneNumber}
                    disabled
                  />
                </div>
              </div>
            </PerfectScrollbar>
          </div>
          <div className="mt-8 py-6 flex justify-between border-t border-light-border dark:border-dark-border">
            <Button size="sm" outline color="default" onClick={() => handlePrevStep(values)}>
              {intl.formatMessage({ defaultMessage: 'Back' })}
            </Button>
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
