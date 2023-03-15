import React, { useState } from 'react';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import { Contact } from './types';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>(undefined);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleContactCreated = (contact: Contact) => {
    setContacts((prevContacts) => [...prevContacts, contact]);
  };

  const handleContactUpdated = (updatedContact: Contact) => {
    console.log(updatedContact);

    const updatedContacts = contacts.map((contact) => {
      if (contact.id === updatedContact.id) {
        return updatedContact;
      }
      return contact;
    });
    setContacts(updatedContacts);
  };

  function handleCancel() {
    setSelectedContact(undefined);
    setIsEditing(false);
  }

  return (
    <div className="cont">
      <div className="title">
        <h1>Libreta de Contactos</h1>
      </div>
      <ContactForm
        onContactCreated={handleContactCreated}
        onContactEdited={handleContactUpdated}
        selectedContact={selectedContact}
        onCancel={handleCancel}
        isEditing={isEditing}
      />
      <ContactList onContactEdited={handleContactUpdated} setSelectedContact={setSelectedContact}
        onCancel={handleCancel}
        setIsEditing={setIsEditing} />
    </div>
  );
}

export default App;