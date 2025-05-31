import './App.css';
import React, { useEffect, useState } from 'react';
import ContactList from './components/contactList';
import ContactForm from './components/contactForm';
import Listado from './Listado'; // Asegúrate que exista este archivo
import { Routes, Route, Link } from 'react-router-dom';

const API_URL = 'http://localhost:3000/contacts';

function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  const fetchContacts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setContacts(data);
  };

  const handleSave = async (contact) => {
    const res = await fetch(
      editingContact ? `${API_URL}/${editingContact.id}` : API_URL,
      {
        method: editingContact ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      }
    );
    await res.json();
    setEditingContact(null);
    fetchContacts();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <h1>Agenda de Contactos</h1>
      <ContactForm onSave={handleSave} contact={editingContact} />
      <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '20px' }}>Inicio</Link>
        <Link to="/listado">Ver Listado</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listado" element={<Listado />} />
      </Routes>
    </div>
  );
}

export default App;

