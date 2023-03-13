import styles from '../Filter/Filter.module.css';
import PropTypes from 'prop-types';

export default function Filter({ value, hendelChangeSerch }) {
  return (
    <label className={styles.label}>
      Find contacts by name
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={hendelChangeSerch}
      />
    </label>
  );
}


Filter.propTypes = {
  value: PropTypes.string.isRequired,
  hendelChangeSerch: PropTypes.func.isRequired

};
