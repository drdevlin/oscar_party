import { useState } from 'react';
import classNames from 'classnames';

import styles from './Radio.module.css';

export interface Choice {
  id: string,
  value: string,
}

export type RadioChangeHandler = (choice?: Choice) => void;

export interface RadioProps {
  choices: Choice[];
  initialChoiceId?: string;
  onChange?: RadioChangeHandler;
}

/* Displays and allows selection from a radio-style list of choices. */
export const Radio = ({ choices, initialChoiceId, onChange }: RadioProps) => {
  // State
  const [checked, setChecked] = useState(initialChoiceId);
  
  // Handlers
  const handleClick: React.MouseEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    if (currentTarget.id === checked) return;

    setChecked(currentTarget.id);

    if (onChange) {
      const chosen = choices.find((choice) => choice.id === currentTarget.id);
      onChange(chosen);
    }
  };

  return (
  <section className={styles.box}>
    {choices.map((choice) => (
      <div className={styles.choice} key={choice.id} id={choice.id} onClick={handleClick}>
        <div
          className={classNames(
            styles.bullet,
            { [styles.checked]: choice.id === checked }
          )} />
        {choice.value}
      </div>
    ))}
  </section>
  );
};
