import React from 'react'
import './ContactCard.css'
import user from '../images/user.png'

const ContactCard = (props) => {
  const { id, name, email } = props.contacts

  return (
    <div className='contact-item'>
      <div className='contact-info'>
        <img className='ui avatar image' src={user} alt='user' />
        <div className='content'>
          <div className='header'>{name}</div>
          <div>{email}</div>
        </div>
      </div>
      <i
        className='trash alternate outline icon delete-icon'
        onClick={() => props.clickHandler(id)}
      ></i>
    </div>
  )
}

export default ContactCard
