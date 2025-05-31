import React from 'react';
import ContactItem from './contactItem';

function ContactList({ contacts, onEdit, onDelete }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default ContactList;

