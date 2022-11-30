import React from 'react'
import { Sidebar, Navbar } from 'layouts'

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
      </div>
    </div>
  )
}
