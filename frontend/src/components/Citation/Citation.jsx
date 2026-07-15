import React from 'react'
import './Citation.css'

const Citation = ({id,onClick}) => {
  return (
    <button className='citation' onClick={onClick}>
        [{id}]
    </button>
  )
}

export default Citation