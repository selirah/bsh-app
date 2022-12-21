import { useState } from 'react'
import { Formik, Form } from 'formik'
import { useIntl } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MasterAgentFormValues, Customer } from 'types'
import { Button } from 'components'
import { DescriptionHeader, DescriptionList, FileViewerList } from 'components'
import React from 'react'
import { DocumentViewer } from 'controllers'

type Props = {
  data: MasterAgentFormValues
  handleNextStep: (values: MasterAgentFormValues, final?: boolean) => void
  handlePrevStep: (values: MasterAgentFormValues) => void
  customer: Customer
}

export const StepFour: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { handleNextStep, handlePrevStep, data, customer } = props
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File>(null)

  const onSubmit = (values: MasterAgentFormValues) => {
    handleNextStep(values, true)
  }

  const onViewFile = (file: File) => {
    setIsOpen(!isOpen)
    setFile(file)
  }

  const renderDocuments = (values: MasterAgentFormValues) => {
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
        node.push(<FileViewerList file={file} key={index} onClick={onViewFile} />)
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
                      title={intl.formatMessage({ defaultMessage: 'Commission account (UCDF)' })}
                      value={values.cdfCommissionAccount.label}
                      bgGray
                    />
                    <DescriptionList.OneColumn
                      title={intl.formatMessage({ defaultMessage: 'Documents' })}
                      value={renderDocuments(values)}
                    />
                  </div>
                </PerfectScrollbar>
              </div>
              <div className="mt-8 py-6 flex justify-between border-t border-light-border dark:border-dark-border">
                <Button size="sm" outline color="default" onClick={() => handlePrevStep(values)}>
                  {intl.formatMessage({ defaultMessage: 'Back' })}
                </Button>
                <Button size="sm" disabled={!isValid} type="submit">
                  {intl.formatMessage({ defaultMessage: 'Submit' })}
                </Button>
              </div>
            </Form>
          </>
        )}
      </Formik>
      {file && <DocumentViewer file={file} isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />}
    </>
  )
}
