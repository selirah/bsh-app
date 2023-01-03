import { useState, useContext } from 'react'
import { useIntl } from 'react-intl'
import { LayoutContext } from 'contexts'
import { Formik, Form } from 'formik'
import { SelectInput, Input } from 'examples/formik-controls'
import {
  AgentObject,
  AgentFormValues,
  CustomerAccount,
  SuccessResponse,
  Branch,
  Option
} from 'types'
import { Button, AppleLoader } from 'components'
import { useFetchBranches } from 'hooks/common'
import { masterAgentStepTwoValidation } from 'validation-schema/agency-banking'
import { MdEdit } from 'react-icons/md'

type Props = {
  agent: AgentObject
  customerAccounts: CustomerAccount[]
  onSubmit: (values: AgentFormValues) => void
  isSubmitting: boolean
}

export const EditAgentForm: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { layout } = useContext(LayoutContext)
  const { agent, customerAccounts, isSubmitting, onSubmit } = props
  const [branches, setBranches] = useState<Option[]>([])
  const [usdCommissionAccounts, setUsdCommissionAccounts] = useState<Option[]>([])
  const [cdfCommissionAccounts, setCdfCommissionAccounts] = useState<Option[]>([])

  const [data, setData] = useState<AgentFormValues>({
    agentName: agent?.agentName,
    branch: null,
    usdCommissionAccount: null,
    cdfCommissionAccount: null
  })

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
      const branch = actualData.find((b) => b.branchId === agent.branchId)
      const usdCommission = customerAccounts.find(
        (a) =>
          a.accountNumber === agent.agentAccounts.find((a) => a.currency === 'USD').accountNumber
      )
      const cdfCommission = customerAccounts.find(
        (a) =>
          a.accountNumber === agent.agentAccounts.find((a) => a.currency === 'CDF').accountNumber
      )

      setData((prev) => ({
        ...prev,
        ...{
          branch: { label: branch?.name, value: JSON.stringify(branch) },
          usdCommissionAccount: {
            label: usdCommission?.name,
            value: JSON.stringify(usdCommission)
          },
          cdfCommissionAccount: { label: cdfCommission?.name, value: JSON.stringify(cdfCommission) }
        }
      }))
    }
  }

  const { isLoading: loadingBranches } = useFetchBranches(onFetchBranchesSuccess)

  return (
    <Formik
      initialValues={data}
      onSubmit={onSubmit}
      validationSchema={masterAgentStepTwoValidation(intl)}
      enableReinitialize
    >
      {({ isValid }) => (
        <Form>
          <div className="animate__animated animate__fadeIn">
            <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
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
              <div className="mb-6">
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
          </div>
          <div className="mt-8 py-6">
            <Button size="md" disabled={!isValid || loadingBranches} type="submit">
              <div className="flex items-center space-x-2">
                {isSubmitting ? <AppleLoader size="lg" /> : <MdEdit />}
                <span>
                  {isSubmitting
                    ? intl.formatMessage({ defaultMessage: 'Processing...' })
                    : intl.formatMessage({ defaultMessage: 'Submit' })}
                </span>
              </div>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
