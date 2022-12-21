import { Customer } from 'types'
import { DescriptionHeader, DescriptionList } from 'components'
import { useIntl } from 'react-intl'
import moment from 'moment'

type Props = {
  customer: Customer
}

export const CustomerDetails: React.FC<Props> = (props) => {
  const { customer } = props
  const intl = useIntl()

  const initials =
    customer.firstName.charAt(0).toUpperCase() + customer.lastName.charAt(0).toUpperCase()

  return (
    <div className="mt-8 border border-light-border dark:border-dark-border rounded">
      <DescriptionHeader.HeaderInitials
        description={intl.formatMessage({ defaultMessage: 'Personal details of customer' })}
        initials={initials}
        title={intl.formatMessage({ defaultMessage: 'Customer Information' })}
        bgColor="primary"
      />
      <DescriptionList.OneColumn
        title={intl.formatMessage({ defaultMessage: 'Customer Name' })}
        value={customer.fullName}
        bgGray
      />
      <DescriptionList.OneColumn
        title={intl.formatMessage({ defaultMessage: 'Customer ID' })}
        value={customer.customerID}
      />
      <DescriptionList.OneColumn
        title={intl.formatMessage({ defaultMessage: 'Document ID' })}
        value={customer.identityDocument}
        bgGray
      />
      <DescriptionList.OneColumn
        title={intl.formatMessage({ defaultMessage: 'Document Description' })}
        value={customer.docDescr}
      />
      <DescriptionList.OneColumn
        title={intl.formatMessage({ defaultMessage: 'Date of Birth' })}
        value={moment(new Date(customer.dateOfBirth)).format('YYYY-MM-DD')}
        bgGray
      />
      <DescriptionList.OneColumn
        title={intl.formatMessage({ defaultMessage: 'Gender' })}
        value={customer.sex}
      />
      <DescriptionList.OneColumn
        title={intl.formatMessage({ defaultMessage: 'Mobile Number' })}
        value={customer.phoneNumber}
        bgGray
      />
      <DescriptionList.OneColumn
        title={intl.formatMessage({ defaultMessage: 'Email' })}
        value={customer.emailId}
      />
      <DescriptionList.OneColumn
        title={intl.formatMessage({ defaultMessage: 'Address' })}
        value={`${customer.preferredAddress.address1} ${customer.preferredAddress.address2}`}
        bgGray
      />
      <DescriptionList.OneColumn
        title={intl.formatMessage({ defaultMessage: 'City' })}
        value={`${customer.preferredAddress.cityCodeDesc}`}
      />
      <DescriptionList.OneColumn
        title={intl.formatMessage({ defaultMessage: 'Memo' })}
        value={customer.memos && customer.memos.join('')}
        bgGray
        longText
      />
    </div>
  )
}
