import { useState } from 'react'
import { Formik, Form } from 'formik'
import { useIntl } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { AgentFormValues, Customer, AgentObject } from 'types'
import { AppleLoader, Button } from 'components'
import { DescriptionHeader, DescriptionList, FileViewerList, CreateSuccessError } from 'components'
import React from 'react'
import { DocumentViewer } from 'controllers'
import Link from 'next/link'
import moment from 'moment'

type Props = {
  data: AgentFormValues
  handleNextStep: (values: AgentFormValues, final?: boolean) => void
  handlePrevStep: (values: AgentFormValues) => void
  success: boolean
  error: string
  isSubmitting: boolean
  customer: Customer
  agent: AgentObject
}

export const StepFive: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { handleNextStep, handlePrevStep, data, error, isSubmitting, success, customer, agent } =
    props
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File>(null)

  const onSubmit = (values: AgentFormValues) => {
    handleNextStep(values, true)
  }

  const onViewFile = (file: File) => {
    setIsOpen(!isOpen)
    setFile(file)
  }

  const renderDocuments = (values: AgentFormValues) => {
    let node: React.ReactNode[] = []
    let files = [] as File[]
    if (values.agentLogo.length && !values.agentLogo[0]?.errors.length) {
      files.push(values.agentLogo[0]?.file)
    }
    if (files.length) {
      files.map((file, index) => {
        node.push(<FileViewerList file={file} key={index} onClick={onViewFile} rightAlign />)
      })
      return node
    }
    return null
  }

  return (
    <>
      <Formik initialValues={data} onSubmit={onSubmit}>
        {({ isValid, values }) => (
          <Form>
            <div className="h-[32rem] relative animate__animated animate__fadeIn">
              <PerfectScrollbar>
                {success ? (
                  <CreateSuccessError.Success
                    header={intl.formatMessage({ defaultMessage: 'Great!' })}
                    description={intl.formatMessage({
                      defaultMessage: 'Outlet has been created successfully'
                    })}
                    returnButtonText={intl.formatMessage({ defaultMessage: 'Return to Agents' })}
                    returnLink="/admin/agency-banking/agents-list"
                    createNewBtnText={intl.formatMessage({ defaultMessage: 'Create New' })}
                    createNewLink="/admin/agency-banking/create-agent"
                  />
                ) : error ? (
                  <CreateSuccessError.Error
                    header={intl.formatMessage({ defaultMessage: 'Oops!' })}
                    returnButtonText={intl.formatMessage({ defaultMessage: 'Return to Agents' })}
                    returnLink="/admin/agency-banking/agents-list"
                    error={error}
                  />
                ) : (
                  <div className="mt-8 border border-light-border dark:border-dark-border rounded">
                    <DescriptionHeader.Basic
                      description={intl.formatMessage({
                        defaultMessage: 'Application Summary'
                      })}
                      title={intl.formatMessage({ defaultMessage: 'Summary of form data' })}
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Outlet name' })}
                      value={values.agentName}
                      bgGray
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Branch' })}
                      value={values.branch.label}
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Trading accounts' })}
                      value={`${values.usdTradingAccount.label} | ${values.cdfTradingAccount?.label} `}
                      bgGray
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Commission accounts' })}
                      value={`${values.usdCommissionAccount.label} | ${values.cdfCommissionAccount.label} `}
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Outlet phone number' })}
                      value={values.phoneNumber}
                      bgGray
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Outlet manager name' })}
                      value={values.agencyManagerName}
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Outlet manager phone' })}
                      value={values.agencyManagerPhone}
                      bgGray
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Region' })}
                      value={values.agencyRegion}
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Province' })}
                      value={values.agencyProvince}
                      bgGray
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Territory' })}
                      value={values.agencyTerritory}
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Sector' })}
                      value={values.agencySector}
                      bgGray
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Street/Physical Location' })}
                      value={values.agencyStreet}
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Building' })}
                      value={values.agencyBuilding}
                      bgGray
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Requires POS Machine?' })}
                      value={
                        values.agencyPOSMachine
                          ? intl.formatMessage({ defaultMessage: 'True' })
                          : intl.formatMessage({ defaultMessage: 'False' })
                      }
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'GPRS' })}
                      value={values.latitude}
                      bgGray
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Documents' })}
                      value={renderDocuments(values)}
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Master agent code' })}
                      value={values.agentCode}
                      bgGray
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Selected master agent' })}
                      value={agent?.agentName}
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Customer name' })}
                      value={customer?.fullName}
                      bgGray
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'ID number' })}
                      value={customer?.identityDocument}
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Customer email' })}
                      value={customer?.emailId}
                      bgGray
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Date of incorporation' })}
                      value={moment(new Date(customer?.dateOfIncorporation)).format('DD/MM/YYYY')}
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Address' })}
                      value={customer?.preferredAddress?.address1}
                      bgGray
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'City' })}
                      value={customer?.preferredAddress?.cityCodeDesc}
                    />
                  </div>
                )}
              </PerfectScrollbar>
            </div>
            <div className="mt-8 py-6 flex justify-between border-t border-light-border dark:border-dark-border">
              {!success && (
                <Button size="sm" outline color="default" onClick={() => handlePrevStep(values)}>
                  {intl.formatMessage({ defaultMessage: 'Back' })}
                </Button>
              )}
              {!success ? (
                <Button size="sm" disabled={!isValid || isSubmitting} type="submit">
                  <div className="flex items-center space-x-2">
                    {isSubmitting && <AppleLoader size="lg" />}
                    <span>
                      {isSubmitting
                        ? intl.formatMessage({ defaultMessage: 'Processing...' })
                        : intl.formatMessage({ defaultMessage: 'Submit' })}
                    </span>
                  </div>
                </Button>
              ) : (
                <Link href="/admin/agency-banking/agents-list">
                  <Button size="sm">
                    {intl.formatMessage({ defaultMessage: 'Return to Agents' })}
                  </Button>
                </Link>
              )}
            </div>
          </Form>
        )}
      </Formik>
      {file && <DocumentViewer file={file} isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />}
    </>
  )
}
