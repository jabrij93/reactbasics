import { createContext, useContext, useState } from "react";
import api from '../api/contacts';
import { v4 as uuid } from 'uuid';
import PopupMessage from '../components/PopupMessage';

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider ({ children }) {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });

    const showPopup = (message, type) => {
        setPopup({ show: true, message, type });
        setTimeout(() => setPopup({ show: false, message: '', type }), 2000);
      };

    // Retrieve Contacts
    const retrieveContacts = async () => {
        const response = await api.get("/contacts");
        if (response.data){
            setContacts(response.data);
        }
      };

    // Add Contacts 
    const addContactHandler = async (contact) => {
        const request = { 
            id:uuid(), 
            ...contact 
        };
        const response = await api.post("/contacts", request)
        setContacts([...contacts, response.data]);
        showPopup('Add new contact successfully!', 'success');
      };  

    // Update Contacts
    const updateContactHandler = async (contact) => {
        const response = await api.put(`/contacts/${contact.id}`, {
          ...contact, 
        });
      
        setContacts((prevContacts) =>
          prevContacts.map((c) =>
            c.id === contact.id
              ? { ...response.data } 
              : c
          )
        );
    
        showPopup('Update contact successfully!', 'info');
      }
    
      // Search Contacts Functionality
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

    // Delete Contacts
    const removeContactHandler = async (id) => {
        await api.delete(`contacts/${id}`);
        const newContactList = contacts.filter((contact) => contact.id !== id);
        setContacts(newContactList);
        showPopup('Contact deleted successfully!', 'info');
      };

    const value = {
        contacts,
        searchTerm,
        searchResults,
        searchHandler,
        retrieveContacts,
        removeContactHandler,
        addContactHandler,
        updateContactHandler,
        showPopup,
    }

    return (
        <contactsCrudContext.Provider value={value}>
          {children}
          {popup.show && (
            <PopupMessage message={popup.message} type={popup.type} />
          )}
        </contactsCrudContext.Provider>
      );
      
}

export function useContactsCrud() {
    return useContext(contactsCrudContext);
}