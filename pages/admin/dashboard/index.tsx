import React from 'react'
import { signOut } from 'next-auth/react'

const Dashboard = () => {
  signOut()
  return <div>index</div>
}

export default Dashboard
