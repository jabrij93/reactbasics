import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { ContactsCrudContextProvider } from './context/ContactsCrudContext';


function App() {
  const LOCAL_STORAGE_KEY = "contacts";
 
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });
  

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: '', type }), 2000);
  };


  return (
    <div className='ui container' style={{ margin: '70px 20px 20px', position: 'relative' }}>
      <Router>
        <Header />
        <ContactsCrudContextProvider >
          <Routes>
            <Route 
              path="/" 
              exact 
              element={<ContactList />}
            />
            <Route 
              path="/add" 
              element={<AddContact />}
            />
            <Route 
              path="/contacts/:id" 
              element={<EditContact />}
            />
            <Route 
              path="/contact/:id" 
              element={<ContactDetail />}
            />
          </Routes>
        </ContactsCrudContextProvider>
      </Router>

      {popup.show && <PopupMessage message={popup.message} type={popup.type} />}
    </div>
  );
}
export default App;