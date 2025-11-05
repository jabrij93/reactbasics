import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import './App.css';
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import PopupMessage from './components/PopupMessage';
import ContactDetail from './components/ContactDetail';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedContacts ? JSON.parse(storedContacts) : [];
  });  
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
    showPopup('Add new contact successfully!', 'success');
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
    showPopup('Contact deleted successfully!', 'info');
  };

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: '', type }), 2000);
  };

  // Load saved contacts from localStorage on app load
  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrieveContacts) setContacts(retrieveContacts);
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container' style={{ margin: '70px 20px 20px', position: 'relative' }}>
      <Router>
        <Header />
        <Switch>
          <Route 
            path="/" 
            exact 
            render={(props) => (<ContactList 
              {...props} 
              contacts={contacts} 
              getContactId={removeContactHandler} 
              />)}
          />
          <Route 
            path="/add" 
            render={(props) => (<AddContact 
              {...props} 
              addContactHandler={addContactHandler}
              />)}
          />
          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>

      {popup.show && <PopupMessage message={popup.message} type={popup.type} />}
    </div>
  );
}

export default App;