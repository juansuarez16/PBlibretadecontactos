import React, { useState, useEffect } from 'react';
import { Contact } from '../types';
import { ContactService } from '../services/ContactService';
import './ContactList.css';

type Props = {
  onContactEdited: (updatedContact: Contact) => void;
  setSelectedContact: (contact: Contact) => void;
  onCancel: () => void;
  setIsEditing: (isEditing: boolean) => void;
};

const ContactList: React.FC<Props> = ({ onContactEdited ,setSelectedContact,
  onCancel,
  setIsEditing}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);  

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const response = await ContactService.getAllContacts();
    console.log(response);
    setContacts(response);
  };

  const handleDelete = async (contact: Contact) => {
    await ContactService.deleteContact(contact.id ?? 0);
    setContacts(contacts.filter((c) => c.id !== contact.id));
  };

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEditing(true);
  };

 

  
  return (
    <div className='tableContainer'>
      <div className='titleTable'>
        <h2>Contactos</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Telefono</th>
            <th>Correo electronico</th>
            <th>Direccion</th>
            <th>Fecha de nacimiento</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.nombre}</td>
              <td>{contact.apellido}</td>
              <td>{contact.telefono}</td>
              <td>{contact.correo_electronico}</td>
              <td>{contact.direccion}</td>
              <td>{contact.fecha_nacimiento.toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(contact)}>Delete</button>
                <button onClick={() => handleEdit(contact)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default ContactList;
