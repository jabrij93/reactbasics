import React from 'react'
import ContactCard from './ContactCard'

const ContactList = (props) => {
  const deleteContactHandler = (id) => {
    props.getContactId(id)
  }

  const contacts = [
    {
      id: "1",
      name: "John Doe",
      email: "cs@gmail.com"
    }
  ]

  const renderContactList = contacts.map((contact) => {
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
      <div style={{ textAlign: 'left', marginBottom: '15px', color: '#333' }}>
        <h2> Contacts </h2>
        <button className='ui button blue right'>Add Contact</button>
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
