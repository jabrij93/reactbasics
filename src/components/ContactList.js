import React from 'react'
import { Link } from 'react-router-dom'
import ContactCard from './ContactCard'

const ContactList = (props) => {
  const deleteContactHandler = (id) => {
    props.getContactId(id)
  }

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contacts={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    )
  })

  return (
    <div className='ui celled list'>
      <div style={{ textAlign: 'left', marginBottom: '15px', color: '#333' }}>
        <h2> Contacts </h2>
        <Link to="/add">
          <button className='ui button blue right'>Add Contact</button>
        </Link>
      </div>

      {renderContactList.length > 0 ? (
        renderContactList
      ) : (
        <p style={{ color: '#777', marginLeft: '5px' }}>
          No contacts available. Add a new contact above.
        </p>
      )}
    </div>
  )
}

export default ContactList
