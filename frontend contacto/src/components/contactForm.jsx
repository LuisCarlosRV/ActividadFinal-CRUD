import React, { useState, useEffect } from 'react';

function ContactForm({ onSave, contact }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    if (contact) setForm(contact);
    else setForm({ name: '', phone: '', email: '' });
  }, [contact]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({ name: '', phone: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" required />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Correo" />
      <button type="submit">{contact ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
}

export default ContactForm;
