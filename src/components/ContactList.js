import React from 'react'
import ContactCard from './ContactCard'

const ContactList = (props) => {
  const deleteContactHandler = (id) => {
    props.getContactId(id)
  }

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    )
  })

  return (
    <div className='ui celled list'>
      <h2 style={{ textAlign: 'left', marginBottom: '15px', color: '#333' }}>
        Contacts
      </h2>

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
