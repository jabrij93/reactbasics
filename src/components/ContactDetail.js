import React from 'react'
import './ContactCard.css'
import { Link } from 'react-router-dom'
import user from '../images/user.png'

const ContactDetail = (props) => {
    console.log('CD:', props.location.state.contact);
    const { name, email } = props.location.state.contact;
  return (
    <div className='main'>
        <div class name='ui card centered' >
            <div className='image'>
                <img src={user} alt="user" />
            </div>
            <div className='content'>
                <div className='header'> { name } </div>
                <div className='description'> { email } </div>
            </div>
        </div>
    </div>
  )
}

export default ContactDetail
