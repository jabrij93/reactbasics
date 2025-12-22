import { createContext, useContext, useState } from "react";
import api from '../api/contacts';
import { v4 as uuid } from 'uuid';
import PopupMessage from '../components/PopupMessage';


const contactsCrudContext = createContext();

export function ContactsCrudContextProvider ({ children }) {
    const [contacts, setContacts] = useState([]);
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

    // Delete Contacts
    const removeContactHandler = async (id) => {
        await api.delete(`contacts/${id}`);
        const newContactList = contacts.filter((contact) => contact.id !== id);
        setContacts(newContactList);
        showPopup('Contact deleted successfully!', 'info');
      };

    const value = {
        contacts,
        retrieveContacts,
        removeContactHandler,
        addContactHandler
    }

    return <contactsCrudContext.Provider value={value}>
        { children }
    </contactsCrudContext.Provider>
}

export function useContactsCrud() {
    return useContext(contactsCrudContext);
}