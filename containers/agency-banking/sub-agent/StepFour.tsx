import { useState } from 'react'
import { Formik, Form } from 'formik'
import { useIntl } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { AgentFormValues, Customer } from 'types'
import { AppleLoader, Button } from 'components'
import { DescriptionHeader, DescriptionList, FileViewerList, CreateSuccessError } from 'components'
import React from 'react'
import { DocumentViewer } from 'controllers'
import Link from 'next/link'

type Props = {
  data: AgentFormValues
  handleNextStep: (values: AgentFormValues, final?: boolean) => void
  handlePrevStep: (values: AgentFormValues) => void
  customer: Customer
  success: boolean
  error: string
  isSubmitting: boolean
}

export const StepFour: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { handleNextStep, handlePrevStep, data, customer, error, isSubmitting, success } = props
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
    if (values.businessCertificate.length && !values.businessCertificate[0]?.errors.length) {
      files.push(values.businessCertificate[0]?.file)
    }
    if (values.scannedDocuments.length) {
      values.scannedDocuments.map((doc) => {
        if (!doc.errors.length) {
          files.push(doc.file)
        }
      })
    }
    if (values.otherDocuments.length) {
      values.otherDocuments.map((doc) => {
        if (!doc.errors.length) {
          files.push(doc.file)
        }
      })
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
          <>
            <Form>
              <div className="h-[32rem] relative animate__animated animate__fadeIn">
                <PerfectScrollbar>
                  {success ? (
                    <CreateSuccessError.Success
                      header={intl.formatMessage({ defaultMessage: 'Great!' })}
                      description={intl.formatMessage({
                        defaultMessage: 'Sub agent has been created successfully'
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
                        title={intl.formatMessage({ defaultMessage: 'Master agent name' })}
                        value={values.agentName}
                        bgGray
                      />
                      <DescriptionList.OneColumn
                        title={intl.formatMessage({ defaultMessage: 'Phone number' })}
                        value={customer.phoneNumber}
                      />
                      <DescriptionList.OneColumn
                        title={intl.formatMessage({ defaultMessage: 'Branch' })}
                        value={values.branch.label}
                        bgGray
                      />
                      <DescriptionList.OneColumn
                        title={intl.formatMessage({ defaultMessage: 'Commission account (USD)' })}
                        value={values.usdCommissionAccount.label}
                      />
                      <DescriptionList.OneColumn
                        title={intl.formatMessage({ defaultMessage: 'Commission account (CDF)' })}
                        value={values.cdfCommissionAccount.label}
                        bgGray
                      />
                      <DescriptionList.OneColumn
                        title={intl.formatMessage({ defaultMessage: 'Documents' })}
                        value={renderDocuments(values)}
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
          </>
        )}
      </Formik>
      {file && <DocumentViewer file={file} isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />}
    </>
  )
}
