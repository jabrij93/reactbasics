import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Header from './components/Header';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import ContactList from './components/ContactList';
import PopupMessage from './components/PopupMessage';
import ContactDetail from './components/ContactDetail';
import api from '../src/api/contacts';
import './App.css';
import contacts from '../src/api/contacts';


function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState([]);  
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const addContactHandler = async (contact) => {
    
    const request = { id:uuid(), ...contact };

    const response = await api.post("/contacts", request)

    setContacts([...contacts, response.data]);
    showPopup('Add new contact successfully!', 'success');
  };

  const removeContactHandler = async (id) => {
    await api.delete(`contacts/${id}`);
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
    showPopup('Contact deleted successfully!', 'info');
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if ( searchTerm !== "" ) {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, {
      ...contact, // 🔑 force a new object
    });
  
    setContacts((prevContacts) =>
      prevContacts.map((c) =>
        c.id === contact.id
          ? { ...response.data } // 🔑 clone again
          : c
      )
    );

    showPopup('Update contact successfully!', 'info');
  }

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
        <Routes>
          <Route 
            path="/" 
            exact 
            render={(props) => (<ContactList 
              {...props} 
              contacts={searchTerm.length < 1 ? contacts : searchResults}
              getContactId={removeContactHandler} 
              term={searchTerm}
              searchKeyword={searchHandler}
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
            path="/edit" 
            render={(props) => (<EditContact 
              {...props} 
              updateContactHandler={updateContactHandler}
              />)}
          />
          <Route 
            path="/contact/:id" 
            render={(props) => (<ContactDetail 
              {...props} 
              clickHandler={removeContactHandler} 
              />)} 
          />
        </Routes>
      </Router>

      {popup.show && <PopupMessage message={popup.message} type={popup.type} />}
    </div>
  );
}
export default App;