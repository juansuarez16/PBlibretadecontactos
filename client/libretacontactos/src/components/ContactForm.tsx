import React, { useState, useEffect } from 'react';
import { Contact } from '../types';
import './ContactForm.css';
import 'react-datepicker/dist/react-datepicker.css';
import {ContactService} from '../services/ContactService';

interface Props {
  onContactCreated: (contact: Contact) => void;
  onContactEdited: (contact: Contact) => void;
  selectedContact?: Contact;
  onCancel: () => void;
  isEditing: boolean;
}

const ContactForm: React.FC<Props> = ({
  onContactCreated,
  onContactEdited,
  selectedContact,
  onCancel,
  isEditing,
}) => {
  const [contact, setContact] = useState<Contact>({
    nombre: '',
    apellido: '',
    telefono: '',
    correo_electronico: '',
    direccion: '',
    fecha_nacimiento: new Date(),
  });  
  const [hasContactChanged, setHasContactChanged] = useState(false);
  

  useEffect(() => {
    if (selectedContact) {
      setContact(selectedContact);
    }
  }, [selectedContact]);

  useEffect(() => {
    if (!hasContactChanged) {
      return;
    }
  
    if (isEditing) {
      onContactEdited(contact);
    } else {
      onContactCreated(contact);
    }
  
    setHasContactChanged(false);
  }, [hasContactChanged, isEditing, contact, onContactCreated, onContactEdited]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      try {        
        const updatedContact = await ContactService.updateContact(contact);
        onContactEdited(updatedContact);
        setHasContactChanged(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const newContact = await ContactService.createContact(contact);
        onContactCreated(newContact);
        setContact({
          nombre: '',
          apellido: '',
          telefono: '',
          correo_electronico: '',
          direccion: '',
          fecha_nacimiento: new Date(),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          name="nombre"
          defaultValue={contact.nombre}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="apellido">Apellido</label>
        <input
          type="text"
          className="form-control"
          id="apellido"
          name="apellido"
          defaultValue={contact.apellido}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Telefono</label>
        <input
          type="text"
          className="form-control"
          id="telefono"
          name="telefono"
          defaultValue={contact.telefono}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="correo_electronico">Correo electronico</label>
        <input
          type="email"
          className="form-control"
          id="correo_electronico"
          name="correo_electronico"
          defaultValue={contact.correo_electronico}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="direccion">Direccion</label>
        <input
          type="text"
          className="form-control"
          id="direccion"
          name="direccion"
          defaultValue={contact.direccion}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
        <input
      type="date"
      className="form-control"
      id="fecha_nacimiento"
      name="fecha_nacimiento"
      onChange={handleChange}
       />
      </div>

      <button type="submit" className="btn btn-primary">
        {selectedContact ? 'Actualizar' : 'Crear'}
      </button>
      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={onCancel}
      >
        Cancelar
      </button>
    </form>
  );
};
export default ContactForm;
