import React from 'react'

const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='btn'
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
}

export default Button
