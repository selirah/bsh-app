import { AdminLayout, BasicContainer } from 'layouts'
import { routes } from 'containers/agency-banking'
import { useIntl } from 'react-intl'

const AgencyBankingPage = () => {
  const intl = useIntl()
  return (
    <AdminLayout pageTitle="Agency Banking" breadcrumbActions={routes(intl)}>
      <BasicContainer>Dashboard</BasicContainer>
    </AdminLayout>
  )
}

export default AgencyBankingPage
