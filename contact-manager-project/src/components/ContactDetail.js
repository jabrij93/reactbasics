import React from 'react'
import './ContactCard.css'
import { Link } from 'react-router-dom'
import user from '../images/user.png'
import { useState } from 'react'

const ContactDetail = (props) => {
  console.log('ID',props.location.state.contact.id)
  const { name, email, id } = props.location.state.contact
  const [showConfirm, setShowConfirm] = useState(false)
  
    const handleDeleteClick = () => {
      setShowConfirm(true)
    }
  
    const handleConfirmDelete = () => {
      props.clickHandler(id) // parent handles delete + redirect + popup
      setShowConfirm(false)
    }
  
    const handleCancelDelete = () => {
      setShowConfirm(false)
    }

  return (
    <div className='main'>
        <div className='ui card centered' >
            <div className='image'>
                <img src={user} alt="user" />
            </div>
            <div className='content'>
                <div className='header'> { name } </div>
                <div className='description'> { email } </div>
            </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/">
                <button className='ui button blue center'> Back to Contact List </button>
            </Link>

            <i 
                className='trash alternate outline icon delete-icon'
                onClick={handleDeleteClick}
            />

            {/* Confirmation popup */}
            {showConfirm && (
                <div className='confirm-popup'>
                    <div className='confirm-content'>
                        <p>Confirm delete this contact?</p>
                        <div className='confirm-buttons'>
                          <Link to="/">
                            <button onClick={handleConfirmDelete} className='yes-btn'>
                              Yes
                            </button>
                          </Link>
                          <button onClick={handleCancelDelete} className='no-btn'>
                            No
                          </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default ContactDetail
