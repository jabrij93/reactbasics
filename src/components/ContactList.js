import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ContactCard from './ContactCard'
import { useContactsCrud } from '../context/ContactsCrudContext'

const ContactList = (props) => {
  const {contacts, retrieveContacts} = useContactsCrud();
  const inputEl = useRef("")


  useEffect(() => {
    retrieveContacts();
  }, [])

  const renderContactList = contacts.map((contact) => {
    return ( 
      <ContactCard
        contacts={contact} 
        key={contact.id}
      />
    )
  })

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value)
  };

  return (
    <div className='ui celled list'>
      <div style={{ textAlign: 'left', marginBottom: '15px', color: '#333' }}>
        <h2> Contacts </h2>
        <Link to="/add">
          <button className='ui button blue right'>Add Contact</button>
        </Link>
      </div>

      <div className='ui search'>
        <div className='ui icon input'>
          <input 
            ref={inputEl}
            type='text' 
            placeholder='Search Contacts' 
            className='prompt' 
            value={props.term} 
            onChange={getSearchTerm}
          />
          <i className='search icon'></i>
        </div>
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
