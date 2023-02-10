import { useState, useContext } from 'react'
import { useIntl } from 'react-intl'
import { LayoutContext } from 'contexts'
import { Formik, Form } from 'formik'
import { SelectInput, Input, PhoneInput, Checkbox } from 'formik-controls'
import {
  AgentObject,
  AgentFormValues,
  CustomerAccount,
  SuccessResponse,
  Branch,
  Option,
  AgentTypes,
  SchemeCodes
} from 'types'
import { Button, AppleLoader } from 'components'
import { useFetchBranches } from 'hooks/common'
import { outletEditValidation } from 'validation-schema/agency-banking'
import { MdEdit } from 'react-icons/md'

type Props = {
  agent: AgentObject
  customerAccounts: CustomerAccount[]
  onSubmit: (values: AgentFormValues) => void
  isSubmitting: boolean
}

export const EditOutletForm: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { layout } = useContext(LayoutContext)
  const { agent, customerAccounts, isSubmitting, onSubmit } = props
  const [branches, setBranches] = useState<Option[]>([])
  const [usdCommissionAccounts, setUsdCommissionAccounts] = useState<Option[]>([])
  const [cdfCommissionAccounts, setCdfCommissionAccounts] = useState<Option[]>([])
  const [usdTradingAccounts, setUsdTradingAccounts] = useState<Option[]>([])
  const [cdfTradingAccounts, setCdfTradingAccounts] = useState<Option[]>([])

  const [data, setData] = useState<AgentFormValues>({
    agentName: agent?.agentName,
    branch: null,
    usdCommissionAccount: null,
    cdfCommissionAccount: null,
    usdTradingAccount: null,
    cdfTradingAccount: null,
    agencyManagerName: agent?.agencyManagerName,
    agencyManagerPhone: agent?.agencyManagerPhone,
    agencyRegion: agent?.agencyRegion,
    agencyPOSMachine: agent?.agencyPOSMachine === 'true' ? true : false,
    agencyBuilding: agent?.agencyBuilding,
    agencyCommune: agent?.agencyCommune,
    agencyProvince: agent?.agencyProvince,
    agencySector: agent?.agencySector,
    agencyStreet: agent?.agencyStreet,
    agencyTerritory: agent?.agencyTerritory,
    latitude: agent?.latitude
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
      let trUsdArr: Option[] = []
      let trCdfArr: Option[] = []

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

      customerAccounts.map((acc) => {
        if (
          acc.currency === 'USD' &&
          agent.parentAgentType === AgentTypes.MASTERAGENT &&
          acc.schemeCode === SchemeCodes.CA233
        ) {
          return trUsdArr.push({ label: acc.name, value: JSON.stringify(acc) })
        } else if (
          acc.currency === 'USD' &&
          agent.parentAgentType === AgentTypes.SUBAGENT &&
          acc.schemeCode === SchemeCodes.CA234
        ) {
          return trUsdArr.push({ label: acc.name, value: JSON.stringify(acc) })
        } else if (
          acc.currency === 'USD' &&
          agent.parentAgentType === AgentTypes.ORDINARYAGENT &&
          (acc.schemeCode === SchemeCodes.CA213 || acc.schemeCode === SchemeCodes.CA268)
        ) {
          return trUsdArr.push({ label: acc.name, value: JSON.stringify(acc) })
        }
        if (
          acc.currency === 'CDF' &&
          agent.parentAgentType === AgentTypes.MASTERAGENT &&
          acc.schemeCode === SchemeCodes.CA233
        ) {
          return trCdfArr.push({ label: acc.name, value: JSON.stringify(acc) })
        } else if (
          acc.currency === 'CDF' &&
          agent.parentAgentType === AgentTypes.SUBAGENT &&
          acc.schemeCode === SchemeCodes.CA234
        ) {
          return trCdfArr.push({ label: acc.name, value: JSON.stringify(acc) })
        } else if (
          acc.currency === 'CDF' &&
          agent.parentAgentType === AgentTypes.ORDINARYAGENT &&
          (acc.schemeCode === SchemeCodes.CA213 || acc.schemeCode === SchemeCodes.CA268)
        ) {
          return trCdfArr.push({ label: acc.name, value: JSON.stringify(acc) })
        }
      })
      setUsdTradingAccounts(trUsdArr)
      setCdfTradingAccounts(trCdfArr)

      const branch = actualData.find((b) => b.branchId === agent.branchId)
      const usdCommission = customerAccounts.find(
        (a) =>
          a.accountNumber === agent.agentAccounts.find((a) => a.currency === 'USD').accountNumber
      )
      const cdfCommission = customerAccounts.find(
        (a) =>
          a.accountNumber === agent.agentAccounts.find((a) => a.currency === 'CDF').accountNumber
      )

      const usdTrading = customerAccounts.find(
        (a) =>
          a.accountNumber === agent.agentAccounts.find((a) => a.currency === 'USD').accountNumber
      )

      const cdfTrading = customerAccounts.find(
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
          cdfCommissionAccount: {
            label: cdfCommission?.name,
            value: JSON.stringify(cdfCommission)
          },
          usdTradingAccount: { label: usdTrading?.name, value: JSON.stringify(usdTrading) },
          cdfTradingAccount: { label: cdfTrading?.name, value: JSON.stringify(cdfTrading) }
        }
      }))
    }
  }

  const { isLoading: loadingBranches } = useFetchBranches(onFetchBranchesSuccess)

  return (
    <Formik
      initialValues={data}
      onSubmit={onSubmit}
      validationSchema={outletEditValidation(intl)}
      enableReinitialize
    >
      {({ isValid, values }) => (
        <Form>
          <div className="relative animate__animated animate__fadeIn">
            <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
              <div className="mb-4 md:mb-0">
                <Input
                  name="agentName"
                  label={intl.formatMessage({ defaultMessage: 'Outlet name' })}
                  size={layout === 'mobile' ? 'sm' : 'md'}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter outlet name'
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
            <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
              <div className="mb-4 md:mb-0">
                <Input
                  name="agencyManagerName"
                  label={intl.formatMessage({ defaultMessage: 'Outlet Manager Name' })}
                  size={layout === 'mobile' ? 'sm' : 'md'}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter outlet manager name'
                  })}
                />
              </div>
              <div className="mb-4 md:mb-0">
                <PhoneInput
                  name="agencyManagerPhone"
                  label={intl.formatMessage({ defaultMessage: 'Outlet Manager Phone number' })}
                  size={layout === 'mobile' ? 'sm' : 'md'}
                  value={values.agencyManagerPhone}
                />
              </div>
            </div>
            <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
              <div className="mb-4 md:mb-0">
                <Input
                  name="agencyRegion"
                  label={intl.formatMessage({ defaultMessage: 'Region' })}
                  size={layout === 'mobile' ? 'sm' : 'md'}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter region'
                  })}
                />
              </div>
              <div className="mb-4 md:mb-0">
                <Input
                  name="agencyProvince"
                  label={intl.formatMessage({ defaultMessage: 'Province' })}
                  size={layout === 'mobile' ? 'sm' : 'md'}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter province'
                  })}
                />
              </div>
            </div>
            <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
              <div className="mb-4 md:mb-0">
                <Input
                  name="agencyTerritory"
                  label={intl.formatMessage({ defaultMessage: 'Territory' })}
                  size={layout === 'mobile' ? 'sm' : 'md'}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter territory'
                  })}
                />
              </div>
              <div className="mb-4 md:mb-0">
                <Input
                  name="agencySector"
                  label={intl.formatMessage({ defaultMessage: 'Sector' })}
                  size={layout === 'mobile' ? 'sm' : 'md'}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter sector'
                  })}
                />
              </div>
            </div>
            <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
              <div className="mb-4 md:mb-0">
                <Input
                  name="agencyCommune"
                  label={intl.formatMessage({ defaultMessage: 'Commune' })}
                  size={layout === 'mobile' ? 'sm' : 'md'}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter commune'
                  })}
                />
              </div>
              <div className="mb-4 md:mb-0">
                <Input
                  name="agencyStreet"
                  label={intl.formatMessage({ defaultMessage: 'Street/Physical Location' })}
                  size={layout === 'mobile' ? 'sm' : 'md'}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter street name'
                  })}
                />
              </div>
            </div>
            <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
              <div className="mb-4 md:mb-0">
                <Input
                  name="agencyBuilding"
                  label={intl.formatMessage({ defaultMessage: 'Building' })}
                  size={layout === 'mobile' ? 'sm' : 'md'}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter building name'
                  })}
                />
              </div>
              <div className="mb-4 md:mb-0">
                <Input
                  name="latitude"
                  label={intl.formatMessage({ defaultMessage: 'GPRS Coodinates' })}
                  size={layout === 'mobile' ? 'sm' : 'md'}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter GPRS'
                  })}
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
                />
              </div>
              <div className="mb-4 md:mb-0">
                <SelectInput
                  options={cdfTradingAccounts}
                  name="cdfTradingAccount"
                  label={intl.formatMessage({ defaultMessage: 'CDF' })}
                  size={layout === 'mobile' ? 'sm' : 'md'}
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
            <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
              <div className="mb-4 md:mb-0">
                <Checkbox
                  name="agencyPOSMachine"
                  label={intl.formatMessage({
                    defaultMessage: 'Does outlet requires POS machine?'
                  })}
                  size={layout === 'mobile' ? 'sm' : 'md'}
                />
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
          </div>
        </Form>
      )}
    </Formik>
  )
}
