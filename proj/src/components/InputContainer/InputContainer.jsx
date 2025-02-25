import React from 'react'
import './inputcont.css'
export default function InputContainer({label,bgColor,children}) {

  return (
    <div className='inputcon-container' style={{backgroundColor:bgColor}}>
        <label className='label'>{label}</label>
        <div className='content'>{children}</div>
      
    </div>
  )
}
