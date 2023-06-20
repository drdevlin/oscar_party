import styles from './Pin.module.css';

export interface PinProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  description?: string;
  autoFocus?: boolean;
}

/* Input for PIN Code Entry */
export const Pin = ({ value, onChange, description = '', autoFocus = false }: PinProps) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (/\D+/.test(event.target.value)) return;
    onChange(event);
  };

  return (
    <div className={styles.pin}>
      <input
        className={styles.input}
        type="password"
        value={value}
        placeholder="_ _ _ _"
        autoFocus={autoFocus}
        onChange={handleChange}
      />
      <span className={styles.desc}>{description}</span>
    </div>
  );
};
