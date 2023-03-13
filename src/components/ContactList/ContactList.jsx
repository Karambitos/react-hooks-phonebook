import styles from '../ContactList/ContactList.module.css';
import PropTypes from 'prop-types';

export default function ContactList({ contacts, hendelContactDelite }) {
  return (
    <ul className={styles.contactList}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={styles.contactItem} key={id}>
            <p>{name}</p>
            <p>{number}</p>
            <button onClick={() => hendelContactDelite(id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}


ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  hendelContactDelite: PropTypes.func.isRequired
};
