import React from 'react';

function ContactItem({ contact, onEdit, onDelete }) {
  return (
    <li>
      <strong>{contact.name}</strong> - {contact.phone} - {contact.email}
      <button onClick={() => onEdit(contact)}>Editar</button>
      <button onClick={() => onDelete(contact.id)}>Eliminar</button>
    </li>
  );
}

export default ContactItem;
