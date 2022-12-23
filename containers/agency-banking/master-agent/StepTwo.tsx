import { useState, useContext } from 'react'
import { useIntl } from 'react-intl'
import { LayoutContext } from 'contexts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Formik, Form } from 'formik'
import { SelectInput, Input, PhoneInput } from 'formik-controls'
import { Branch, Option, SuccessResponse, CustomerAccount, AgentFormValues, Customer } from 'types'
import { useFetchBranches } from 'hooks/common'
import { Button } from 'components'
import { masterAgentStepTwoValidation } from 'validation-schema/agency-banking'

type Props = {
  data: AgentFormValues
  customerAccounts: CustomerAccount[]
  handleNextStep: (values: AgentFormValues, final?: boolean) => void
  handlePrevStep: (values: AgentFormValues) => void
  customer: Customer
}

export const StepTwo: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { layout } = useContext(LayoutContext)
  const { customerAccounts, handleNextStep, handlePrevStep, data, customer } = props
  const [branches, setBranches] = useState<Option[]>([])
  const [usdCommissionAccounts, setUsdCommissionAccounts] = useState<Option[]>([])
  const [cdfCommissionAccounts, setCdfCommissionAccounts] = useState<Option[]>([])

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

  const onSubmit = (values: AgentFormValues) => {
    handleNextStep(values)
  }

  return (
    <Formik
      initialValues={data}
      onSubmit={onSubmit}
      validationSchema={masterAgentStepTwoValidation(intl)}
    >
      {({ isValid, values }) => (
        <Form>
          <div className="h-[32rem] relative animate__animated animate__fadeIn">
            <PerfectScrollbar className="px-1">
              <div className="mt-4 mb-6">
                <SelectInput
                  options={branches}
                  name="branch"
                  size={layout === 'mobile' ? 'sm' : 'md'}
                  label={intl.formatMessage({ defaultMessage: 'Select Branch' })}
                  loading={loadingBranches}
                />
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
                    label={intl.formatMessage({ defaultMessage: 'Master agent name' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: "Enter master agent's name"
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
            <Button size="sm" disabled={!isValid || loadingBranches} type="submit">
              {intl.formatMessage({ defaultMessage: 'Next' })}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
