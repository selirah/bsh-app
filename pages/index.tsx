import React from 'react'
import { AuthNav, Navbar } from 'layouts'

export default function Home() {
  return (
    <div className="m-56">
      <AuthNav />
      <div className="mt-8">
        <Navbar />
      </div>
    </div>
  )
}
