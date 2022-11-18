import React, { useState } from 'react'
import { DatePicker } from 'components'

export default function Home() {
  const [dateRange, setDateRange] = useState<Date>(new Date())

  return (
    <div className="px-8 mt-10 m-56">
      <div className="mt-6">
        <DatePicker.Icon
          name="date"
          label="Date"
          size="md"
          onChange={(e) => setDateRange(e)}
          iconPosition="leading"
          value={dateRange}
        />
      </div>
    </div>
  )
}
