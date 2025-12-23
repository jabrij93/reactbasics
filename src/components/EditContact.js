import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useContactsCrud } from '../context/ContactsCrudContext'
import { useNavigate } from 'react-router-dom';

const EditContact = () => {
    const location = useLocation();
    const { id, name, email } = location.state.contact;
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const { updateContactHandler } = useContactsCrud();
    const navigate = useNavigate();

    const update = (e) => {
        e.preventDefault();
        if (newName === "" || newEmail === "") {
            alert("All the fields are mandatory!");
            return;
        }
        updateContactHandler({id, name: newName, email: newEmail});
        setNewName('');
        setNewEmail('');
        navigate("/");
    }

        return (
            <div className='ui main'>
                <h2>Update Contact</h2>

                <form className='ui form' onSubmit={update}> 
                    <div className='field'>
                        <label>Name</label>
                        <input 
                            type='text' 
                            name='name' 
                            value={newName}
                            placeholder='Name'
                            style={{width: '50%'}} 
                            onChange={ (e) => setNewName(e.target.value)}
                        />
                    </div>
                    <div className='field'>
                        <label>Email</label>
                        <input 
                            type='text' 
                            name='email' 
                            value={newEmail}
                            placeholder='Email'
                            style={{width: '50%'}}
                            onChange={ (e) => setNewEmail(e.target.value)}
                        />
                    </div>
                    <button className='ui button blue'>Update</button>
                </form>
            </div>
        )
}

export default EditContact;