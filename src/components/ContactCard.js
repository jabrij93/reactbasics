import React from 'react'
import './ContactCard.css'
import { Link } from 'react-router-dom'
import user from '../images/user.png'
import { useState } from 'react'
import { useContactsCrud } from '../context/ContactsCrudContext'

const ContactCard = (props) => {
  const { removeContactHandler } = useContactsCrud();

  const deleteContact = (id) => {
    removeContactHandler(id);
  }

  const { id, name, email } = props.contacts
  const [showConfirm, setShowConfirm] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)


  const handleDeleteClick = () => {
    setShowConfirm(true)
  }

  const handleUpdateClick = () => {
    setShowUpdate(true)
  }

  const handleConfirmDelete = () => {
    deleteContact(id) // parent handles delete + redirect + popup
    setShowConfirm(false)
  }

  const handleCancelDelete = () => {
    setShowConfirm(false)
  }

  return (
    <div className='contact-item'>
      <div className='contact-info'>
        <img className='ui avatar image' src={user} alt='user' />
        <div className='content'>
          <Link to={{ pathname:`/contact/${id}`, state: { contact: props.contacts } }}>
            <div className='header'>{name}</div>
            <div>{email}</div>
          </Link>
        </div>
      </div>

      <div className="buttons">
        <Link to={{ pathname:`/edit/${id}`, state: { contact: props.contacts } }}>
          <i
            className='edit alternate outline icon delete-icon blue'
            onClick={handleUpdateClick}
          ></i>
        </Link>

        <i
          className='trash alternate outline icon delete-icon'
          onClick={handleDeleteClick}
        ></i>
      </div>

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
  )
}

export default ContactCard
