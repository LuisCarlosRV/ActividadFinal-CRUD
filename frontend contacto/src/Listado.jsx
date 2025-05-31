import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/contacts';

function Listado() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(setContacts);
  }, []);

  return (
    <div>
      <h1>Listado de Contactos</h1>
      <ul>
        {contacts.length === 0 ? (
          <p>No hay contactos aún.</p>
        ) : (
          contacts.map(contact => (
            <li key={contact.id}>
              <strong>{contact.name}</strong><br />
              <span>{contact.phone}</span><br />
              <span>{contact.email}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Listado;


