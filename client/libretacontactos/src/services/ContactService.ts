import axios from 'axios';
import { Contact } from '../types';

const API_URL = 'http://localhost:3002/contactos';

export const ContactService = {
  getAllContacts: async (): Promise<Contact[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  createContact: async (contact: Contact): Promise<Contact> => {
    const response = await axios.post(API_URL, contact);
    return response.data;
  },

  updateContact: async (contact: Contact): Promise<Contact> => {
    const response = await axios.put(`${API_URL}/${contact.id}`, contact);
    return response.data;
  },

  deleteContact: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};