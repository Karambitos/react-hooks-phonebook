import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import { useState, useEffect, useRef } from 'react';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const contactsLocal = localStorage.getItem('contacts');
      if (contactsLocal && JSON.parse(contactsLocal).length) {
        setContacts(JSON.parse(contactsLocal));
      }
      isFirstRender.current = false;
      return;
    } else {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts.length]);

  const hendelContactCreate = newContact => {
    const updatedContacts = [newContact, ...contacts];
    setContacts(updatedContacts);
  };

  const hendelContactDelite = id => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const hendelChangeSerch = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.toLowerCase().includes(normalizedFilter)
    );
  };

  const filterContacts = getFilterContacts();

  return (
    <div className="main">
      <h1>Phonebook</h1>
      <ContactForm
        contacts={contacts}
        hendelContactCreate={hendelContactCreate}
      />
      <h2>Contacts</h2>
      <Filter value={filter} hendelChangeSerch={hendelChangeSerch} />
      <ContactList
        contacts={getFilterContacts()}
        hendelContactDelite={hendelContactDelite}
      />
    </div>
  );
}
