import { useRef, useState } from 'react';
import styles from './Pin.module.css';

// Helpers
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type DigitSlot = Digit | null;
type PIN = [DigitSlot, DigitSlot, DigitSlot, DigitSlot];
type PINIndex = 0 | 1 | 2 | 3;

const pinToString = (pin: PIN) => pin.map((slot) => slot ?? '_').join('');

// Component
export interface PinProps {
  onChange: (value: string) => void;
  description?: string;
  autoFocus?: boolean;
}

/* Input for PIN Code Entry */
export const Pin = ({ onChange, description = '', autoFocus = false }: PinProps) => {
  // State
  const [pin, setPin] = useState<PIN>([null, null, null, null]);

  // References
  const inputs: React.MutableRefObject<HTMLInputElement | null>[] = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Handlers
  const handleChange = (pinIndex: PINIndex): React.ChangeEventHandler<HTMLInputElement> => (event) => {
    // Get current value.
    const currentValue = event.currentTarget.value;

    // It must be a single digit.
    if (currentValue.length > 1) return;

    // It must be a number
    const currentValueAsNumber = Number(currentValue);
    if (Number.isNaN(currentValueAsNumber)) return;

    // Determine new value.
    const newValue: DigitSlot = currentValue === '' ? null : currentValueAsNumber as Digit;

    // Don't modify pin state directly.
    let pinCopy: PIN = [...pin];

    // Replace old value with new.
    pinCopy[pinIndex] = newValue;
    
    // Pass new pin as string to the onChange prop.
    onChange(pinToString(pinCopy));

    // Update state.
    setPin(pinCopy);

    // Advance focus to next slot, if needed.
    if (currentValue !== '' && pinIndex !== 3) inputs[pinIndex + 1].current?.focus();
  };

  const handleKeyDown = (pinIndex: PINIndex): React.KeyboardEventHandler<HTMLInputElement> => (event) => {
    // When slot is empty and backspace is pressed, move focus to previous slot.
    if (event.key === 'Backspace' && event.currentTarget.value === '') inputs[pinIndex - 1].current?.focus();
  }

  return (
    <div className={styles.pin}>

      {/* Slot 0 */}
      <input
        className={styles.input}
        type="password"
        inputMode="numeric"
        value={pin[0] ?? ''}
        placeholder="_"
        autoFocus={autoFocus}
        onChange={handleChange(0)}
        ref={inputs[0]}
      />

      {/* Slot 1 */}
      <input
        className={styles.input}
        type="password"
        inputMode="numeric"
        value={pin[1] ?? ''}
        placeholder="_"
        onChange={handleChange(1)}
        onKeyDown={handleKeyDown(1)}
        ref={inputs[1]}
      />

      {/* Slot 2 */}
      <input
        className={styles.input}
        type="password"
        inputMode="numeric"
        value={pin[2] ?? ''}
        placeholder="_"
        onChange={handleChange(2)}
        onKeyDown={handleKeyDown(2)}
        ref={inputs[2]}
      />

      {/* Slot 3 */}
      <input
        className={styles.input}
        type="password"
        inputMode="numeric"
        value={pin[3] ?? ''}
        placeholder="_"
        onChange={handleChange(3)}
        onKeyDown={handleKeyDown(3)}
        ref={inputs[3]}
      />

      <span className={styles.desc}>{description}</span>
    </div>
  );
};
