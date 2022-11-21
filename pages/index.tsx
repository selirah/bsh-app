import React from 'react'
import { Empty } from 'components'

export default function Home() {
  return (
    <div className="px-8 m-56">
      <Empty.Filter title="No results found" border>
        Get started by creating anew project
      </Empty.Filter>
    </div>
  )
}
