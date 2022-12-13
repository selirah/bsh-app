import { AdminLayout } from 'layouts'
import { useFetchBranches } from 'hooks/common'

const Dashboard = () => {
  const { data } = useFetchBranches()

  console.log(data)

  return (
    <AdminLayout pageTitle="Dashboard">
      <div className="block bg-light-container dark:bg-dark-container shadow-penumbra rounded"></div>
    </AdminLayout>
  )
}

export default Dashboard
