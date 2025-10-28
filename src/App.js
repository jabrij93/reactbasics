import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import AddContent from './components/AddContact';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';

function App() {
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact)
    setContacts([...contacts, contact]);
  };

  return (

    <div className='ui container'> 
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} />
      {/* <ContactCard/> */}
    </div>
  )
}

export default App;
