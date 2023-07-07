import classNames from 'classnames';

import styles from './Nominee.module.css';

export interface NomineeProps {
  name: string;
  input?: boolean;
  onClick: React.MouseEventHandler<HTMLSpanElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}
/* Provides an input element to create or modify a nominee. */
/* If not in input mode, it will simply display the nominee name. */
export const Nominee = ({ name, input, onClick, onChange, onCancel, onSubmit }: NomineeProps) => {
  const handleInputClick: React.MouseEventHandler<HTMLInputElement> = (event) => {
    event.stopPropagation();
  };

  return input ? (
    /* Input Mode */
    <div className={styles.inputFrame}>
      <input
        className={styles.input}
        value={name}
        placeholder="Nominee"
        onChange={onChange}
        onClick={handleInputClick}
      />
      <button className={classNames(styles.button, styles.xButton)} onClick={onCancel}>
        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
      </button>
      <button className={styles.button} onClick={onSubmit}>
        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
        </svg>
      </button>
    </div>
  ) : (
    /* Display Mode */
    <span onClick={onClick}>{name}</span>
  );
};
