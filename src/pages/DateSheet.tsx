import datesheetpdf from '../assets/datesheet.pdf'
import React from 'react'

function DateSheet() {
  return (
   <div>
      <embed
        src={datesheetpdf}
        type="application/pdf"
        style={{ width: "100%", height: "100vh" }}
      />
    </div>
  )
}

export default DateSheet