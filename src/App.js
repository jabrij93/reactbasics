import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import PopupMessage from './components/PopupMessage';
import ContactDetail from './components/ContactDetail';
import api from '../src/api/contacts';
import './App.css';


function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState([]);  
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });

  const addContactHandler = async (contact) => {
    
    const request = { id:uuid(), ...contact };

    const response = await api.post("/contacts", request)

    setContacts([...contacts, response.data]);
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

  // Retrieve Contacts 

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    console.log("API response:", response);
    console.log("API data:", response.data);
    return response.data;
  };

  // Load saved contacts from localStorage on app load
  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) {
        setContacts(allContacts);
      }
    }
    getAllContacts();
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
          <Route 
            path="/contact/:id" 
            render={(props) => (<ContactDetail 
              {...props} 
              clickHandler={removeContactHandler} 
              />)} 
          />
        </Switch>
      </Router>

      {popup.show && <PopupMessage message={popup.message} type={popup.type} />}
    </div>
  );
}

export default App;