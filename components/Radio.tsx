import styles from './Radio.module.css';
import classNames from 'classnames';
import { useState } from 'react';

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

export const Radio = ({ choices, initialChoiceId, onChange }: RadioProps) => {
  const [checked, setChecked] = useState(initialChoiceId);
  
  const handleClick: React.MouseEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    if (currentTarget.id === checked) return;
    setChecked(currentTarget.id);
    if (onChange) {
      const chosen = choices.find((choice) => choice.id === currentTarget.id);
      onChange(chosen);
    }
  };

  return (
  <div className={styles.pad}>
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
  </div>
  );
};
