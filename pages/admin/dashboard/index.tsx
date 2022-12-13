import { AdminLayout } from 'layouts'
import { useFetchCustomerData } from 'hooks/customer'
const Dashboard = () => {
  const payload = {
    searchProperty: 'CIF',
    propertyData: '2334343434',
    userId: '3'
  }

  const { data } = useFetchCustomerData(payload)

  console.log(data)

  return (
    <AdminLayout pageTitle="Dashboard">
      <div className="block bg-light-container dark:bg-dark-container shadow-penumbra rounded"></div>
    </AdminLayout>
  )
}

export default Dashboard
