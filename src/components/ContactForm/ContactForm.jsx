import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Input from '../Input/Input';
import styles from '../ContactForm/ContactForm.module.css';
import PropTypes from 'prop-types';

export default function ContactForm({ contacts, hendelContactCreate }) {
  const [formState, setFormState] = useState({
    name: '',
    number: '',
  });

  const contactExists = (fieldName, fieldValue) => {
    return contacts.some(contact => contact[fieldName] === fieldValue);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (
      contactExists('name', formState.name) ||
      contactExists('number', formState.number)
    ) {
      alert('This name or number already exists.');
      return;
    }

    const newContact = { id: uuidv4(), ...formState };
    hendelContactCreate(newContact);
    reset();
  };

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    setFormState(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const reset = () => {
    setFormState({ name: '', number: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input state={formState} handleInputChange={handleInputChange} />
      <button type="submit">Add Contact</button>
    </form>
  );
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  hendelContactCreate: PropTypes.func.isRequired,
};
